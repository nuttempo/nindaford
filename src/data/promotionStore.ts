/**
 * promotionStore — read/write multiple promotion items via localStorage.
 *
 * Each promotion has its own data (name, prices, …) and images.
 * If nothing is saved yet the getter falls back to the hard-coded
 * Everest Trend default so the public site always works out-of-the-box.
 */

import { EVEREST_TREND_OFFER, EVEREST_TREND_IMAGES } from "./siteData";
import type { PromotionData, PromotionItem, StoredImageItem } from "./promotionTypes";

const PROMOS_KEY = "nindaford_promotions";
const CAMPAIGNS_KEY = "nindaford_campaigns";

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

function defaultPromotions(): PromotionItem[] {
  return [
    {
      id: "default_everest_trend",
      data: toPromotionData(EVEREST_TREND_OFFER),
      images: EVEREST_TREND_IMAGES.map((img) => ({
        src: img.src,
        caption: img.caption,
      })),
    },
  ];
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/** Create a blank promotion item with default empty values. */
export function createBlankPromotion(): PromotionItem {
  return {
    id: generateId(),
    data: {
      name: "",
      normalPrice: "",
      specialPrice: "",
      save: "",
      note: "",
      offerUrl: "",
      allOffersUrl: "",
    },
    images: [],
  };
}

// ─── promotions (multi-item) ────────────────────────────────────────

export function getPromotions(): PromotionItem[] {
  try {
    const raw = localStorage.getItem(PROMOS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PromotionItem[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* corrupted → fall through */
  }
  return defaultPromotions();
}

export function savePromotions(items: PromotionItem[]): void {
  localStorage.setItem(PROMOS_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("promotion-updated"));
}

export function resetPromotions(): void {
  localStorage.removeItem(PROMOS_KEY);
  window.dispatchEvent(new Event("promotion-updated"));
}

export function hasCustomPromotions(): boolean {
  return localStorage.getItem(PROMOS_KEY) !== null;
}

// ─── campaigns (multi-item) ────────────────────────────────────────

export function getCampaigns(): PromotionItem[] {
  try {
    const raw = localStorage.getItem(CAMPAIGNS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PromotionItem[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* corrupted → fall through */
  }
  return defaultPromotions();
}

export function saveCampaigns(items: PromotionItem[]): void {
  localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("campaign-updated"));
}

export function resetCampaigns(): void {
  localStorage.removeItem(CAMPAIGNS_KEY);
  window.dispatchEvent(new Event("campaign-updated"));
}

export function hasCustomCampaigns(): boolean {
  return localStorage.getItem(CAMPAIGNS_KEY) !== null;
}

// ─── backward compat helpers (single-item API) ─────────────────────

/** Get first promotion (for CampaignSection). */
export function getPromotion(): PromotionData {
  return getPromotions()[0].data;
}

/** Get first promotion's images. */
export function getPromotionImages(): StoredImageItem[] {
  return getPromotions()[0].images;
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
