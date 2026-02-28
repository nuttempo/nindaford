/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GTM_ID?: string;
    readonly VITE_HERO_CTA_VARIANT?: "control" | "benefit";
    readonly VITE_LEAD_WEBHOOK_URL?: string;
    readonly VITE_RELEASE_VERSION?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module "*.JPG" {
    const value: string;
    export default value;
}

declare module "*.webp" {
    const value: string;
    export default value;
}
