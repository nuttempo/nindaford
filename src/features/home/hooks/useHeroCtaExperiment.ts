import { useState } from "react";

const EXPERIMENT_ID = "hero_primary_cta_v1";
const STORAGE_KEY = "exp_hero_primary_cta_v1";

type HeroCtaVariant = "control" | "benefit";

type HeroCtaExperimentConfig = {
  variant: HeroCtaVariant;
  primaryLabel: string;
  primaryCtaId: string;
  experimentId: string;
};

const VARIANT_CONFIG: Record<HeroCtaVariant, Omit<HeroCtaExperimentConfig, "variant">> = {
  control: {
    primaryLabel: "ขอโปร/ใบเสนอราคา",
    primaryCtaId: "quote_primary_control",
    experimentId: EXPERIMENT_ID,
  },
  benefit: {
    primaryLabel: "รับข้อเสนอส่วนลดวันนี้",
    primaryCtaId: "quote_primary_benefit",
    experimentId: EXPERIMENT_ID,
  },
};

function isValidVariant(value: string | null): value is HeroCtaVariant {
  return value === "control" || value === "benefit";
}

function pickVariant(): HeroCtaVariant {
  return Math.random() < 0.5 ? "control" : "benefit";
}

function getInitialVariant(): HeroCtaVariant {
  if (typeof window === "undefined") {
    return "control";
  }

  const storedVariant = window.localStorage.getItem(STORAGE_KEY);
  if (isValidVariant(storedVariant)) {
    return storedVariant;
  }

  const nextVariant = pickVariant();
  window.localStorage.setItem(STORAGE_KEY, nextVariant);
  return nextVariant;
}

export function useHeroCtaExperiment(): HeroCtaExperimentConfig {
  const [variant] = useState<HeroCtaVariant>(() => getInitialVariant());

  return {
    variant,
    ...VARIANT_CONFIG[variant],
  };
}
