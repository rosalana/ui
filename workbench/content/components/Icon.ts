import { section, type ComponentArticle } from "../schema";

export default {
  category: "Data display",
  description: "Render bundled Iconify icons or application SVG icons.",
  guidance:
    "Pass name as set:icon, such as lucide:home or mdi:github. Lucide, MDI, Logos and Simple Icons are bundled, so icons render on the server and need no request. Size with Tailwind classes or the size prop; the icon takes the current text color.",
  sections: [
    section(
      "local",
      "Your own icons",
      "Register an app's own SVGs under the icons option of createRosalanaApp (or with addLocalIcons) and use them as local:name. Each icon is the markup of an SVG file; its viewBox sets the proportions, and fill=\"currentColor\" or stroke=\"currentColor\" makes it follow the text color.",
      `app.use(createRosalanaApp, {
  name: "Arena",
  icons: {
    "single-elimination": '<svg viewBox="0 0 24 24">...</svg>',
  },
});

// <UiIcon name="local:single-elimination" />`,
    ),
    section(
      "a11y",
      "Accessibility",
      "UiIcon is decorative by default and has no text. When a label or text sits next to it, hide the icon with aria-hidden. When it is the only content of a control, name the control with aria-label.",
    ),
  ],
  examples: [
    { file: "Sets", title: "Icon sets", description: "Names use the set:icon format; set-icon works too." },
    { file: "Sizes", title: "Sizes and color" },
    { file: "Local", title: "Local icons", description: "The app's own SVGs, used as local:name." },
    { file: "Accessibility", title: "Decorative and labelled icons" },
  ],
} satisfies ComponentArticle;
