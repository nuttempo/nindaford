# Analytics Event Mapping (GA4 / GTM)

## Setup

1. Copy `.env.example` to `.env.local`
2. Set `VITE_GTM_ID=GTM-XXXXXXX`
3. Start app (`npm run dev`) or deploy build

Project bootstraps analytics in `src/main.tsx` via `bootstrapAnalytics()` and pushes events from `src/utils/analytics.ts`.

## Events

### page_view
- Trigger: app bootstrap
- Params:
  - page_path
  - page_title

### cta_click
- Trigger: all major CTA links/buttons
- Common params:
  - area (hero, offers, calculator, contact, floating, ...)
  - channel (messenger, phone, facebook, ford_official, onsite)
  - cta (specific action id)
- Extra params (where available):
  - model (calculator selected model)
  - months (installment months)

## Suggested Conversions in GA4

- Primary lead: cta_click where channel=messenger and (cta=quote_primary or cta=chat_with_quote)
- Call lead: cta_click where channel=phone
- Offer intent: cta_click where area=offers

## Validation Checklist

- Verify window.dataLayer exists
- Verify GTM script tag with id gtm-script is injected
- In GTM Preview, confirm page_view and cta_click events fire with expected params
- In GA4 DebugView, confirm conversions mapped correctly
