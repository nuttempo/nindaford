import { useCallback, useEffect, useState } from "react";
import { getPromotion, getPromotionImages } from "../../../data/promotionStore";
import type { PromotionData, StoredImageItem } from "../../../data/promotionTypes";

/**
 * Hook that returns the current promotion data and images.
 *
 * Reads from localStorage (if customised via admin panel),
 * otherwise falls back to the hard-coded defaults in siteData.ts.
 *
 * Automatically refreshes when the "promotion-updated" custom event fires
 * (triggered by the admin panel's save/reset actions).
 */
export function usePromotion() {
  const read = useCallback(() => ({
    promotion: getPromotion(),
    images: getPromotionImages(),
  }), []);

  const [state, setState] = useState<{
    promotion: PromotionData;
    images: StoredImageItem[];
  }>(read);

  useEffect(() => {
    const handler = () => setState(read());
    window.addEventListener("promotion-updated", handler);
    // Also listen to native "storage" events (cross-tab sync)
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("promotion-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, [read]);

  return state;
}
