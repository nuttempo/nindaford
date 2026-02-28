# Analytics Event Mapping (GA4 / GTM)

## Setup

1. Copy `.env.example` to `.env.local`
2. Set `VITE_GTM_ID=GTM-XXXXXXX`
3. Start app (`npm run dev`) or deploy build

Optional (QA for A/B test):
- Set `VITE_HERO_CTA_VARIANT=control` or `VITE_HERO_CTA_VARIANT=benefit`

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

## Auto Session Context

Analytics utility will automatically attach session context fields to every event:

- `session_id` (per browser tab/session)
- `event_index` (incremental event order in current session)

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

### scroll_depth
- Trigger: when user reaches page scroll milestones
- Milestones: 25, 50, 75, 100
- Params:
  - scroll_percent
  - page_path

### time_on_page
- Trigger: when user stays on page for milestone duration
- Milestones: 30s, 60s, 120s
- Params:
  - seconds
  - page_path

### faq_toggle
- Trigger: when user opens/closes FAQ item
- Params:
  - question
  - state (`open` or `close`)

### carousel_interaction
- Trigger: when user manually navigates carousel
- Params:
  - carousel_id
  - action (`next`, `previous`, `dot`)
  - target_index
  - total_items

### test_drive_submit
- Trigger: when user submits test drive booking form
- Params:
  - area (`test_drive`)
  - channel (`messenger`)
  - model
  - preferred_date (optional)

### test_drive_start
- Trigger: when user starts interacting with test drive form
- Params:
  - area (`test_drive`)
  - first_field (`name`, `phone`, `model`, `date`, `note`)

### test_drive_validation_error
- Trigger: when user submits incomplete test drive form
- Params:
  - area (`test_drive`)
  - missing_name
  - missing_phone
  - missing_model

### lead_webhook_result
- Trigger: when optional lead webhook request completes
- Params:
  - lead_type (`test_drive`)
  - success
  - http_status (optional)

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
  - assignment_source (`forced`, `stored`, `random`, `ssr`)
  - placement (`hero_primary_cta`)

### experiment_conversion
- Trigger: when user clicks Hero primary CTA under experiment
- Params:
  - experiment_id (`hero_primary_cta_v1`)
  - variant (`control` or `benefit`)
  - assignment_source (`forced`, `stored`, `random`, `ssr`)
  - goal (`messenger_click`)

## Suggested Conversions in GA4

- Primary lead: `cta_click` where `channel=messenger` and (`cta=quote_primary_control` or `cta=quote_primary_benefit` or `cta=chat_with_quote`)
- Call lead: `cta_click` where `channel=phone`
- Offer intent: `cta_click` where `area=offers`
- Experiment winner: `experiment_conversion / experiment_exposure` by `variant`
- Funnel by section: `section_view(hero -> offers -> calculator -> contact)`
- Engagement depth: distribution of `scroll_depth` milestones per traffic source
- Engagement duration: distribution of `time_on_page` milestones by source/campaign
- Content engagement: FAQ interest (`faq_toggle`) and offer image exploration (`carousel_interaction`)
- Test drive demand: count `test_drive_submit` by model/date
- Test drive drop-off: compare `test_drive_start` vs `test_drive_submit` and inspect `test_drive_validation_error`
- CRM relay health: monitor `lead_webhook_result.success` and `http_status`

## Validation Checklist

- Verify `window.dataLayer` exists
- Verify GTM script tag with id `gtm-script` is injected
- In GTM Preview, confirm `page_view` and `cta_click` events fire with expected params
- In GA4 DebugView, confirm conversions mapped correctly
