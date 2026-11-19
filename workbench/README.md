# Rosalana UI documentation

The workbench documents the UI library maintained primarily for Rosalana projects and available for anyone to use. Its interface uses the actual library components and semantic tokens: SideNav, a small top bar composed from NavigationMenu and Buttons, Inputs, Cards, Alerts, Tables, Accordions and Selects. The sidebar is scoped to Guides, Components, Blocks, Composables or Helpers. It is separate from the published library build.

## Run and verify

```bash
npm run workbench            # http://localhost:4000
npm run workbench:build      # static output in workbench/dist
npm run workbench:typecheck  # library + documentation TypeScript
npm run workbench:check      # public export, article and example coverage
```

## Where to edit

| Content                                       | Location                       |
| --------------------------------------------- | ------------------------------ |
| One article per component family              | `content/components/{Name}.ts` |
| One article per composable/helper/integration | `content/tools/{name}.ts`      |
| Setup and conceptual guides                   | `content/guides/{slug}.ts`     |
| Runnable examples, one file each              | `examples/{Page}/{Example}.vue` |
| Navigation, categories and article assembly   | `docs/registry.ts`             |
| Public API extraction                         | `tooling/catalog.ts`           |
| Documentation UI and code presentation        | `components/`                  |
| Layout, typography and syntax colors          | `docs.css`                     |
| Implementation readiness                      | `componentStatus.ts`           |

Authored articles are ordinary TypeScript objects with small, named sections. Markdown tooling is not required. `content/schema.ts` documents the article shape. Each page has a stable hash route (`#/Button`); a section can be linked directly (`#/Button/example-variants`). Old component hashes (`#Button`) also resolve.

## Write an example

Each example is one file, `examples/{Page}/{Example}.vue`, and the page lists it in its article:

```vue
<!-- examples/Button/Loading.vue -->
<script setup lang="ts">
import { useForm } from "@inertiajs/vue3";
import { UiButton } from "@rosalana/ui";

const form = useForm({ name: "" });
</script>

<template>
  <UiButton :loading="form.processing" @click="form.post('/teams')">
    Create team
  </UiButton>
</template>
```

```ts
// content/components/Button.ts
examples: [
  { file: "Loading", title: "Loading while saving", description: "…" },
],
```

The preview renders the file and the Code tab shows the whole file, so it is complete, copy-paste ready app code importing from `@rosalana/ui`. When the preview must simulate what the docs can't run (a request, an Inertia visit), put the real code in `Loading.code.vue` next to it; the Code tab shows that one. `preview` is `center` (default), `fill` (stretch to the frame) or `flush` (no padding); `overflow: true` lets non-portaled flyouts leave the frame. Every preview has a Reset button that mounts the example again.

Show the component's real behavior in all its variants and sizes, its important props, slots and states, and prepared use cases rather than playgrounds. Never add functionality the component doesn't have. Keep a live state readout inside the example it belongs to, never as its own example. Integration blocks (`WebNav`, `SideNav`, `ColorVars`) run in isolated iframe previews backed by a real Inertia client and local fixtures; they also show the application integration code.

All UI component previews remain live, regardless of implementation status. Readiness is informational in the documentation.

## Public API

The Vite plugin reads the library's public entry points and resolves component props (including inherited reka-ui props), defaults, events, models, declared slots, exposed members and public style variants through TypeScript. Runtime-only event declarations are explicitly shown with unknown payload types. Internal components and internal style flags do not become public API pages.

The public component families, block namespace components, composables, helper entry, local Vite entry and Sandbox re-exports are all represented in the registry. Component source is loaded only when its disclosure is opened. Example components load with their page. Example sources are part of the global search index.

`workbench:check` guards against missing component articles, pages without examples, missing or non-portable example files, uncovered variants and sizes, duplicate page/section IDs and undocumented public exports. It also checks representative inherited props, variants and model events. Review example behavior in the browser when changing it.

## Global search

Click the sidebar search input or press ⌘K / Ctrl+K to open the library Command dialog. Results cover all sections, authored headings and text, public components/props/events, exported symbols and example code. Whole pages always form the first group, followed by page sections, examples, component API, props, events, functions/values and types. Within each group, exact names rank first, then name prefixes and other name matches, then content matches. Comparison ignores case, accents and name separators (for example `useTable`, `usetable` and `use table`). The search input receives focus automatically on every open. API results open the matching disclosure and anchor. Search ranking regressions are checked by `workbench:check`.
