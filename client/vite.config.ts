// client/vite.config.ts
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shared/schemas": path.resolve(__dirname, "../shared/schemas"),
      "@shared/types": path.resolve(__dirname, "../shared/types"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["zod"],
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
