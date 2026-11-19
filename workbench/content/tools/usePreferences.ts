import { section, type Article } from "../schema";

export default {
  title: "usePreferences",
  description: "Read and update backend-backed preferences through an adapter.",
  sections: [
    section(
      "usage",
      "Usage",
      "usePreferences reads the preferences Inertia page prop and writes changes back through the preferences adapter. get() returns the whole preferences object, get('theme') one key, and null when there are no preferences. update takes a partial object and returns a promise of the saved preferences.",
      `import { usePreferences } from '@rosalana/ui';

const preferences = usePreferences();

const theme = preferences.get('theme');
await preferences.update({ locale: 'cs' });`,
    ),
    section(
      "adapter",
      "The adapter does the saving",
      "update calls the preferences adapter from createRosalanaApp with the changed keys. It should send them to the backend and return the saved preferences, not an Axios response. The result is merged into the context, so every reader of get() sees the new value at once. Without a configured adapter update rejects with an error.",
      `app.use(createRosalanaApp, {
  name: 'Tournaments',
  adapters: {
    preferences: async (data) => {
      const response = await axios.patch('/preferences', data);
      return response.data;
    },
  },
});`,
    ),
    section(
      "typed",
      "Your own preference keys",
      "The built-in keys are theme, locale and syncTheme. Pass a type to usePreferences to add your own, and the backend to share them in the preferences prop.",
      `const preferences = usePreferences<{ compactTables: boolean }>();
preferences.get('compactTables');
await preferences.update({ compactTables: true });`,
    ),
    section(
      "errors",
      "Handle persistence errors",
      "A failed save rejects the promise of update. Catch it where the user acts, for example in the handler of a switch, and tell them the preference was not saved.",
      `try {
  await preferences.update({ locale: 'cs' });
} catch {
  sonner.error('Your preference could not be saved.');
}`,
    ),
  ],
} satisfies Article;
