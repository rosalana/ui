import { section, type Article } from "../schema";
export default {
  title: "Theming & colors",
  description:
    "One semantic palette for every component, in light and dark mode.",
  sections: [
    section(
      "semantic",
      "Choose semantic colors",
      "Configure primary, secondary, muted, destructive, info, success, warning and theme. Each palette generates CSS variables at runtime. Use the semantic token instead of repeating a specific Tailwind color.",
      `colors: {
  primary: { color: 'blue', default: '500 dark:600' },
  secondary: { color: 'violet' },
  muted: { color: 'stone' },
  theme: {
    color: 'stone',
    background: '50 dark:950',
    foreground: '950 dark:50',
  },
}`,
    ),
    section(
      "tokens",
      "Use tokens in your layout",
      "Use text-theme for secondary text. Use bg-background, text-foreground and border-border for surfaces. Semantic classes adapt to the theme without separate color decisions in every component.",
      `<div class="rounded-2xl border border-border bg-background p-6">
  <h2 class="text-foreground">Project settings</h2>
  <p class="text-theme">Manage your workspace preferences.</p>
</div>`,
      "vue",
    ),
    section(
      "custom",
      "Register a custom palette",
      "Call createColor before registering the plugin. Supply a string for a single color or a complete 50–950 shade map for a palette.",
      `import { createColor, createRosalanaApp } from '@rosalana/ui';

createColor('brand', '#4169e1');
app.use(createRosalanaApp, {
  colors: { primary: { color: 'brand' } },
});`,
    ),
    section(
      "appearance",
      "Change appearance",
      "Call initializeTheme in the browser once, then update from user actions. The appearance is stored in localStorage. Enable syncTheme in preferences and configure the theme adapter if your backend should persist it.",
      `import { onMounted } from 'vue';
import { useTheme } from '@rosalana/ui';

const theme = useTheme();
onMounted(() => theme.initializeTheme());

async function enableDarkMode() {
  await theme.update('dark');
}`,
    ),
    section(
      "ssr-colors",
      "Render colors on the server",
      "Inertia applications render ColorVars after the Inertia App in both the browser and SSR entry. This keeps the generated CSS in the Inertia head manager. See the Inertia & SSR guide for the complete setup.",
    ),
  ],
} satisfies Article;
