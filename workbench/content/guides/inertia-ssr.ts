import { section, type Article } from "../schema";
export default {
  title: "Inertia & SSR",
  description:
    "Connect the library to Laravel page props and keep server rendering predictable.",
  sections: [
    section(
      "page-props",
      "Share page props",
      "useAuth reads auth.user. usePreferences reads preferences. useComputedPage accepts a dot-separated path. Share these props from Laravel; they remain the source of truth instead of a separate client store.",
      `// Inertia shared props (JSON shape)
{
  "auth": { "user": { "id": 1, "name": "Alex", "email": "alex@example.com" } },
  "preferences": { "locale": "en", "theme": "system", "syncTheme": false }
}`,
      "json",
    ),
    section(
      "bootstrap",
      "Register in the Inertia setup",
      "Use the same options in the client and server entry. The example below is the Vue setup callback passed to createInertiaApp; keep your existing resolve and server configuration.",
      `import { createSSRApp, h } from 'vue';
import { ColorVars, createRosalanaApp } from '@rosalana/ui';

setup({ el, App, props, plugin }) {
  const app = createSSRApp({
    render: () => [h(App, props), h(ColorVars)],
  });
  app.use(plugin);
  app.use(createRosalanaApp, { locale: 'en' });
  if (el) app.mount(el);
  return app;
}`,
    ),
    section(
      "hydration",
      "Keep the first render deterministic",
      "Use the same locale, data and time zone on both sides: pass the user's time zone to createRosalanaApp so useDate formats dates the same on the server and in the browser. Now is never known on the server; useDate fills it in once mounted. Run browser APIs in onMounted or event handlers. Apply the initial dark class in the server template before hydration.",
    ),
    section(
      "local",
      "Link a local checkout",
      "A file: dependency can bring a second Vue instance into SSR. Add the local Vite plugin to share the app’s Vue with the linked package and its Vue-based dependencies. The plugin does nothing for a normal registry install.",
      `import rosalanaLocal from '@rosalana/ui/local';

export default defineConfig({
  plugins: [rosalanaLocal(), vue()],
});`,
    ),
    section(
      "standalone",
      "Outside Inertia",
      "Pure UI primitives can run in a regular Vue application after plugin registration. Auth, preferences, active routes, ColorVars and navigation blocks depend on an Inertia page or head manager. Their documentation previews supply an isolated Inertia client and local fixtures; consuming applications supply their own real page data.",
    ),
  ],
} satisfies Article;
