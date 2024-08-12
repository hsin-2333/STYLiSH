import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // outDir: 'public/vite-app',
    outDir: "public/",
    rollupOptions: {
      input: {
        main: "index.html",
        product: "product.html",
        homepage: "homepage.html",
      },
    },
  },
  server: {
    fs: {
      allow: ["."], // Allow serving files from the root directory
    },
  },
});
