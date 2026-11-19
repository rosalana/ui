import { section, type Article } from "../schema";
export default {
  title: "Localization",
  description:
    "Component text, dates, numbers and plural forms follow the application locale.",
  sections: [
    section(
      "configure",
      "Set a locale",
      "Built-in messages cover English and Czech. The default is English. Laravel locale codes such as cs_CZ are normalized to BCP 47 tags. Pass the same initial locale to the server and browser.",
      `app.use(createRosalanaApp, {
  locale: 'cs_CZ',
  messages: {
    cs: { 'table.search': 'Hledat projekty…' },
    en: { 'table.search': 'Search projects…' },
  },
});`,
    ),
    section(
      "runtime",
      "Read and change the locale",
      "useLocale returns reactive locale and language refs, t, set and setMessages. A component-specific override affects that component without changing the application locale.",
      `import { useLocale, setLocale, setMessages } from '@rosalana/ui';

const { locale, language, t } = useLocale();
setLocale('cs');
setMessages({ cs: { 'table.search': 'Hledat…' } });

// In a component accepting a locale prop:
const ownLocale = useLocale(() => props.locale);`,
    ),
    section(
      "fallback",
      "Message fallback",
      "Messages resolve from the exact locale to a matching language, then to the built-in default language. Empty strings are valid overrides. Use a namespaced key for every new library message and supply both en and cs in src/plugin/messages.ts.",
    ),
    section(
      "plurals",
      "Format plural forms",
      "The plural helper selects an Intl.PluralRules category in the app locale. Always provide other. Catalog messages can use pipe-separated forms: one|other in English and one|few|many|other in Czech.",
      `import { plural } from '@rosalana/ui/helpers';

plural(3, { one: 'soubor', few: 'soubory', other: 'souborů' });
// In Czech: "soubory"`,
    ),
    section(
      "formatting",
      "Keep formatting consistent",
      "Pass locale.value to Intl and the locale prop to reka-ui primitives. For date formatting during SSR, pass an explicit time zone. Never infer the initial render language from navigator.language.",
    ),
  ],
} satisfies Article;
