import type { Plugin } from "vite";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, sep } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Vite plugin for apps that use @rosalana/ui linked from a local checkout (`file:` dependency).
 *
 * The linked package brings its own node_modules, Vue included. On the server its Vue-based
 * dependencies (reka-ui, motion-v, …) would load that second Vue and break rendering with
 * "Cannot read properties of null (reading 'ce')". The plugin hands them to Vite (`ssr.noExternal`)
 * so they go through `resolve.dedupe` and share the app's Vue.
 *
 * It only kicks in while the package is linked. Installed from the registry it lives in the app's
 * node_modules, there's a single Vue, and the plugin does nothing, so it can stay in the config.
 *
 * ```ts
 * import rosalanaLocal from "@rosalana/ui/local";
 *
 * export default defineConfig({
 *   plugins: [rosalanaLocal(), vue()],
 * });
 * ```
 */
export default function rosalanaLocal(): Plugin {
  return {
    name: "rosalana-ui:local",
    config() {
      const root = packageRoot();
      if (!isLinked(root)) return;

      const pkg = readPackage(join(root, "package.json"));
      const shared = [...new Set(["vue", ...Object.keys(pkg?.peerDependencies ?? {})])];

      return {
        resolve: { dedupe: shared },
        ssr: {
          noExternal: [pkg?.name ?? "@rosalana/ui", ...vueDependencies(root).filter((name) => !shared.includes(name))],
        },
      };
    },
  };
}

interface PackageJson {
  name?: string;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

/** This file sits in `<package>/dist`. */
function packageRoot() {
  return dirname(dirname(fileURLToPath(import.meta.url)));
}

/** A real install lives in some node_modules, a linked checkout doesn't. */
function isLinked(root: string) {
  return !root.split(sep).includes("node_modules");
}

function readPackage(path: string): PackageJson | null {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

/** Finds an installed dependency the way Node would, walking up from `from`. */
function findPackage(name: string, from: string) {
  let dir = from;
  while (true) {
    const path = join(dir, "node_modules", name, "package.json");
    if (existsSync(path)) return { path, pkg: readPackage(path) };
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

/**
 * Every runtime dependency of the package, direct or nested, that imports Vue. Read from what's
 * installed, so a newly added Vue library is picked up without touching this list.
 */
function vueDependencies(root: string) {
  const found = new Set<string>();
  const seen = new Set<string>();
  const queue = Object.keys(readPackage(join(root, "package.json"))?.dependencies ?? {}).map((name) => ({
    name,
    from: root,
  }));

  while (queue.length) {
    const { name, from } = queue.shift()!;
    const installed = findPackage(name, from);
    if (!installed?.pkg || seen.has(installed.path)) continue;
    seen.add(installed.path);

    const { dependencies = {}, peerDependencies = {} } = installed.pkg;
    // vue-demi is a thin Vue re-export, some libraries (e.g. @floating-ui/vue) import Vue through it
    const usesVue = ["vue", "vue-demi"].some((vue) => vue in dependencies || vue in peerDependencies);
    if (usesVue) found.add(name);

    const dir = dirname(installed.path);
    for (const dependency of Object.keys(dependencies)) queue.push({ name: dependency, from: dir });
  }

  found.delete("vue");
  return [...found];
}
