import { defineConfig } from "vite";
import { documentationCatalog } from "./tooling/catalog";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  cacheDir: path.resolve(__dirname, "../node_modules/.vite-workbench"),
  optimizeDeps: { include: ["vue", "@inertiajs/vue3", "reka-ui", "motion-v"] },
  plugins: [
    documentationCatalog(path.resolve(__dirname, "..")),
    vue(),
    tailwindcss(),
  ],
  resolve: {
    dedupe: ["vue"],
    alias: [
      // The more specific entry first, or it would resolve under src/index.ts.
      {
        find: "@rosalana/ui/helpers",
        replacement: path.resolve(__dirname, "../src/helpers/index.ts"),
      },
      { find: "@rosalana/ui", replacement: path.resolve(__dirname, "../src/index.ts") },
      { find: "workbench", replacement: path.resolve(__dirname, "../workbench") },
    ],
  },
  build: {
    rollupOptions: {
      input: {
        documentation: path.resolve(__dirname, "index.html"),
        preview: path.resolve(__dirname, "preview.html"),
      },
    },
  },
  server: {
    port: 4000,
    open: true,
  },
});
