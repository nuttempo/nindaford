import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/nindaford/",        // สำคัญมาก
  build: {
    outDir: "docs",          // ให้ build ไปลง docs
  },
});
