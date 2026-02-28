# Analytics Event Mapping (GA4 / GTM)

## Setup

1. Copy `.env.example` to `.env.local`
2. Set `VITE_GTM_ID=GTM-XXXXXXX`
3. Start app (`npm run dev`) or deploy build

Project bootstraps analytics in `src/main.tsx` via `bootstrapAnalytics()` and pushes events from `src/utils/analytics.ts`.

## Auto Attribution (First-touch)

Analytics utility will automatically attach first-touch attribution fields to every event (stored in localStorage):

- `attribution_source`
- `attribution_medium`
- `attribution_campaign`
- `attribution_term`
- `attribution_content`
- `attribution_gclid`
- `attribution_fbclid`
- `attribution_landing_path`

Priority:
1. UTM/gclid/fbclid from landing URL
2. Referrer fallback (`source=referral`, `medium=referral`)
3. Empty attribution when no signal

## Events

### page_view
- Trigger: app bootstrap
- Params:
  - page_path
  - page_title

### section_view
- Trigger: when section becomes visible in viewport
- Params:
  - section_id (hero, offers, models, calculator, contact, ...)
  - section_title

### cta_click
- Trigger: all major CTA links/buttons
- Common params:
  - area (hero, top_nav, top_nav_mobile, offers, calculator, models, reviews, sidebar, contact, floating, ...)
  - channel (messenger, phone, facebook, ford_official, onsite)
  - cta (specific action id)
- Extra params (where available):
  - model (calculator selected model)
  - months (installment months)
  - experiment_id (when CTA is under experiment)
  - variant (when CTA is under experiment)

### experiment_exposure
- Trigger: when user sees Hero primary CTA experiment
- Params:
  - experiment_id (`hero_primary_cta_v1`)
  - variant (`control` or `benefit`)
  - placement (`hero_primary_cta`)

### experiment_conversion
- Trigger: when user clicks Hero primary CTA under experiment
- Params:
  - experiment_id (`hero_primary_cta_v1`)
  - variant (`control` or `benefit`)
  - goal (`messenger_click`)

## Suggested Conversions in GA4

- Primary lead: `cta_click` where `channel=messenger` and (`cta=quote_primary_control` or `cta=quote_primary_benefit` or `cta=chat_with_quote`)
- Call lead: `cta_click` where `channel=phone`
- Offer intent: `cta_click` where `area=offers`
- Experiment winner: `experiment_conversion / experiment_exposure` by `variant`
- Funnel by section: `section_view(hero -> offers -> calculator -> contact)`

## Validation Checklist

- Verify `window.dataLayer` exists
- Verify GTM script tag with id `gtm-script` is injected
- In GTM Preview, confirm `page_view` and `cta_click` events fire with expected params
- In GA4 DebugView, confirm conversions mapped correctly
