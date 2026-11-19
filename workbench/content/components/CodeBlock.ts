import { section, type ComponentArticle } from "../schema";

export default {
  category: "Data display",
  description:
    "Highlighted code with copy, alone or grouped with a live preview and more files.",
  guidance:
    "Use UiCodeBlock for a single snippet. Wrap several in UiCodeBlockGroup to switch between them, and add UiCodeBlockPreview to show the result next to its code. Highlighting runs in the browser with Shiki in the app's own colors; the server renders the plain code in the same layout.",
  sections: [
    section(
      "group",
      "Groups and previews",
      "Inside a UiCodeBlockGroup every UiCodeBlock and UiCodeBlockPreview becomes a tab, labelled by its label, filename or value, and the group draws one shared frame with a copy button for the shown code. The first item shows unless default-value or v-model names another by its value. A UiCodeBlockPreview keeps its state while its code is shown, and its actions slot puts buttons next to the copy button, such as a reset.",
    ),
    section(
      "language",
      "Language",
      "language is any language Shiki knows (vue, ts, php, bash...) and defaults to ts. An unknown language shows plain code. When filename is missing, the language is shown in the header.",
    ),
  ],
  examples: [
    { file: "Single", title: "A single snippet", preview: "fill" },
    { file: "LineNumbers", title: "Line numbers", preview: "fill" },
    {
      file: "Files",
      title: "Several files",
      description: "A group switches between related snippets.",
      preview: "fill",
    },
    {
      file: "Preview",
      title: "Preview with code",
      description: "The result next to its source, with a reset in the actions slot.",
      preview: "fill",
    },
    {
      file: "Controlled",
      title: "Controlled group",
      description: "v-model holds the value of the shown item.",
      preview: "fill",
    },
  ],
} satisfies ComponentArticle;
