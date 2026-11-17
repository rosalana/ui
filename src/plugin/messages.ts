import { localeLanguage, matchLocale, normalizeLocale } from "../helpers/locale";

/**
 * English texts of the components.
 *
 * `{name}` is replaced by a parameter. With a `count` parameter a text can have plural forms
 * split by `|`, in the order of `Intl.PluralRules` categories (zero, one, two, few, many, other)
 * the language uses: English `one|other`, Czech `one|few|many|other`. A missing form uses the last.
 */
const en = {
  close: "Close",
  more: "More",

  "sheet.title": "Sheet Content",
  "sheet.description":
    "This is the content of the sheet. It can be used to display information or actions related to the current page.",

  "notifications.label": "Notifications",
  "notifications.close": "Close notification",

  "command.clear": "Clear search",

  "pagination.more": "More pages",
  "pagination.first": "Go to first page",
  "pagination.previous": "Go to previous page",
  "pagination.next": "Go to next page",
  "pagination.last": "Go to last page",
  "pagination.perPage": "Per page",
  "pagination.rowsPerPage": "Rows per page",

  "table.search": "Search...",
  "table.empty": "No data to display.",
  /** After the bold count of selected rows. */
  "table.selected": "of {total} selected",
  /** After the bold count of rows. */
  "table.total": "rows total",
  "table.columns": "Columns",
  "table.toggleColumns": "Toggle Columns",
  "table.allColumnsFixed": "All columns are fixed",

  "actions.empty": "No actions available",

  "calendar.previousYear": "Previous year",
  "calendar.nextYear": "Next year",

  "timePicker.hours": "Hours",
  "timePicker.minutes": "Minutes",
  "timePicker.seconds": "Seconds",
  "timePicker.period": "AM / PM",

  "dateInput.clear": "Clear",
  "dateInput.openCalendar": "Open calendar",
  "dateInput.openTimePicker": "Open time picker",

  "colorPicker.placeholder": "Pick a color",
  "colorPicker.palettes": "Palettes",

  "confirm.title": "Are you sure?",
  "confirm.description": "This action may have consequences.",
  "confirm.verify": "Please verify the action by providing the required information.",
  "confirm.verifyPlaceholder": "Type to verify...",
  "confirm.cancel": "Cancel",
  "confirm.confirm": "Confirm",

  "dropFile.title": "Click to upload or drag & drop files.",
  "dropFile.subtext": "All file types accepted",

  "uploadFiles.count": "{count} file|{count} files",
  "uploadFiles.clear": "Clear all",
  "uploadFiles.remove": "Remove {name}",
  "uploadFiles.maxSize": "up to {size}",
  "uploadFiles.maxFiles": "max {count} files",

  "uploadImage.title": "Click to upload or drag & drop an image.",
  "uploadImage.subtext": "PNG, JPG, WEBP or GIF",
  "uploadImage.maxSize": "Images up to {size}",
  "uploadImage.rotateLeft": "Rotate left",
  "uploadImage.rotateRight": "Rotate right",
  "uploadImage.flipHorizontal": "Flip horizontally",
  "uploadImage.flipVertical": "Flip vertically",
  "uploadImage.zoomOut": "Zoom out",
  "uploadImage.zoomIn": "Zoom in",
  "uploadImage.reset": "Reset",
  "uploadImage.adjustments": "Adjustments",
  "uploadImage.filter.brightness": "Brightness",
  "uploadImage.filter.contrast": "Contrast",
  "uploadImage.filter.saturation": "Saturation",
  "uploadImage.filter.grayscale": "Grayscale",
  "uploadImage.filter.sepia": "Sepia",
  "uploadImage.cancel": "Cancel",
  "uploadImage.apply": "Apply",
  "uploadImage.change": "Change image",
  "uploadImage.current": "Current image",
  "uploadImage.replaceHint": "Click the image to replace it",
  "uploadImage.editCrop": "Edit crop",
  "uploadImage.replace": "Replace",
  "uploadImage.remove": "Remove",
  "uploadImage.dropToReplace": "Drop to replace",

  /** Durations for `diffForHumans`: plain, after "ago", after "in", and short. */
  "time.second": "{count} second|{count} seconds",
  "time.second.ago": "{count} second|{count} seconds",
  "time.second.fromNow": "{count} second|{count} seconds",
  "time.short.second": "{count} s",
  "time.minute": "{count} minute|{count} minutes",
  "time.minute.ago": "{count} minute|{count} minutes",
  "time.minute.fromNow": "{count} minute|{count} minutes",
  "time.short.minute": "{count} min",
  "time.hour": "{count} hour|{count} hours",
  "time.hour.ago": "{count} hour|{count} hours",
  "time.hour.fromNow": "{count} hour|{count} hours",
  "time.short.hour": "{count} h",
  "time.day": "{count} day|{count} days",
  "time.day.ago": "{count} day|{count} days",
  "time.day.fromNow": "{count} day|{count} days",
  "time.short.day": "{count} d",
  "time.week": "{count} week|{count} weeks",
  "time.week.ago": "{count} week|{count} weeks",
  "time.week.fromNow": "{count} week|{count} weeks",
  "time.short.week": "{count} w",
  "time.month": "{count} month|{count} months",
  "time.month.ago": "{count} month|{count} months",
  "time.month.fromNow": "{count} month|{count} months",
  "time.short.month": "{count} mo",
  "time.year": "{count} year|{count} years",
  "time.year.ago": "{count} year|{count} years",
  "time.year.fromNow": "{count} year|{count} years",
  "time.short.year": "{count} y",
  "time.ago": "{time} ago",
  "time.fromNow": "in {time}",
  "time.before": "{time} before",
  "time.after": "{time} after",
  "time.now": "just now",
  "time.same": "at the same time",
};

