import { FORD_MODELS, OTHER_MODELS } from "./siteData";
import type { FordModel, OtherModel } from "./types";

const FORD_MODELS_KEY = "nindaford_ford_models";
const OTHER_MODELS_KEY = "nindaford_other_models";

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ─── Ford Models (Calculator) ────────────────────────────────────────

export type StoredFordModel = FordModel & { id: string };

function defaultFordModels(): StoredFordModel[] {
  return FORD_MODELS.map(m => ({ ...m, id: generateId() }));
}

export function getFordModels(): StoredFordModel[] {
  try {
    const raw = localStorage.getItem(FORD_MODELS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) { console.warn(err); }
  return defaultFordModels();
}

export function saveFordModels(items: StoredFordModel[]): void {
  localStorage.setItem(FORD_MODELS_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("models-updated"));
}

export function resetFordModels(): void {
  localStorage.removeItem(FORD_MODELS_KEY);
  window.dispatchEvent(new Event("models-updated"));
}

export function hasCustomFordModels(): boolean {
  return localStorage.getItem(FORD_MODELS_KEY) !== null;
}

export function createBlankFordModel(): StoredFordModel {
  return { id: generateId(), name: "", price: 0 };
}

// ─── Other Models ───────────────────────────────────────────────────

export type StoredOtherModel = OtherModel & { id: string };

function defaultOtherModels(): StoredOtherModel[] {
  return OTHER_MODELS.map(m => ({ ...m, id: generateId() }));
}

export function getOtherModels(): StoredOtherModel[] {
  try {
    const raw = localStorage.getItem(OTHER_MODELS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) { console.warn(err); }
  return defaultOtherModels();
}

export function saveOtherModels(items: StoredOtherModel[]): void {
  localStorage.setItem(OTHER_MODELS_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("other-models-updated"));
}

export function resetOtherModels(): void {
  localStorage.removeItem(OTHER_MODELS_KEY);
  window.dispatchEvent(new Event("other-models-updated"));
}

export function hasCustomOtherModels(): boolean {
  return localStorage.getItem(OTHER_MODELS_KEY) !== null;
}

export function createBlankOtherModel(): StoredOtherModel {
  return {
    id: generateId(),
    name: "",
    badge: "",
    tagline: "",
    normalPrice: "",
    specialPrice: "",
    save: "",
    highlights: ["", "", "", ""],
    color: "from-blue-600 to-cyan-500",
  };
}
