type EventParams = Record<string, string | number | boolean | undefined>;

type AttributionPayload = {
  attribution_source?: string;
  attribution_medium?: string;
  attribution_campaign?: string;
  attribution_term?: string;
  attribution_content?: string;
  attribution_gclid?: string;
  attribution_fbclid?: string;
  attribution_landing_path?: string;
};

const ATTRIBUTION_STORAGE_KEY = "nf_attribution_v1";
const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

let cachedAttribution: AttributionPayload | null = null;
let hasInitializedScrollTracking = false;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function initAnalyticsLayer() {
  if (typeof window === "undefined") {
    return;
  }

  if (!window.dataLayer) {
    window.dataLayer = [];
  }
}

function parseAttributionFromUrl() {
  if (typeof window === "undefined") {
    return null;
  }

  const searchParams = new URLSearchParams(window.location.search);

  const source = searchParams.get("utm_source") ?? undefined;
  const medium = searchParams.get("utm_medium") ?? undefined;
  const campaign = searchParams.get("utm_campaign") ?? undefined;
  const term = searchParams.get("utm_term") ?? undefined;
  const content = searchParams.get("utm_content") ?? undefined;
  const gclid = searchParams.get("gclid") ?? undefined;
  const fbclid = searchParams.get("fbclid") ?? undefined;

  const hasAttributionSignals = source || medium || campaign || term || content || gclid || fbclid;
  if (!hasAttributionSignals) {
    return null;
  }

  return {
    attribution_source: source,
    attribution_medium: medium,
    attribution_campaign: campaign,
    attribution_term: term,
    attribution_content: content,
    attribution_gclid: gclid,
    attribution_fbclid: fbclid,
    attribution_landing_path: `${window.location.pathname}${window.location.search}`,
  } satisfies AttributionPayload;
}

function buildReferrerAttribution() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!document.referrer) {
    return null;
  }

  return {
    attribution_source: "referral",
    attribution_medium: "referral",
    attribution_campaign: undefined,
    attribution_term: undefined,
    attribution_content: undefined,
    attribution_gclid: undefined,
    attribution_fbclid: undefined,
    attribution_landing_path: `${window.location.pathname}${window.location.search}`,
  } satisfies AttributionPayload;
}

function readStoredAttribution() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawAttribution = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!rawAttribution) {
      return null;
    }
    return JSON.parse(rawAttribution) as AttributionPayload;
  } catch {
    return null;
  }
}

function persistAttribution(attribution: AttributionPayload) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    return;
  }
}

function initAttributionContext() {
  if (cachedAttribution) {
    return cachedAttribution;
  }

  const storedAttribution = readStoredAttribution();
  if (storedAttribution) {
    cachedAttribution = storedAttribution;
    return cachedAttribution;
  }

  const attributionFromUrl = parseAttributionFromUrl();
  if (attributionFromUrl) {
    persistAttribution(attributionFromUrl);
    cachedAttribution = attributionFromUrl;
    return cachedAttribution;
  }

  const attributionFromReferrer = buildReferrerAttribution();
  if (attributionFromReferrer) {
    persistAttribution(attributionFromReferrer);
    cachedAttribution = attributionFromReferrer;
    return cachedAttribution;
  }

  cachedAttribution = {};
  return cachedAttribution;
}

function compactParams(params: EventParams) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined));
}

function getTagManagerId() {
  return import.meta.env.VITE_GTM_ID?.trim();
}

function isValidTagManagerId(tagManagerId: string) {
  return /^GTM-[A-Z0-9]+$/i.test(tagManagerId);
}

export function initTagManager() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  const tagManagerId = getTagManagerId();
  if (!tagManagerId || !isValidTagManagerId(tagManagerId)) {
    return false;
  }

  if (document.getElementById("gtm-script")) {
    return true;
  }

  initAnalyticsLayer();

  window.dataLayer?.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(tagManagerId)}`;
  document.head.appendChild(script);

  return true;
}

export function trackPageView(pagePath = `${window.location.pathname}${window.location.search}`) {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}

function initScrollDepthTracking() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (hasInitializedScrollTracking) {
    return;
  }

  hasInitializedScrollTracking = true;
  const reachedMilestones = new Set<number>();

  const trackCurrentDepth = () => {
    const docEl = document.documentElement;
    const body = document.body;

    const scrollTop = window.scrollY || docEl.scrollTop || body.scrollTop || 0;
    const scrollHeight = Math.max(docEl.scrollHeight, body.scrollHeight);
    const viewportHeight = window.innerHeight || docEl.clientHeight;
    const scrollableHeight = Math.max(scrollHeight - viewportHeight, 1);
    const percent = Math.min(100, Math.round((scrollTop / scrollableHeight) * 100));

    for (const milestone of SCROLL_MILESTONES) {
      if (percent < milestone || reachedMilestones.has(milestone)) {
        continue;
      }

      reachedMilestones.add(milestone);
      trackEvent("scroll_depth", {
        scroll_percent: milestone,
        page_path: `${window.location.pathname}${window.location.search}`,
      });
    }
  };

  const onScroll = () => {
    window.requestAnimationFrame(trackCurrentDepth);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  trackCurrentDepth();
}

export function bootstrapAnalytics() {
  initAnalyticsLayer();
  initAttributionContext();
  initTagManager();
  trackPageView();
  initScrollDepthTracking();
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  initAnalyticsLayer();

  const attributionParams = initAttributionContext();
  const mergedParams = compactParams({
    ...attributionParams,
    ...params,
  });

  if (window.gtag) {
    window.gtag("event", eventName, mergedParams);
    return;
  }

  window.dataLayer?.push({
    event: eventName,
    ...mergedParams,
  });
}