/** Czech texts of the components. Plural forms go `one|few|many|other`. */
const cs: UiMessages = {
  close: "Zavřít",
  more: "Více",

  "sheet.title": "Obsah panelu",
  "sheet.description":
    "Toto je obsah panelu. Může zobrazovat informace nebo akce, které souvisí s aktuální stránkou.",

  "notifications.label": "Oznámení",
  "notifications.close": "Zavřít oznámení",

  "command.clear": "Vymazat hledání",

  "pagination.more": "Další stránky",
  "pagination.first": "Na první stránku",
  "pagination.previous": "Na předchozí stránku",
  "pagination.next": "Na další stránku",
  "pagination.last": "Na poslední stránku",
  "pagination.perPage": "Na stránku",
  "pagination.rowsPerPage": "Řádků na stránku",

  "table.search": "Hledat...",
  "table.empty": "Žádná data k zobrazení.",
  "table.selected": "z {total} vybráno",
  "table.total": "řádků celkem",
  "table.columns": "Sloupce",
  "table.toggleColumns": "Zobrazit sloupce",
  "table.allColumnsFixed": "Všechny sloupce jsou pevné",

  "actions.empty": "Žádné dostupné akce",

  "calendar.previousYear": "Předchozí rok",
  "calendar.nextYear": "Další rok",

  "timePicker.hours": "Hodiny",
  "timePicker.minutes": "Minuty",
  "timePicker.seconds": "Sekundy",
  "timePicker.period": "dop. / odp.",

  "dateInput.clear": "Vymazat",
  "dateInput.openCalendar": "Otevřít kalendář",
  "dateInput.openTimePicker": "Otevřít výběr času",

  "colorPicker.placeholder": "Vyberte barvu",
  "colorPicker.palettes": "Palety",

  "confirm.title": "Opravdu?",
  "confirm.description": "Tato akce může mít následky.",
  "confirm.verify": "Potvrďte akci zadáním požadovaných údajů.",
  "confirm.verifyPlaceholder": "Pro potvrzení napište...",
  "confirm.cancel": "Zrušit",
  "confirm.confirm": "Potvrdit",

  "dropFile.title": "Klikněte pro nahrání nebo přetáhněte soubory.",
  "dropFile.subtext": "Jsou povoleny všechny typy souborů",

  "uploadFiles.count": "{count} soubor|{count} soubory|{count} souboru|{count} souborů",
  "uploadFiles.clear": "Odstranit vše",
  "uploadFiles.remove": "Odstranit {name}",
  "uploadFiles.maxSize": "až {size}",
  "uploadFiles.maxFiles": "nejvýše {count} souborů",

  "uploadImage.title": "Klikněte pro nahrání nebo přetáhněte obrázek.",
  "uploadImage.subtext": "PNG, JPG, WEBP nebo GIF",
  "uploadImage.maxSize": "Obrázky až {size}",
  "uploadImage.rotateLeft": "Otočit doleva",
  "uploadImage.rotateRight": "Otočit doprava",
  "uploadImage.flipHorizontal": "Převrátit vodorovně",
  "uploadImage.flipVertical": "Převrátit svisle",
  "uploadImage.zoomOut": "Oddálit",
  "uploadImage.zoomIn": "Přiblížit",
  "uploadImage.reset": "Obnovit",
  "uploadImage.adjustments": "Úpravy",
  "uploadImage.filter.brightness": "Jas",
  "uploadImage.filter.contrast": "Kontrast",
  "uploadImage.filter.saturation": "Sytost",
  "uploadImage.filter.grayscale": "Odstíny šedi",
  "uploadImage.filter.sepia": "Sépie",
  "uploadImage.cancel": "Zrušit",
  "uploadImage.apply": "Použít",
  "uploadImage.change": "Změnit obrázek",
  "uploadImage.current": "Aktuální obrázek",
  "uploadImage.replaceHint": "Klikněte na obrázek pro jeho výměnu",
  "uploadImage.editCrop": "Upravit ořez",
  "uploadImage.replace": "Nahradit",
  "uploadImage.remove": "Odstranit",
  "uploadImage.dropToReplace": "Pusťte pro nahrazení",

  /** Délky pro `diffForHumans`: základní, po „před“, po „za“ a zkrácené. */
  "time.second": "{count} sekunda|{count} sekundy|{count} sekundy|{count} sekund",
  "time.second.ago": "{count} sekundou|{count} sekundami|{count} sekundy|{count} sekundami",
  "time.second.fromNow": "{count} sekundu|{count} sekundy|{count} sekundy|{count} sekund",
  "time.short.second": "{count} s",
  "time.minute": "{count} minuta|{count} minuty|{count} minuty|{count} minut",
  "time.minute.ago": "{count} minutou|{count} minutami|{count} minuty|{count} minutami",
  "time.minute.fromNow": "{count} minutu|{count} minuty|{count} minuty|{count} minut",
  "time.short.minute": "{count} min",
  "time.hour": "{count} hodina|{count} hodiny|{count} hodiny|{count} hodin",
  "time.hour.ago": "{count} hodinou|{count} hodinami|{count} hodiny|{count} hodinami",
  "time.hour.fromNow": "{count} hodinu|{count} hodiny|{count} hodiny|{count} hodin",
  "time.short.hour": "{count} h",
  "time.day": "{count} den|{count} dny|{count} dne|{count} dní",
  "time.day.ago": "{count} dnem|{count} dny|{count} dne|{count} dny",
  "time.day.fromNow": "{count} den|{count} dny|{count} dne|{count} dní",
  "time.short.day": "{count} d",
  "time.week": "{count} týden|{count} týdny|{count} týdne|{count} týdnů",
  "time.week.ago": "{count} týdnem|{count} týdny|{count} týdne|{count} týdny",
  "time.week.fromNow": "{count} týden|{count} týdny|{count} týdne|{count} týdnů",
  "time.short.week": "{count} týd.",
  "time.month": "{count} měsíc|{count} měsíce|{count} měsíce|{count} měsíců",
  "time.month.ago": "{count} měsícem|{count} měsíci|{count} měsíce|{count} měsíci",
  "time.month.fromNow": "{count} měsíc|{count} měsíce|{count} měsíce|{count} měsíců",
  "time.short.month": "{count} měs.",
  "time.year": "{count} rok|{count} roky|{count} roku|{count} let",
  "time.year.ago": "{count} rokem|{count} roky|{count} roku|{count} lety",
  "time.year.fromNow": "{count} rok|{count} roky|{count} roku|{count} let",
  "time.short.year": "{count} r.",
  "time.ago": "před {time}",
  "time.fromNow": "za {time}",
  "time.before": "{time} před",
  "time.after": "{time} po",
  "time.now": "právě teď",
  "time.same": "ve stejnou chvíli",
};

