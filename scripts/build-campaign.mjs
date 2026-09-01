#!/usr/bin/env node
/**
 * Build the Meta campaign from code rather than by hand in Ads Manager.
 *
 * Everything is created PAUSED. Nothing spends until you review it in Ads
 * Manager and turn it on yourself.
 *
 * Run it with your own token. This script never stores one, and nobody but you
 * ever needs to hold a credential that can spend.
 *
 *   FB_TOKEN=... node scripts/build-campaign.mjs
 *
 * Add DRY_RUN=1 to print every call without sending anything.
 */

const GRAPH = 'https://graph.facebook.com/v21.0'
const TOKEN = process.env.FB_TOKEN
const DRY = process.env.DRY_RUN === '1'

// ---------------------------------------------------------------------------
// CONFIG. Fill these four in.
// ---------------------------------------------------------------------------
const CONFIG = {
  /** From Ads Manager, including the act_ prefix. e.g. act_1234567890 */
  adAccountId: process.env.FB_AD_ACCOUNT_ID ?? '',

  /** The Social Media Justice page id. Business Settings > Pages. */
  pageId: process.env.FB_PAGE_ID ?? '',

  /** Daily budget in whole dollars for the single ad set. */
  dailyBudgetUsd: Number(process.env.DAILY_BUDGET ?? 0),

  /**
   * [] if Meta is not forcing a category.
   * ['ISSUES_ELECTIONS_POLITICS'] if it is.
   *
   * This is not cosmetic. Under a special ad category Meta rejects narrowed
   * age targeting and blocks lookalikes, so the ad set below has to be built
   * differently. Getting it wrong means the ad set is created and then fails
   * to deliver, which looks like a budget problem rather than a config one.
   */
  specialAdCategories: (process.env.SPECIAL_AD_CATEGORY
    ? [process.env.SPECIAL_AD_CATEGORY]
    : []),

  pixelId: '1546867846754027',
}

const SITE = 'https://www.socialmediajusticetoday.com'
const UTM =
  'utm_source=facebook&utm_medium=paid_social' +
  '&utm_campaign={{campaign.name}}&utm_content={{ad.name}}' +
  '&utm_term={{adset.name}}&placement={{placement}}'

/**
 * Four angles, not four shades of one ad. Meta can only optimize between
 * creatives that actually differ, so these vary the argument rather than the
 * wording: direct question, symptom recognition, identity, social proof.
 */
const ADS = [
  {
    name: 'a-direct',
    image: 'ad-a-direct-1080x1080.png',
    path: '/parents',
    headline: 'Was your child harmed by social media?',
    description: 'Free, confidential case review',
    body:
      'Thousands of families have filed claims in federal court over harm connected to ' +
      'social media use that began in childhood. If your child developed depression, ' +
      'severe anxiety, an eating disorder, or engaged in self-harm, you may qualify for ' +
      'a free case review. It takes about two minutes and it is confidential.',
  },
  {
    name: 'b-symptoms',
    image: 'ad-b-symptoms-1080x1080.png',
    path: '/parents',
    headline: 'Do any of these sound familiar?',
    description: 'See if your family qualifies',
    body:
      'Depression. Severe anxiety. Eating disorders. Body dysmorphia. Self-harm. If any ' +
      'of it started with compulsive social media use before your child turned 18, your ' +
      'family may have a claim against the platforms. Free case review, about two minutes.',
  },
  {
    name: 'c-adults',
    image: 'ad-c-adults-1080x1080.png',
    path: '/adults',
    headline: 'You grew up on these apps.',
    description: 'Free, confidential case review',
    body:
      'You do not have to be a parent to have a claim. If you are between 18 and 25 and ' +
      'you grew up on Instagram, TikTok, Snapchat, or YouTube, you can file on your own ' +
      'behalf. A significant share of families in this litigation are adults filing for ' +
      'themselves.',
  },
  {
    name: 'd-proof',
    image: 'ad-d-proof-1080x1080.png',
    path: '/parents',
    headline: 'Thousands of families are already in court.',
    description: 'Find out if you qualify',
    body:
      'Documents produced in federal court show the platforms measured how their products ' +
      'affected young users and kept optimizing for time spent. Claims against Meta, ' +
      'TikTok, Snap and YouTube are pending in a multidistrict litigation in the Northern ' +
      'District of California.',
  },
]

// ---------------------------------------------------------------------------

const die = (m) => {
  console.error(`\n  ${m}\n`)
  process.exit(1)
}

