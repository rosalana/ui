import { section, type Article } from "../schema";

export default {
  title: "Plugin API",
  description:
    "Plugin registration, context, colors, icons, translations and global UI.",
  sections: [
    section(
      "usage",
      "Register once",
      "createRosalanaApp is a Vue plugin object. Pass an options object or a factory returning options. The plugin registers colors, bundled icons and the global virtual layer.",
      `app.use(createRosalanaApp, {
  name: 'Workspace',
  locale: 'en',
  colors: { primary: { color: 'blue' } },
});`,
    ),
    section(
      "icons",
      "Register local icons",
      "Built-in Iconify collections are bundled. Register your own SVG markup through the icons option or addLocalIcons, then reference it with the local prefix.",
      `addLocalIcons({
  mark: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="currentColor"/></svg>',
});
// <UiIcon name="local:mark" />`,
    ),
    section(
      "global",
      "Global UI layer",
      "accessGlobal registers a component in the plugin virtual layer. useConfirm and useSonner already register their own components. Avoid registering the same global component repeatedly.",
    ),
    section(
      "reference",
      "Related guides",
      "Installation covers bootstrap. Context & adapters covers backend persistence. Theming & colors covers palette configuration. Localization covers message fallback and runtime locale changes. The reference below lists all public plugin values and types.",
    ),
  ],
} satisfies Article;
