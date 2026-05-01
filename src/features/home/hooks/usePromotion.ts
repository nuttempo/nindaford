import { useCallback, useEffect, useState } from "react";
import { getPromotions } from "../../../data/promotionStore";
import type { PromotionItem } from "../../../data/promotionTypes";

/**
 * Hook that returns all promotion items (multi-promotion).
 *
 * Reads from localStorage (if customised via admin panel),
 * otherwise falls back to the hard-coded defaults in siteData.ts.
 *
 * Automatically refreshes when the "promotion-updated" custom event fires
 * (triggered by the admin panel's save/reset actions).
 */
export function usePromotions(): PromotionItem[] {
  const read = useCallback(() => getPromotions(), []);
  const [items, setItems] = useState<PromotionItem[]>(read);

  useEffect(() => {
    const handler = () => setItems(read());
    window.addEventListener("promotion-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("promotion-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, [read]);

  return items;
}

/**
 * Backward-compat hook — returns first promotion's data + images.
 * Used by CampaignSection.
 */
export function usePromotion() {
  const items = usePromotions();
  const first = items[0];
  return {
    promotion: first.data,
    images: first.images,
  };
}
