import { section, type Article } from "../schema";
export default {
  title: "Design principles",
  description:
    "Soft shapes, clear hierarchy and small moments of warmth across Rosalana applications.",
  sections: [
    section(
      "surfaces",
      "Surfaces & hierarchy",
      "Use solid semantic surfaces, generous whitespace and rounded-xl or rounded-2xl containers. Keep paragraphs under roughly 80 characters per line. A border should explain a boundary; a shadow should explain elevation.",
    ),
    section(
      "color",
      "Color with purpose",
      "Primary identifies the main action. Destructive identifies a destructive action. Use text-theme for secondary text. Reserve tinted, diffuse shadows for controls and elevated surfaces.",
      `<UiButton>Save changes</UiButton>
<UiButton variant="outline">Cancel</UiButton>
<UiButton variant="destructive">Delete project</UiButton>`,
      "vue",
    ),
    section(
      "motion",
      "Motion that answers an action",
      "Use motion-v for new interactions, usually with a spring. Respect prefers-reduced-motion. Keep movement tied to a meaningful state change rather than animating every paragraph.",
      `<motion.div
  :animate="{ opacity: open ? 1 : 0, scale: open ? 1 : 0.98 }"
  :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
/>`,
      "vue",
    ),
    section(
      "composition",
      "Primitives & blocks",
      "Ui components wrap accessible reka-ui primitives and expose composable parts. Blocks combine those primitives into complete patterns. Check implementation status before choosing a primitive; an exported name alone does not mean it is ready.",
    ),
    section(
      "a11y",
      "Accessible by construction",
      "Keep the title and description in dialogs, associate labels with inputs, label icon-only buttons, and preserve focus indicators. Accessible primitives still need meaningful content from the consuming app.",
    ),
  ],
} satisfies Article;
