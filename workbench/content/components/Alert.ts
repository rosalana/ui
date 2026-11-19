import { section, type ComponentArticle } from "../schema";

export default {
  category: "Feedback",
  description: "An inline message that keeps useful context in the page.",
  guidance:
    "Compose UiAlertTitle and UiAlertDescription to explain the state and the next action. The variant carries the meaning and picks a matching icon; danger is a quieter alternative to destructive for errors that don't need a loud background. Use SmallAlert for short hints next to a control.",
  sections: [
    section(
      "composition",
      "Composition",
      "UiAlert is the container with the icon; its content goes in the default slot. Title and description are optional, so an alert can be a single sentence. Anything else, such as a button, can sit in the slot next to them. The root has role=\"alert\", so screen readers announce it when it appears. Don't render one permanently for static content; use a plain card instead.",
    ),
    section(
      "icons",
      "Icons",
      "Every variant has its own default icon. Pass icon (an Iconify name) to replace it. UiAlertTitle accepts variant=\"mono\" for a small uppercase label above the description.",
    ),
  ],
  examples: [
    { file: "Variants", title: "Variants", description:
      "All seven variants. Use default and destructive sparingly, they are the loudest.", preview: "fill" },
    { file: "Icons", title: "Custom icons and mono title", description:
      "icon replaces the default icon; mono titles work as a small label.", preview: "fill" },
    { file: "Action", title: "With an action", description:
      "A button inside the alert, shown until the problem is solved.", preview: "fill" },
  ],
} satisfies ComponentArticle;
