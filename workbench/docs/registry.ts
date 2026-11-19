import catalog from "virtual:workbench-catalog";
import type { Article, ComponentArticle } from "../content/schema";
import type { DocExample, DocExampleEntry, DocPage, ExportApi } from "./types";

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");

const exampleEntries = (examples?: DocExample[]): DocExampleEntry[] | undefined =>
  examples?.map((example) => ({ ...example, id: `example-${slug(example.title)}` }));
const componentArticles = import.meta.glob<{ default: ComponentArticle }>(
  "../content/components/*.ts",
  { eager: true },
);
const componentNotes = Object.fromEntries(
  Object.entries(componentArticles).map(([path, article]) => [
    path.split("/").pop()!.replace(".ts", ""),
    article.default,
  ]),
);
import { DONE, UNTOUCHED } from "../componentStatus";

const articles = import.meta.glob<{ default: Article }>(
  "../content/{guides,tools}/*.ts",
  { eager: true },
);
export const categories = [
  "Getting started",
  "Actions",
  "Forms",
  "Date & time",
  "Data display",
  "Feedback",
  "Overlays",
  "Navigation",
  "Layout",
  "Blocks",
  "Composables",
  "Helpers",
  "Integration",
];
const guideOrder = [
  "introduction",
  "installation",
  "design-system",
  "theming",
  "localization",
  "adapters",
  "inertia-ssr",
  "contributing",
];
const symbolPage = (symbol: ExportApi) => {
  const file = symbol.file;
  if (file.includes("node_modules/@rosalana/sandbox/")) return "sandbox";
  if (file.startsWith("src/local/")) return "local";
  if (file.startsWith("src/plugin/")) return "plugin-api";
  if (file.startsWith("src/helpers/"))
    return (
      (
        {
          text: "helpers-text",
          locale: "helpers-locale",
          modelModifiers: "helpers-model",
        } as Record<string, string>
      )[file.split("/").pop()!.replace(".ts", "")] ?? "helpers-text"
    );
  if (file.startsWith("src/composables/")) return file.split("/")[2];
  if (file.startsWith("src/components/")) return file.split("/")[3];
  return "plugin-api";
};
const familyMap = new Map<string, typeof catalog.components>();
for (const component of catalog.components) {
  const family = component.group;
  // RangeCalendar is independently documented although it shares the Calendar folder.
  const name = component.name === "UiRangeCalendar" ? "RangeCalendar" : family;
  familyMap.set(name, [...(familyMap.get(name) ?? []), component]);
}
const importExample = (names: string[]) =>
  names.length > 3
    ? `import {\n${names.map((name) => "  " + name + ",").join("\n")}\n} from '@rosalana/ui';`
    : `import { ${names.join(", ")} } from '@rosalana/ui';`;
const componentPages: DocPage[] = [...familyMap].map(([name, components]) => {
  const article = componentNotes[name];
  const group = article?.category ?? "Data display";
  const description = article?.description ?? `${name} components.`;
  const guidance =
    article?.guidance ?? "See the public API and complete example below.";
  const kind = components[0].kind === "block" ? "block" : "component";
  const statusName = name === "RangeCalendar" ? "Calendar" : name;
  const status =
    kind === "block"
      ? undefined
      : DONE.includes(statusName)
        ? "done"
        : UNTOUCHED.includes(statusName)
          ? "untouched"
          : "unimplemented";
  return {
    id: name,
    title: name.replace(/([a-z])([A-Z])/g, "$1 $2"),
    group,
    description,
    kind,
    status,
    components,
    integration: article?.integration,
    symbols: catalog.symbols.filter((s) => symbolPage(s) === name),
    examples: exampleEntries(article?.examples),
    sections: [
      {
        id: "usage",
        title: "Usage",
        text: guidance,
        code: importExample(
          name === "TextEffect"
            ? ["TextEffect"]
            : components.map((component) => component.name),
        ),
      },
      ...(article?.sections ?? []),
    ],
  };
});
const articlePages: DocPage[] = Object.entries(articles).map(
  ([path, module]) => {
    const id = path.split("/").pop()!.replace(".ts", "");
    const kind = path.includes("/guides/") ? "guide" : "tool";
    const symbols = catalog.symbols.filter((s) => symbolPage(s) === id);
    return {
      id,
      ...module.default,
      kind,
      group:
        kind === "guide"
          ? "Getting started"
          : id.startsWith("helpers-")
            ? "Helpers"
            : ["sandbox", "local", "plugin-api"].includes(id)
              ? "Integration"
              : "Composables",
      symbols,
      examples: exampleEntries(module.default.examples),
    };
  },
);
// Keep every public runtime export discoverable, including utility render components.
for (const symbol of catalog.symbols) {
  if (
    [...componentPages, ...articlePages].some((p) =>
      p.symbols?.includes(symbol),
    )
  )
    continue;
  articlePages.find((p) => p.id === "plugin-api")!.symbols!.push(symbol);
}
export const pages: DocPage[] = [
  ...articlePages
    .filter((p) => p.kind === "guide")
    .sort((a, b) => guideOrder.indexOf(a.id) - guideOrder.indexOf(b.id)),
  ...componentPages.sort((a, b) => a.title.localeCompare(b.title, "en")),
  ...articlePages
    .filter((p) => p.kind === "tool")
    .sort((a, b) => a.title.localeCompare(b.title, "en")),
];
export const publicCatalog = catalog;
export const findPage = (id: string) => pages.find((p) => p.id === id);

export type DocumentationSection =
  "guides" | "components" | "blocks" | "composables" | "helpers";
export const documentationSections: DocumentationSection[] = [
  "guides",
  "components",
  "blocks",
  "composables",
  "helpers",
];
export function sectionForPage(page: DocPage): DocumentationSection {
  if (page.kind === "component") return "components";
  if (page.kind === "block") return "blocks";
  if (page.group === "Composables") return "composables";
  if (page.group === "Helpers") return "helpers";
  return "guides";
}
/** The pages of a section in the order of its navigation: by category, as the menu lists them. */
export function pagesForSection(section: DocumentationSection) {
  const inSection = pages.filter((page) => sectionForPage(page) === section);
  return categories.flatMap((category) =>
    inSection.filter((page) => page.group === category),
  );
}
