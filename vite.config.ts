import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        helpers: path.resolve(__dirname, "src/helpers/index.ts"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "@inertiajs/vue3"],
      output: {
        globals: {
          vue: "Vue",
          "@inertiajs/vue3": "InertiaVue3",
        },
      },
    },
    emptyOutDir: false,
  },
});