if (!TOKEN) die('FB_TOKEN is not set.')
if (!CONFIG.adAccountId.startsWith('act_')) die('adAccountId must start with act_')
if (!CONFIG.pageId) die('pageId is not set.')
if (!CONFIG.dailyBudgetUsd) die('dailyBudgetUsd is not set.')

async function post(edge, body) {
  const url = `${GRAPH}/${CONFIG.adAccountId}/${edge}`
  if (DRY) {
    console.log(`\n  POST ${edge}\n  ${JSON.stringify(body, null, 2)}`)
    return { id: `dry_${edge}_${Date.now()}` }
  }
  const form = new URLSearchParams({ ...body, access_token: TOKEN })
  const res = await fetch(url, { method: 'POST', body: form })
  const json = await res.json()
  if (!res.ok) {
    console.error(`\n  ${edge} failed:`)
    console.error(`  ${json?.error?.error_user_msg ?? json?.error?.message ?? JSON.stringify(json)}`)
    process.exit(1)
  }
  return json
}

/** Images have to live in Meta's library before a creative can reference one. */
async function uploadImage(file) {
  const fs = await import('node:fs')
  const p = new URL(`../public/brand/ads/${file}`, import.meta.url)
  if (DRY) return `dry_hash_${file}`
  const bytes = fs.readFileSync(p)
  const fd = new FormData()
  fd.append('access_token', TOKEN)
  fd.append('filename', new Blob([bytes], { type: 'image/png' }), file)
  const res = await fetch(`${GRAPH}/${CONFIG.adAccountId}/adimages`, { method: 'POST', body: fd })
  const json = await res.json()
  if (!res.ok) die(`Image upload failed for ${file}: ${JSON.stringify(json)}`)
  return Object.values(json.images)[0].hash
}

const sac = CONFIG.specialAdCategories
console.log(`\n  Account:   ${CONFIG.adAccountId}`)
console.log(`  Budget:    $${CONFIG.dailyBudgetUsd}/day`)
console.log(`  Category:  ${sac.length ? sac.join(', ') : 'none'}`)
console.log(`  Mode:      ${DRY ? 'DRY RUN, nothing will be created' : 'LIVE, everything created PAUSED'}\n`)

const campaign = await post('campaigns', {
  name: 'SMJ | Leads | Prospecting',
  objective: 'OUTCOME_LEADS',
  status: 'PAUSED',
  special_ad_categories: JSON.stringify(sac),
})
console.log(`  campaign  ${campaign.id}`)

/**
 * One ad set, deliberately.
 *
 * The pixel was created days ago with no conversion history, and Meta needs
 * roughly 50 conversions per ad set per week to leave the learning phase.
 * Splitting the budget across several ad sets means none of them ever gets
 * there, so delivery stays erratic and CPL never settles. Let the creative do
 * the segmenting instead, and split into real ad sets once there is volume.
 */
const targeting = {
  geo_locations: { countries: ['US'] },
  // Under a special ad category Meta rejects a narrowed age range outright.
  ...(sac.length ? {} : { age_min: 25, age_max: 65 }),
}

const adset = await post('adsets', {
  name: 'SMJ | US | Broad',
  campaign_id: campaign.id,
  daily_budget: String(Math.round(CONFIG.dailyBudgetUsd * 100)),
  billing_event: 'IMPRESSIONS',
  optimization_goal: 'OFFSITE_CONVERSIONS',
  bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
  promoted_object: JSON.stringify({
    pixel_id: CONFIG.pixelId,
    custom_event_type: 'LEAD',
  }),
  targeting: JSON.stringify(targeting),
  status: 'PAUSED',
})
console.log(`  ad set    ${adset.id}`)

for (const ad of ADS) {
  const hash = await uploadImage(ad.image)
  const creative = await post('adcreatives', {
    name: `SMJ | ${ad.name}`,
    object_story_spec: JSON.stringify({
      page_id: CONFIG.pageId,
      link_data: {
        image_hash: hash,
        link: `${SITE}${ad.path}?${UTM}`,
        message: ad.body,
        name: ad.headline,
        description: ad.description,
        call_to_action: { type: 'LEARN_MORE' },
      },
    }),
  })
  const created = await post('ads', {
    name: `SMJ | ${ad.name}`,
    adset_id: adset.id,
    creative: JSON.stringify({ creative_id: creative.id }),
    status: 'PAUSED',
  })
  console.log(`  ad        ${created.id}  ${ad.name} -> ${ad.path}`)
}

console.log(`
  Everything created PAUSED. Review before enabling:
  https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=${CONFIG.adAccountId.replace('act_', '')}
`)
