/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GTM_ID?: string;
    readonly VITE_HERO_CTA_VARIANT?: "control" | "benefit";
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
