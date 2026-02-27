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
