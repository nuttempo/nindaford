import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/nindaford/",
  build: {
    rollupOptions: {
      input: "/src/main.tsx", // React entry
    },
    outDir: "docs",
    emptyOutDir: true,
  },
});