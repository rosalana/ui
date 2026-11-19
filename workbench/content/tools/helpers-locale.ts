import { section, type Article } from "../schema";

export default {
  title: "Locale helpers",
  description: "Normalize Laravel locale codes and match supported languages.",
  sections: [
    section(
      "usage",
      "Usage",
      "Backends send locale codes like cs, en_GB or cs_CZ, while Intl, @internationalized/date and reka-ui want BCP 47 tags such as cs-CZ. These helpers convert one into the other and pick the best available locale. The components use them internally; reach for them when you load your own translations or choose a language.",
      `import { DEFAULT_LOCALE, normalizeLocale, localeLanguage, matchLocale } from '@rosalana/ui/helpers';

DEFAULT_LOCALE;                       // 'en'
normalizeLocale('cs_CZ');             // 'cs-CZ'
normalizeLocale('en-gb');             // 'en-GB'
localeLanguage('en-GB');              // 'en'
matchLocale('cs_CZ', ['en', 'cs']);   // 'cs'
matchLocale('de', ['en', 'cs']);      // undefined`,
    ),
    section(
      "normalize",
      "normalizeLocale and localeLanguage",
      "normalizeLocale replaces underscores with dashes and returns the canonical tag from Intl.getCanonicalLocales, so casing is fixed too. An empty, null or invalid code gives the fallback, the second argument, which defaults to DEFAULT_LOCALE (en). It never reads the browser language, so the server and the browser agree. localeLanguage returns just the lowercase language part.",
    ),
    section(
      "match",
      "matchLocale",
      "matchLocale picks the best of the available locales for a code, in this order: the exact tag, the bare language, then another region of the same language (cs-SK for cs-CZ). It returns the item as written in your list, or undefined when the language is not available, so you decide the application fallback explicitly.",
      `const available = ['en', 'cs'];
const locale = matchLocale(user.locale, available) ?? 'en';`,
    ),
    section(
      "runtime",
      "Setting the locale of the app",
      "To change the locale of every component, use setLocale() or useLocale().set(); both accept a Laravel style code and normalize it. See the localization guide.",
      `import { setLocale } from '@rosalana/ui';

setLocale('cs_CZ');`,
    ),
  ],
} satisfies Article;
