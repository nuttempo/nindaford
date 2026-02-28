import { useState } from "react";

const EXPERIMENT_ID = "hero_primary_cta_v1";
const STORAGE_KEY = "exp_hero_primary_cta_v1";

type HeroCtaVariant = "control" | "benefit";
type AssignmentSource = "forced" | "stored" | "random" | "ssr";

type HeroCtaExperimentConfig = {
  variant: HeroCtaVariant;
  assignmentSource: AssignmentSource;
  primaryLabel: string;
  primaryCtaId: string;
  experimentId: string;
};

const VARIANT_CONFIG: Record<HeroCtaVariant, Omit<HeroCtaExperimentConfig, "variant" | "assignmentSource">> = {
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

function getForcedVariant(): HeroCtaVariant | null {
  const forcedVariant = import.meta.env.VITE_HERO_CTA_VARIANT?.trim().toLowerCase() ?? null;
  if (!forcedVariant) {
    return null;
  }

  return isValidVariant(forcedVariant) ? forcedVariant : null;
}

function getInitialExperimentState(): { variant: HeroCtaVariant; assignmentSource: AssignmentSource } {
  if (typeof window === "undefined") {
    return { variant: "control", assignmentSource: "ssr" };
  }

  const forcedVariant = getForcedVariant();
  if (forcedVariant) {
    window.localStorage.setItem(STORAGE_KEY, forcedVariant);
    return { variant: forcedVariant, assignmentSource: "forced" };
  }

  const storedVariant = window.localStorage.getItem(STORAGE_KEY);
  if (isValidVariant(storedVariant)) {
    return { variant: storedVariant, assignmentSource: "stored" };
  }

  const nextVariant = pickVariant();
  window.localStorage.setItem(STORAGE_KEY, nextVariant);
  return { variant: nextVariant, assignmentSource: "random" };
}

export function useHeroCtaExperiment(): HeroCtaExperimentConfig {
  const [{ variant, assignmentSource }] = useState<{ variant: HeroCtaVariant; assignmentSource: AssignmentSource }>(() => getInitialExperimentState());

  return {
    variant,
    assignmentSource,
    ...VARIANT_CONFIG[variant],
  };
}
