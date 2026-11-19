import { section, type Article } from "../schema";

export default {
  title: "useLocale",
  description: "Application locale and translated component messages.",
  sections: [
    section(
      "usage",
      "Usage",
      "Call useLocale in setup after the plugin is registered. locale (cs-CZ) and language (cs) are computed refs, t returns a text of the components in the current locale, set switches the locale of the whole app and setMessages adds your own texts for a locale. The locale is whatever the app set, never the browser language, so the server and the browser render the same.",
      `import { useLocale } from '@rosalana/ui';

const { locale, language, t, set } = useLocale();

const label = t('table.search');
set('cs_CZ');`,
    ),
    section(
      "messages",
      "Texts, parameters and plurals",
      "Every text of the components lives under a namespaced key such as table.search. A {name} in a text is replaced by a parameter, t('key', { name }). A text with a count parameter may have plural forms split by |, in the order of the language's Intl.PluralRules categories: one|other in English, one|few|many|other in Czech. Missing texts fall back to the language, then to English. Override texts for your app with createRosalanaApp's messages option or setMessages.",
      `setMessages('cs', { 'table.search': 'Hledat zápasy…' });`,
    ),
    section(
      "plural",
      "Plurals outside the catalog",
      "For words of your own that depend on a number use the plural helper from the package. It picks the form for the app locale by itself and falls back to other when the language has no form for a category. Don't write count === 1 by hand, languages like Czech have more forms. The same goes for Intl and every date or number formatting: pass the locale from useLocale.",
      `import { plural } from '@rosalana/ui';

plural(3, { one: 'player', other: 'players' });`,
    ),
    section(
      "override",
      "A component's own locale",
      "A component with a locale prop passes it as the override, useLocale(() => props.locale). When it is set it wins over the app locale, otherwise the app locale applies. The override only changes that call, set changes the whole app.",
    ),
  ],
  examples: [
    {
      file: "Switching",
      title: "Switch the app language",
      description:
        "set changes the language everywhere: the catalog texts through t, the plural form of the roster and the formatted date. The demo restores the locale when it is reset.",
    },
    {
      file: "Override",
      title: "Locale override",
      description:
        "Without a locale prop the app locale is used.",
    },
  ],
} satisfies Article;
