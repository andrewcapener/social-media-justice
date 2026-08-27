# Social Media Justice

Landing pages for **www.socialmediajusticetoday.com**, social media harm mass tort
lead generation. Two A/B variants feeding the client's existing Typeform intake
and e-sign retainer flow.

Built on Next.js 16 (App Router) + Tailwind v4, derived from the `claim-anchor`
funnel.

---

## URL structure

Attribution is **path-based**, no subdomains (agreed on the 8/11 call, matching
the client's existing setup):

```
/{campaign}/{variant}
```

| Example | Campaign | Variant |
|---|---|---|
| `/start/a` | `start` | A, eligibility-first |
| `/start/b` | `start` | B, accountability / story-led |
| `/fb-parents/a` | `fb-parents` | A |
| `/prog-retarget/b` | `prog-retarget` | B |

`campaign` is **opaque**, media buyers can mint new paths with no code change.
It renders on demand and is cached thereafter. `variant` must be `a` or `b`;
anything else 404s.

The bare domain redirects to `/start/a` so even direct traffic carries an
attribution path.

Campaign paths are `noindex, nofollow`, they're ad destinations and must not
compete with the canonical site in search.

---

## Typeform integration

The client's existing survey is **embedded, not rebuilt**, so their
qualification logic and e-sign retainer redirect stay untouched.

This mirrors their production embed contract exactly. Two hidden fields their
backend depends on:

| Field | Value | Why |
|---|---|---|
| `entry_id` | `${random9digits}${epochMillis}` | Their unique lead key |
| `url` | `document.location.pathname` | Their attribution dimension |

**Changing the shape of either will stop their backend from recognizing our
leads.** Everything we add (`campaign`, `variant`, `utm_*`) layers on top -
never in place of, those two.

Note this is a `data-tf-live` id, not a classic `/to/{id}` form id. Live embeds
are initialized by `embed.js` scanning data attributes, so `TypeformEmbed`
builds the element that way rather than calling `createWidget()`.

---

## Tracking

Every conversion fires **twice**, browser pixel and server-side Conversions
API, sharing one `eventId`. Meta dedupes on `(event_name, event_id)`.

```
lib/tracking.ts       → client pixel + shared event id + Meta cookie capture
app/api/capi/route.ts → server relay, SHA-256 hashes PII before send
```

Without the shared `event_id` you'd see roughly **2x the real conversions**. If
conversion counts look inflated after launch, check that dedup first.

PII is hashed server-side and raw values are never persisted. `_fbc` is
synthesized from `fbclid` when the cookie hasn't been written yet, so the first
pageview still carries click attribution.

CAPI no-ops safely when `FB_CAPI_ACCESS_TOKEN` / `FB_CAPI_DATASET_ID` are
unset, the funnel is never blocked by tracking config.

---

## Copy and variants

All landing page copy lives in `lib/variants.ts`. Swapping A/B messaging should
never require editing a component.

---

## Local development

```bash
cp .env.example .env.local   # fill in the blanks
npm install
npm run dev
```

Then open http://localhost:3000/start/a

## Environment

See `.env.example`. Required to be fully functional:

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_TYPEFORM_LIVE_ID` | The `data-tf-live` id |
| `NEXT_PUBLIC_FB_PIXEL_ID` | Browser pixel |
| `FB_CAPI_ACCESS_TOKEN` | Server CAPI, from client |
| `FB_CAPI_DATASET_ID` | Server CAPI, from client |
| `PEXELS_API_KEY` | Build-time imagery sourcing |
| `NEXT_PUBLIC_PHONE` | Hides the nav phone link when unset |

Use `FB_CAPI_TEST_EVENT_CODE` while validating in Meta Events Manager, then
remove it before launch.

---

## Compliance

The footer is compliance surface, not decoration: attorney advertising notice,
no-attorney-client-relationship, no-guarantee-of-recovery, TCPA consent, and the
medical-advice disclaimer. Meta also requires a reachable privacy policy for
lead-gen ad accounts.

**Do not trim any of it without running the change past the client's counsel.**
