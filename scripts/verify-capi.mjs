#!/usr/bin/env node
/**
 * Verify Meta Conversions API credentials before trusting them.
 *
 * A CAPI token that is wrong fails silently: /api/capi swallows errors so a
 * broken pixel can never block the funnel. That is right for production and
 * useless for setup, so this script talks to Meta directly and prints what
 * comes back.
 *
 *   FB_CAPI_ACCESS_TOKEN=... FB_CAPI_DATASET_ID=... node scripts/verify-capi.mjs
 *
 * Add FB_CAPI_TEST_EVENT_CODE (Events Manager > Test Events) to route the
 * event into the test stream, where you can watch it arrive live without
 * polluting real reporting. Strongly recommended for the first run.
 */

const GRAPH_VERSION = 'v21.0'

const token = process.env.FB_CAPI_ACCESS_TOKEN
const datasetId = process.env.FB_CAPI_DATASET_ID
const testCode = process.env.FB_CAPI_TEST_EVENT_CODE

const fail = (msg) => {
  console.error(`\n  FAILED: ${msg}\n`)
  process.exit(1)
}

if (!token) fail('FB_CAPI_ACCESS_TOKEN is not set')
if (!datasetId) fail('FB_CAPI_DATASET_ID is not set')

console.log(`\n  Dataset:   ${datasetId}`)
console.log(`  Token:     ${token.slice(0, 8)}...${token.slice(-4)} (${token.length} chars)`)
console.log(`  Test mode: ${testCode ? `yes, ${testCode}` : 'NO, this will hit live reporting'}\n`)

// 1. Can the token see the dataset at all? Separates "bad token" from
//    "token fine, event payload wrong", which are very different fixes.
const infoRes = await fetch(
  `https://graph.facebook.com/${GRAPH_VERSION}/${datasetId}?fields=name,id&access_token=${token}`
)
const info = await infoRes.json()
if (!infoRes.ok) {
  console.error('  Could not read the dataset:')
  console.error(`  ${info?.error?.message ?? JSON.stringify(info)}`)
  if (info?.error?.code === 190) {
    console.error('\n  Code 190 means the token itself is rejected. Regenerate it in')
    console.error('  Events Manager > dataset > Settings > Conversions API.')
  } else if (info?.error?.code === 200) {
    console.error('\n  Code 200 means the token is valid but lacks permission on this')
    console.error('  dataset. The system user needs Manage on it.')
  }
  process.exit(1)
}
console.log(`  Dataset reachable: ${info.name ?? '(unnamed)'}\n`)

// 2. Send a real Lead event shaped exactly like the one the site sends, so a
//    pass here means the production path works, not just that auth works.
const eventId = `verify-${Date.now()}`
const payload = {
  data: [
    {
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: 'https://www.socialmediajusticetoday.com/parents',
      action_source: 'website',
      user_data: {
        // SHA-256 of a throwaway address. Meta requires at least one user
        // parameter and rejects the event outright without one.
        em: ['e3b7b0e8a8e7f4b0f1a2c3d4e5f60718293a4b5c6d7e8f9012345678abcdef01'],
        client_ip_address: '198.51.100.10',
        client_user_agent: 'Mozilla/5.0 (verify-capi)',
      },
      custom_data: { campaign: 'verify', variant: 'script' },
    },
  ],
  ...(testCode ? { test_event_code: testCode } : {}),
}

const res = await fetch(
  `https://graph.facebook.com/${GRAPH_VERSION}/${datasetId}/events?access_token=${token}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }
)
const body = await res.json()

if (!res.ok) {
  console.error('  Event rejected:')
  console.error(`  ${JSON.stringify(body, null, 2)}`)
  process.exit(1)
}

console.log(`  Events received: ${body.events_received}`)
if (body.messages?.length) console.log(`  Messages: ${JSON.stringify(body.messages)}`)
console.log(`  Trace: ${body.fbtrace_id}`)
console.log(`  event_id: ${eventId}`)
console.log(
  testCode
    ? '\n  Open Events Manager > Test Events. It should appear within seconds.\n'
    : '\n  Sent to LIVE reporting. Re-run with FB_CAPI_TEST_EVENT_CODE next time.\n'
)