/**
 * Built-in texts of the components by language. `default` is the language every text falls back
 * to when a language does not have it. Add a language as another key with the same texts.
 */
export const messages = {
  default: "en",
  en,
  cs,
} satisfies { default: string } & Record<string, string | UiMessages>;

export type UiMessages = { [K in keyof typeof en]: string };

export type UiMessageKey = keyof UiMessages;

/**
 * Texts the app provides, keyed by a locale (`cs`, `cs_CZ`, `en`). A language key covers all its
 * regions, a missing text falls back to the language, then to the default language, then to the
 * built-in texts.
 */
export type UiMessagesConfig = Record<string, Partial<UiMessages>>;

export type UiMessageParams = Record<string, string | number>;

const PLURAL_ORDER: Intl.LDMLPluralRule[] = ["zero", "one", "two", "few", "many", "other"];

/**
 * The text of a key in a locale. The app's messages win over the built-in ones, and in both the
 * best matching locale wins over its language, which wins over the default language.
 */
export function translate(
  locale: string,
  appMessages: UiMessagesConfig,
  key: UiMessageKey,
  params?: UiMessageParams,
): string {
  const text =
    find(appMessages, locale, key) ??
    find(builtIn, locale, key) ??
    (builtIn[messages.default] as UiMessages)[key];

  return interpolate(pluralize(text, locale, params?.count), params);
}

/** The built-in languages, without the `default` pointer. */
const builtIn: UiMessagesConfig = Object.fromEntries(
  Object.entries(messages).filter(
    (entry): entry is [string, UiMessages] => entry[0] !== "default",
  ),
);

/** A text from a set of languages: the best matching locale, its language, then the default. */
function find(
  set: UiMessagesConfig,
  locale: string,
  key: UiMessageKey,
): string | undefined {
  const best = matchLocale(locale, Object.keys(set));

  return (
    (best && set[best]?.[key]) ??
    set[localeLanguage(locale)]?.[key] ??
    set[messages.default]?.[key]
  );
}

function pluralize(text: string, locale: string, count?: string | number): string {
  if (typeof count !== "number" || !text.includes("|")) return text;

  const forms = text.split("|");
  const rules = new Intl.PluralRules(normalizeLocale(locale));
  const categories = PLURAL_ORDER.filter((category) =>
    rules.resolvedOptions().pluralCategories.includes(category),
  );
  const index = categories.indexOf(rules.select(count));

  return forms[Math.min(index, forms.length - 1)] ?? forms[forms.length - 1];
}

function interpolate(text: string, params?: UiMessageParams): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}
