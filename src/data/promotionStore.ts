/**
 * promotionStore — read/write promotion data & images via localStorage.
 *
 * If nothing is saved yet the getters fall back to the hard-coded defaults
 * exported from siteData.ts so the public site always works out-of-the-box.
 */

import { EVEREST_TREND_OFFER, EVEREST_TREND_IMAGES } from "./siteData";
import type { PromotionData, StoredImageItem } from "./promotionTypes";

const PROMO_KEY = "nindaford_promotion";
const IMAGES_KEY = "nindaford_promotion_images";

// ─── helpers ────────────────────────────────────────────────────────

function toPromotionData(src: typeof EVEREST_TREND_OFFER): PromotionData {
  return {
    name: src.name,
    normalPrice: src.normalPrice,
    specialPrice: src.specialPrice,
    save: src.save,
    note: src.note,
    offerUrl: src.offerUrl,
    allOffersUrl: src.allOffersUrl,
  };
}

// ─── promotion data ────────────────────────────────────────────────

export function getPromotion(): PromotionData {
  try {
    const raw = localStorage.getItem(PROMO_KEY);
    if (raw) return JSON.parse(raw) as PromotionData;
  } catch {
    /* corrupted → fall through */
  }
  return toPromotionData(EVEREST_TREND_OFFER);
}

export function savePromotion(data: PromotionData): void {
  localStorage.setItem(PROMO_KEY, JSON.stringify(data));
  // Notify other tabs / components listening on storage
  window.dispatchEvent(new Event("promotion-updated"));
}

export function resetPromotion(): void {
  localStorage.removeItem(PROMO_KEY);
  window.dispatchEvent(new Event("promotion-updated"));
}

// ─── promotion images ──────────────────────────────────────────────

export function getPromotionImages(): StoredImageItem[] {
  try {
    const raw = localStorage.getItem(IMAGES_KEY);
    if (raw) return JSON.parse(raw) as StoredImageItem[];
  } catch {
    /* corrupted → fall through */
  }
  // Return default images (these use Vite-resolved import paths)
  return EVEREST_TREND_IMAGES.map((img) => ({
    src: img.src,
    caption: img.caption,
  }));
}

export function savePromotionImages(images: StoredImageItem[]): void {
  localStorage.setItem(IMAGES_KEY, JSON.stringify(images));
  window.dispatchEvent(new Event("promotion-updated"));
}

export function resetPromotionImages(): void {
  localStorage.removeItem(IMAGES_KEY);
  window.dispatchEvent(new Event("promotion-updated"));
}

// ─── image helpers ─────────────────────────────────────────────────

const MAX_WIDTH = 800;
const QUALITY = 0.8;

/**
 * Compress & resize an image File to a base64 data-URL (JPEG).
 * Keeps aspect ratio; max width 800px.
 */
export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;
        if (w > MAX_WIDTH) {
          h = Math.round((h * MAX_WIDTH) / w);
          w = MAX_WIDTH;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", QUALITY));
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/** Check whether the stored promotion differs from the hard-coded default. */
export function hasCustomPromotion(): boolean {
  return localStorage.getItem(PROMO_KEY) !== null;
}

/** Check whether stored images differ from the hard-coded default. */
export function hasCustomImages(): boolean {
  return localStorage.getItem(IMAGES_KEY) !== null;
}
