import { section, type ComponentArticle } from "../schema";

export default {
  category: "Blocks",
  description: "Keep generated theme variables in the Inertia head manager.",
  guidance:
    "Render after the Inertia App on both server and client. This integration component has no visible interface and needs the Inertia head manager.",
  integration: true,
  sections: [
    section(
      "integration",
      "Render with the Inertia App",
      "Use the same render function in the client and SSR setup callbacks. The stable head key lets Inertia reconcile generated CSS without duplicates.",
      `import { createSSRApp, h } from 'vue';
import { ColorVars, createRosalanaApp } from '@rosalana/ui';

// Inside the createInertiaApp setup callback:
const app = createSSRApp({
  render: () => [h(App, props), h(ColorVars)],
});
app.use(plugin);
app.use(createRosalanaApp, { locale: 'en' });`,
      "ts",
    ),
  ],
} satisfies ComponentArticle;
