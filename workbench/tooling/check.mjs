import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { createServer as createHttpServer } from "node:http";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const server = await createServer({
  configFile: path.join(root, "workbench/vite.config.ts"),
  server: {
    middlewareMode: true,
    hmr: { server: createHttpServer() },
    watch: null,
  },
  appType: "custom",
  logLevel: "error",
});

try {
  const { pages, publicCatalog } =
    await server.ssrLoadModule("/docs/registry.ts");
  const { searchDocumentation, searchIndex } =
    await server.ssrLoadModule("/docs/search.ts");
  assert.equal(
    new Set(searchIndex.map((item) => item.id)).size,
    searchIndex.length,
    "Unique search result identities",
  );
  for (const [query, expected] of [
    ["Button", "Button"],
    ["useTable", "useTable"],
    ["usetable", "useTable"],
    ["use table", "useTable"],
    ["useTableColumns", "useTableColumns"],
    ["UiButton", "Button"],
    ["textarea", "Textarea"],
    ["RemoteTable", "Remote Table"],
  ]) {
    assert.equal(
      searchDocumentation(query)[0]?.title,
      expected,
      `Name search: ${query}`,
    );
  }
  assert(
    searchDocumentation("debounce").length > 0,
    "Search includes body content",
  );
  for (const query of [
    "button",
    "useTable",
    "UiButton.size",
    "loading",
    "debounce",
    "render",
  ]) {
    const results = searchDocumentation(query);
    const firstFragment = results.findIndex((item) => item.type !== "page");
    if (firstFragment !== -1)
      assert(
        results.slice(firstFragment).every((item) => item.type !== "page"),
        `All pages precede fragments: ${query}`,
      );
    const groups = results
      .map((item) => item.type)
      .filter((type, index, types) => types.indexOf(type) === index);
    for (const type of groups) {
      const indices = results.flatMap((item, index) =>
        item.type === type ? [index] : [],
      );
      assert.equal(
        indices.at(-1) - indices[0] + 1,
        indices.length,
        `Contiguous result group: ${type}`,
      );
    }
  }
  const ids = new Set();
  const integrationPages = new Set(["WebNav", "SideNav", "ColorVars"]);
  for (const page of pages) {
    assert(!ids.has(page.id), `Duplicate page: ${page.id}`);
    ids.add(page.id);
    assert(
      page.description && page.sections.length,
      `Missing content: ${page.id}`,
    );
    const anchors = new Set();
    for (const section of page.sections) {
      assert(
        !anchors.has(section.id),
        `Duplicate section: ${page.id}/${section.id}`,
      );
      anchors.add(section.id);
    }
    if (page.components?.length) {
      assert(
        fs.existsSync(
          path.join(root, `workbench/content/components/${page.id}.ts`),
        ),
        `Missing authored component article: ${page.id}`,
      );
      assert(
        page.examples?.length || integrationPages.has(page.id),
        `Missing examples: ${page.id}`,
      );
    }
  }
  // Examples are app code: complete, importing only the published package.
  for (const page of pages.filter((page) => page.examples?.length)) {
    const sources = page.examples.map((example) => {
      const file = path.join(root, `workbench/examples/${page.id}/${example.file}.vue`);
      assert(fs.existsSync(file), `Broken example: ${page.id}/${example.file}`);
      const shown = file.replace(/\.vue$/, ".code.vue");
      const raw = fs.readFileSync(fs.existsSync(shown) ? shown : file, "utf8");
      assert(
        !/from ["'][^"']*(?:\/src(?:\/|["'])|workbench\/|\.\.\/)/.test(raw),
        `Nonportable example imports: ${page.id}/${example.file}`,
      );
      return raw;
    });
    const raw = sources.join("\n");
    for (const component of page.components ?? []) {
      for (const key of ["variant", "size"]) {
        for (const value of component.variants[key] ?? []) {
          const defaultValue = component.props.find(
            (prop) => prop.name === key,
          )?.default;
          assert(
            // A component used without the prop shows its default variant.
            value === "default" ||
            defaultValue === JSON.stringify(value) ||
              defaultValue === `'${value}'` ||
              raw.includes(`"${value}"`) ||
              raw.includes(`'${value}'`),
            `Missing ${component.name} ${key} example: ${value}`,
          );
        }
      }
    }
  }
  for (const component of publicCatalog.components)
    assert(
      pages.some((p) => p.components?.some((c) => c.name === component.name)),
      `Undocumented component: ${component.name}`,
    );
  for (const symbol of publicCatalog.symbols)
    assert(
      pages.some((p) =>
        p.symbols?.some(
          (s) => s.name === symbol.name && s.entry === symbol.entry,
        ),
      ),
      `Undocumented export: ${symbol.name}`,
    );
  const button = publicCatalog.components.find((c) => c.name === "UiButton");
  assert(
    button.props.some(
      (p) => p.name === "loading" && p.type.includes("boolean"),
    ),
    "Missing local Button prop",
  );
  assert(
    button.props.some((p) => p.name === "asChild"),
    "Missing inherited reka-ui prop",
  );
  assert(
    button.variants.variant.includes("destructive"),
    "Missing button variant",
  );
  const input = publicCatalog.components.find((c) => c.name === "UiInput");
  assert(
    input.events.some((e) => e.name === "update:modelValue"),
    "Missing input model event",
  );
  console.log(
    `Documentation coverage: ${pages.length} pages, ${publicCatalog.components.length} public component parts, ${publicCatalog.symbols.length} exports. All checks passed.`,
  );
} finally {
  await server.close();
}
