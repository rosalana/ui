import { section, type Article } from "../schema";
export default {
  title: "Context & adapters",
  description:
    "Read shared application configuration and synchronize reactive data with a backend.",
  sections: [
    section(
      "context",
      "Access application context",
      "useAppContext returns the reactive runtime context. useAppDefaults exposes the initial configuration reference; treat it as read-only by convention. Register the plugin before calling either helper.",
      `import { useAppContext, useAppDefaults } from '@rosalana/ui';

const context = useAppContext();
const defaults = useAppDefaults();
console.log(context.name, defaults.colors);`,
    ),
    section(
      "preferences",
      "Persist preferences",
      "An adapter callback receives a partial update and must return the saved data. A source update also updates the context. Do not return the Axios response wrapper.",
      `app.use(createRosalanaApp, {
  adapters: {
    preferences: async (patch) => {
      const response = await axios.patch('/preferences', patch);
      return response.data;
    },
  },
});

// Inside an Inertia page:
const preferences = usePreferences();
await preferences.update({ locale: 'cs' });`,
    ),
    section(
      "custom",
      "Create a custom adapter",
      "Bind a ref or computed source to a named context property. sync defaults to true and requires a matching callback in the plugin options. With sync: false, update runs locally and can transform the patch.",
      `import { ref } from 'vue';
import { createAdapter } from '@rosalana/ui';

const source = ref({ compact: false });
const settings = createAdapter({
  name: 'workspaceSettings',
  source,
  sync: false,
});
await settings.update({ compact: true });
settings.get('compact'); // true`,
    ),
    section(
      "errors",
      "Handle failures",
      "update returns a Promise. Catch persistence errors in the action that initiated the change and provide feedback through useSonner. A synchronized adapter without a configured callback rejects with “No adapter function configured”.",
    ),
  ],
} satisfies Article;
