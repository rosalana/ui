import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "RosalanaUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
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
