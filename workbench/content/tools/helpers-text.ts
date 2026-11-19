import { section, type Article } from "../schema";

export default {
  title: "Text helpers",
  description:
    "Initials, labels, truncation, plural forms and readable file sizes.",
  sections: [
    section(
      "usage",
      "Usage",
      "The text helpers have their own entry point and are not re-exported from the main package. They are plain functions that work anywhere, outside components too.",
      `import { initials, truncate, label, plural, file_size } from '@rosalana/ui/helpers';

initials('Alex Taylor');                  // 'AT'
truncate('Autumn Open 2026', 11);         // 'Autumn Open...'
label('project_settings');                // 'Project Settings'
file_size(1536);                          // '1.50 KB'
plural(2, { one: 'file', other: 'files' }); // 'files'`,
    ),
    section(
      "initials",
      "initials",
      "Splits the name at spaces, dots, colons, dashes and underscores and joins the uppercase first letters of every part: 'alex.taylor' gives AT. It does not limit the length, so slice the result for an avatar: initials(name).slice(0, 2).",
    ),
    section(
      "truncate",
      "truncate",
      "Cuts the text to maxLength characters and appends three dots; shorter text is returned untouched. The dots come on top of the limit, so the result can be three characters longer. It counts JavaScript string code units, so an emoji counts as two.",
    ),
    section(
      "label",
      "label",
      "Turns identifiers into readable titles: dashes, dots and underscores become spaces and every word is title-cased, except small English words (to, and, of, the, ...) that stay lowercase in the middle of the label. An email is shortened to the part before the @. The second argument adds more words to keep lowercase, the third lists words to leave untouched.",
      `label('terms_and_conditions');           // 'Terms and Conditions'
label('alex.taylor@example.com');        // 'Alex Taylor'
label('rosalana-api', [], ['api']);      // 'Rosalana api'
label('welcome-back-home', ['back']);    // 'Welcome back Home'`,
    ),
    section(
      "file-size",
      "file_size",
      "Formats bytes with units B, KB, MB, GB and TB, dividing by 1024, with two decimals by default. The second argument sets the number of decimals.",
      `file_size(1536);        // '1.50 KB'
file_size(5_242_880, 0); // '5 MB'`,
    ),
    section(
      "plural",
      "plural",
      "Picks the form of a word for a count by the plural rules of the app locale (Intl.PluralRules), so Czech gets its few and many forms without extra code. A form that is not given falls back to other, which every call needs. Use it for words outside the message catalog; texts in the catalog use plural forms split by | instead.",
      `plural(3, { one: 'soubor', few: 'soubory', other: 'souborů' });
// Czech locale: 'soubory'. English has no few form, so it gives 'souborů'.`,
    ),
  ],
} satisfies Article;
