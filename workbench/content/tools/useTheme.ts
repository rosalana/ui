import { section, type Article } from "../schema";

export default {
  title: "useTheme",
  description: "Read and persist light, dark or system appearance.",
  sections: [
    section(
      "usage",
      "Usage",
      "Call useTheme in setup and initializeTheme once from onMounted. From then on the root dark class follows the selected mode. update changes the mode, get returns it and isDark tells whether the page is dark right now.",
      `import { onMounted } from 'vue';
import { useTheme } from '@rosalana/ui';

const theme = useTheme();
onMounted(() => theme.initializeTheme());

async function toggleTheme() {
  await theme.update(theme.isDark() ? 'light' : 'dark');
}`,
    ),
    section(
      "modes",
      "Modes and what they do",
      "The mode is light, dark or system, and anything else is treated as system. In system mode the page follows prefers-color-scheme, read from the browser. A mode is applied by toggling the dark class on the document element and stored in localStorage under appearance, so the choice survives a reload. get returns the selected mode, not the resolved one; use isDark when you need to know what the user actually sees (an icon that mirrors the page, for example).",
    ),
    section(
      "ssr",
      "Server rendering",
      "initializeTheme does nothing outside the browser, and isDark returns false on the server. Call initializeTheme only from onMounted, and let the server-rendered template apply the theme class so the first paint is already right. Avoid reading isDark during render for anything that would differ between the server and the browser; render a neutral state until mounted.",
    ),
    section(
      "sync",
      "Synchronize with preferences",
      "By default the appearance is local to the browser. When the user's preferences have syncTheme set to true, the mode is read from preferences.theme (falling back to the local value) and update goes through the theme adapter you pass to createRosalanaApp, so the choice follows the user between devices. The adapter receives the new mode and should persist it.",
      `app.use(createRosalanaApp, {
  name: 'Tournaments',
  adapters: {
    theme: async (mode) => {
      await axios.post('/preferences/theme', { theme: mode });
      return mode;
    },
  },
});`,
    ),
  ],
  examples: [
    {
      file: "Appearance",
      title: "Appearance picker",
      description:
        "Light, dark or follow the system. The choice is applied to the page right away and kept in localStorage.",
    },
    {
      file: "Toggle",
      title: "Dark mode toggle",
      description:
        "A single icon button for a header: isDark decides the icon and which mode to switch to.",
    },
  ],
} satisfies Article;
