import { section, type Article } from "../schema";

export default {
  title: "Local Vite plugin",
  description: "Share Vue when consuming a local file-linked checkout.",
  sections: [
    section(
      "usage",
      "Add the Vite plugin",
      "The local entry exports a default Vite plugin. Use alongside your application plugins. It discovers Vue-based dependencies from the installed dependency graph.",
      `import rosalanaLocal from '@rosalana/ui/local';

export default defineConfig({
  plugins: [rosalanaLocal(), vue()],
});`,
    ),
    section(
      "behavior",
      "When it runs",
      "The plugin activates only when the package lives outside node_modules. It deduplicates Vue and peer dependencies and sets ssr.noExternal for linked Vue-based dependencies. It can stay in configuration after switching to a registry version.",
    ),
  ],
} satisfies Article;
