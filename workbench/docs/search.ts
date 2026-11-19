import { pages, documentationSections, sectionForPage } from "./registry";
import type { DocumentationSection } from "./registry";
export const searchResultTypes = [
  "page",
  "section",
  "example",
  "component",
  "prop",
  "event",
  "value",
  "type",
] as const;
export type SearchResultType = (typeof searchResultTypes)[number];
export interface SearchResult {
  type: SearchResultType;
  aliases?: string[];
  id: string;
  title: string;
  detail: string;
  href: string;
  section: DocumentationSection;
  content: string;
}
import { exampleCode } from "./exampleFiles";
export const searchIndex: SearchResult[] = documentationSections.map(
  (section) => ({
    type: "page",
    id: section,
    title: section[0].toUpperCase() + section.slice(1),
    detail: "Section overview",
    href: `#/${section}`,
    section,
    content: section,
  }),
);
for (const page of pages) {
  const section = sectionForPage(page);
  searchIndex.push({
    type: "page",
    aliases: [
      page.id,
      ...(page.components ?? []).map((component) => component.name),
    ],
    id: page.id,
    title: page.title,
    detail: page.description,
    href: `#/${page.id}`,
    section,
    content: [
      page.description,
      ...page.sections.map((s) => `${s.title} ${s.text ?? ""} ${s.code ?? ""}`),
    ].join(" "),
  });
  for (const part of page.sections)
    searchIndex.push({
      type: "section",
      id: `${page.id}/${part.id}`,
      title: part.title,
      detail: page.title,
      href: `#/${page.id}/${part.id}`,
      section,
      content: `${part.text ?? ""} ${part.code ?? ""}`,
    });
  for (const component of page.components ?? []) {
    searchIndex.push({
      type: "component",
      id: `component-${component.name}`,
      title: component.name,
      detail: page.title + " · API",
      href: `#/${page.id}/component-${component.name}`,
      section,
      content: component.file,
    });
    for (const prop of component.props)
      searchIndex.push({
        type: "prop",
        id: `${component.name}.${prop.name}`,
        title: `${component.name}.${prop.name}`,
        detail: prop.description || prop.type,
        href: `#/${page.id}/component-${component.name}`,
        section,
        content: `${prop.type} ${prop.description}`,
      });
    for (const event of component.events)
      searchIndex.push({
        type: "event",
        id: `${component.name}/${event.name}`,
        title: `${component.name} · ${event.name}`,
        detail: "Event · " + event.type,
        href: `#/${page.id}/component-${component.name}`,
        section,
        content: event.description,
      });
  }
  for (const symbol of page.symbols ?? [])
    searchIndex.push({
      type: symbol.kind === "type" ? "type" : "value",
      id: `${page.id}/export-${symbol.name}`,
      title: symbol.name,
      detail: `${page.title} · ${symbol.entry}`,
      href: `#/${page.id}/export-${symbol.name}`,
      section,
      content: `${symbol.description} ${symbol.declaration}`,
    });
  for (const example of page.examples ?? [])
    searchIndex.push({
      type: "example",
      id: `${page.id}/${example.id}`,
      title: example.title,
      detail: page.title + " · Example",
      href: `#/${page.id}/${example.id}`,
      section,
      content: `${example.description ?? ""} ${exampleCode(page.id, example.file)}`,
    });
}
export function normalizeSearch(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}
// Result type determines the group order: whole pages always precede fragments.
// Within each type, name matches precede description/source matches.
export function searchDocumentation(query: string): SearchResult[] {
  const needle = normalizeSearch(query.trim());
  if (!needle)
    return searchIndex.filter((item) => item.type === "page").slice(0, 16);
  const compact = (value: string) => value.replace(/[^a-z0-9]/g, "");
  const queryName = compact(needle);
  const words = needle.split(/\s+/);
  return searchIndex
    .map((item, index) => {
      const names = [item.title, ...(item.aliases ?? [])];
      const text = normalizeSearch(
        `${item.title} ${item.detail} ${item.content}`,
      );
      const score = Math.min(
        ...names.map((label) => {
          const title = normalizeSearch(label);
          const name = compact(title);
          const alias = /^Ui[A-Z]/.test(label)
            ? compact(normalizeSearch(label.slice(2)))
            : name;
          return queryName && (name === queryName || alias === queryName)
            ? 0
            : queryName &&
                (name.startsWith(queryName) || alias.startsWith(queryName))
              ? 1
              : title.includes(needle)
                ? 2
                : words.every((word) => title.includes(word))
                  ? 3
                  : queryName && name.includes(queryName)
                    ? 4
                    : words.every((word) => text.includes(word))
                      ? 5
                      : 99;
        }),
      );
      return { item, score, index };
    })
    .filter((result) => result.score < 99)
    .sort(
      (a, b) =>
        searchResultTypes.indexOf(a.item.type) -
          searchResultTypes.indexOf(b.item.type) ||
        a.score - b.score ||
        a.item.title.length - b.item.title.length ||
        a.index - b.index,
    )
    .slice(0, 80)
    .map((result) => result.item);
}
