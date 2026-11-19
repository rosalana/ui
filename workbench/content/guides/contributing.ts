import { section, type Article } from "../schema";
export default {
  title: "Contributing to the docs",
  description:
    "Keep examples, authored guidance and generated API references close to the source.",
  sections: [
    section(
      "structure",
      "One responsibility per file",
      "workbench/content/guides contains guides. workbench/content/tools contains tool articles. workbench/content/components contains one authored file per component family. workbench/docs/registry.ts assembles navigation. workbench/tooling/catalog.ts reads public exports and TypeScript APIs.",
    ),
    section(
      "authoring",
      "Write an article",
      "Create a named file with a title, short description and ordered sections. Each section has a stable id used by the page contents. Code is plain text, so Vue examples do not need escaping in a Markdown parser.",
      `import { section, type Article } from '../schema';

export default {
  title: 'My guide',
  description: 'Explain when to use this feature.',
  sections: [
    section('usage', 'Usage', 'Explain the example.', 'const value = 1;'),
  ],
} satisfies Article;`,
    ),
    section(
      "examples",
      "Add a runnable example",
      "Create workbench/examples/{Page}/{Example}.vue and list it under examples in the page's article. The preview renders the file and the Code tab shows the whole file, so write complete app code that imports from @rosalana/ui. When the preview has to simulate a request or an Inertia visit, put the real code in {Example}.code.vue next to it. Cover every variant and size, the important props and states, and real use cases.",
    ),
    section(
      "api",
      "API stays connected to source",
      "The Vite catalog reads every public component and tool from the entry points, including inherited props, declared events, models, slots, variants and types. Newly exported component families get a page automatically. Add authored guidance and examples before considering their documentation finished.",
    ),
    section(
      "status",
      "Publish honest implementation status",
      "The DONE and UNTOUCHED arrays in workbench/componentStatus.ts are authoritative for Ui primitives. All primitives have live previews, including those awaiting implementation; their status remains visible as guidance. Blocks are documented separately and carry a review notice rather than borrowing a primitive status.",
    ),
  ],
} satisfies Article;
