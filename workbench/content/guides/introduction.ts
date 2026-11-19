import { section, type Article } from "../schema";

export default {
  title: "Introduction",
  description:
    "The shared UI library for Rosalana projects, maintained internally and available for anyone to use.",
  sections: [
    section(
      "purpose",
      "Built for Rosalana projects",
      "Rosalana UI is the common UI foundation used by applications in the Rosalana ecosystem. It is developed and maintained primarily for those projects: shared components, visual conventions and application tools live in one package so improvements can be used across applications.",
    ),
    section(
      "availability",
      "Using it in your own project",
      "The library is primarily an internal Rosalana dependency, and anyone can also use it in their own projects under the repository’s MIT license. Its development priorities follow Rosalana applications. Some APIs assume the same Vue, Laravel and Inertia conventions; the integration guides explain those requirements.",
    ),
    section(
      "ecosystem",
      "Part of a shared application foundation",
      "Rosalana projects share backend conventions through rosalana/core and a UI layer through @rosalana/ui. The UI package provides a reactive application context, semantic colors, localization, backend adapters and composable Vue components. A consuming application supplies its data, routes and persistence.",
    ),
    section(
      "structure",
      "Find the right part of the library",
      "Guides explain setup and application integration. Components contains Ui primitives grouped by purpose. Blocks contains complete patterns such as tables, navigation and uploads. Composables contains shared Vue behavior. Helpers contains the standalone text, date, locale and input utilities. The sidebar shows only the section you are currently reading.",
    ),
    section(
      "examples",
      "Read an example",
      "Each component page explains its purpose, shows its supported capabilities and includes copyable code. A preview/code frame always fills the documentation column; the example inside can use a narrower layout. The complete example includes imports and reactive state. API references and component source come directly from the current checkout.",
    ),
    section(
      "readiness",
      "Implementation status",
      "Ready means the component has been reviewed against Rosalana UI standards. Needs review identifies a usable component awaiting a complete review. Not implemented identifies a component whose Rosalana implementation is still pending. All examples remain live so you can inspect actual behavior; the status describes readiness for application use.",
    ),
  ],
} satisfies Article;
