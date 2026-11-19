import type { Component } from "vue";

/** Runnable examples, loaded when their page opens. */
export const exampleComponents = import.meta.glob<Component>(
  ["../examples/*/*.vue", "!../examples/*/*.code.vue"],
  { import: "default" },
);

/** Sources shown next to the examples and indexed by the search. */
export const exampleSources = import.meta.glob<string>("../examples/*/*.vue", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const examplePath = (page: string, file: string) =>
  `../examples/${page}/${file}.vue`;

/** The source to show: `{file}.code.vue` when present, the example itself otherwise. */
export function exampleCode(page: string, file: string) {
  return (
    exampleSources[`../examples/${page}/${file}.code.vue`] ??
    exampleSources[examplePath(page, file)] ??
    ""
  ).trim();
}
