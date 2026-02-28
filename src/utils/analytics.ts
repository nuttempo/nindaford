type EventParams = Record<string, string | number | boolean | undefined>;

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

export function bootstrapAnalytics() {
  initAnalyticsLayer();
  initTagManager();
  trackPageView();
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  initAnalyticsLayer();

  if (window.gtag) {
    window.gtag("event", eventName, params);
    return;
  }

  window.dataLayer?.push({
    event: eventName,
    ...params,
  });
}
