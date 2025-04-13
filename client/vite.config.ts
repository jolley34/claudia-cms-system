// client/vite.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {},
  },
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5001", // Proxylar API-anrop till lokal server
        changeOrigin: true, // För att hantera CORS om nödvändigt
        secure: false, // För lokala HTTP-anrop
      },
    },
  },
});
