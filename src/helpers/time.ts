import { currentLocale, currentMessages } from "../plugin/locale";
import { translate, type UiMessageKey } from "../plugin/messages";

/** Anything `new Date()` takes. */
export type DateLike = Date | string | number;

export type DiffForHumansOptions = {
  /** How many units to spell out, from the largest: `2` gives "1 hour 30 minutes". Default `1`. */
  parts?: number;
  /** Short units, "3 d" instead of "3 days". */
  short?: boolean;
};

export type FormatDateOptions = Intl.DateTimeFormatOptions;

type Unit = "year" | "month" | "week" | "day" | "hour" | "minute" | "second";

/** Length of each unit in seconds, from the largest. A month and a year are averages. */
const UNITS: [Unit, number][] = [
  ["year", 365 * 24 * 60 * 60],
  ["month", 30 * 24 * 60 * 60],
  ["week", 7 * 24 * 60 * 60],
  ["day", 24 * 60 * 60],
  ["hour", 60 * 60],
  ["minute", 60],
  ["second", 1],
];

/**
 * How far one moment is from another, in words of the app locale, like Laravel's
 * `diffForHumans()`.
 *
 * Without `other` it compares to now: "3 days ago", "in 2 hours". With `other` it says where the
 * date sits against it: "3 days before", "2 hours after". The difference rounds down to whole
 * units.
 *
 * Comparing to now differs between the server and the browser, so during render pass `other`, or
 * call it only in the browser (`onMounted`, event handlers).
 *
 * ```ts
 * diffForHumans("2026-11-20T18:00", "2026-11-21T18:00") // "1 day before"
 * diffForHumans(deadline) // "in 3 hours"
 * diffForHumans(start, now, { parts: 2, short: true }) // "1 d 4 h after"
 * ```
 */
export function diffForHumans(
  date: DateLike,
  other?: DateLike,
  options: DiffForHumansOptions = {},
): string {
  const seconds = Math.trunc(
    (new Date(date).getTime() - new Date(other ?? Date.now()).getTime()) / 1000,
  );

  if (seconds === 0) {
    return translateTime(other === undefined ? "time.now" : "time.same");
  }

  const direction =
    other === undefined
      ? seconds < 0
        ? "ago"
        : "fromNow"
      : seconds < 0
        ? "before"
        : "after";

  return translateTime(`time.${direction}`, {
    time: duration(Math.abs(seconds), direction, options),
  });
}

/**
 * A date in the app locale. Pass `timeZone` to render the same on the server and in the browser.
 *
 * ```ts
 * formatDate(start, { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Prague" })
 * ```
 */
export function formatDate(
  date: DateLike,
  options: FormatDateOptions = { dateStyle: "medium", timeStyle: "short" },
): string {
  return new Intl.DateTimeFormat(currentLocale(), options).format(new Date(date));
}

/** The whole units of a number of seconds, the largest first. */
function duration(
  seconds: number,
  direction: "ago" | "fromNow" | "before" | "after",
  { parts = 1, short = false }: DiffForHumansOptions,
): string {
  const words: string[] = [];
  let rest = seconds;

  for (const [unit, length] of UNITS) {
    if (words.length === parts) break;

    const count = Math.floor(rest / length);

    if (count === 0 && words.length === 0) continue;
    if (count === 0) break;

    rest -= count * length;

    // Some languages bend the unit after "ago" and "in", Czech "před 3 dny", "za 1 hodinu"
    const form =
      short
        ? `time.short.${unit}`
        : direction === "ago" || direction === "fromNow"
          ? `time.${unit}.${direction}`
          : `time.${unit}`;

    words.push(translateTime(form as UiMessageKey, { count }));
  }

  return words.join(" ");
}

/** A time text in the app locale, with the texts the app set for it. */
function translateTime(key: UiMessageKey, params?: Record<string, string | number>): string {
  return translate(currentLocale(), currentMessages(), key, params);
}
