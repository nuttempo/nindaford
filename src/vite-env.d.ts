/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GTM_ID?: string;
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
