import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pkg from "./package.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dependencies are installed by npm alongside the package, so keep them out of the bundle
const externals = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
];

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
      external: (id) =>
        externals.some((dep) => id === dep || id.startsWith(`${dep}/`)),
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
