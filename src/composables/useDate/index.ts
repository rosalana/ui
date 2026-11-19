import {
  computed,
  getCurrentInstance,
  onMounted,
  shallowRef,
  type ComputedRef,
} from "vue";
import {
  fromAbsolute,
  getLocalTimeZone,
  toCalendarDate,
  type CalendarDate,
  type ZonedDateTime,
} from "@internationalized/date";
import { currentLocale, currentMessages } from "../../plugin/locale";
import { currentTimeZone, setTimeZone } from "../../plugin/timeZone";
import { translate, type UiMessageKey } from "../../plugin/messages";

/** Anything `new Date()` takes. */
export type DateLike = Date | string | number;

export type DiffForHumansOptions = {
  /** How many units to spell out, from the largest: `2` gives "1 hour 30 minutes". Default `1`. */
  parts?: number;
  /** Short units, "3 d" instead of "3 days". */
  short?: boolean;
};

export type UseDate = {
  /**
   * The zone dates show in: the app's (`timeZone` option, `setTimeZone()`), else the browser's.
   * Without the app's, the server and the first render use `UTC` until mounted.
   */
  timeZone: ComputedRef<string>;
  /** Now in `timeZone`. `undefined` on the server and until mounted while hydrating. */
  now: ComputedRef<ZonedDateTime | undefined>;
  /** Today in `timeZone`. `undefined` on the server and until mounted while hydrating. */
  today: ComputedRef<CalendarDate | undefined>;
  /** A date in the app locale and `timeZone`. `options.timeZone` overrides the zone. */
  format: (date: DateLike, options?: Intl.DateTimeFormatOptions) => string;
  /**
   * How far a moment is from another, in words of the app locale, like Laravel's
   * `diffForHumans()`: "3 days before", or against now "3 days ago", "in 2 hours".
   * Against now it is empty until now is known (see `now`).
   */
  diffForHumans: (date: DateLike, other?: DateLike, options?: DiffForHumansOptions) => string;
  /**
   * A UTC moment as clock time in `timeZone`, the value of a date and time input:
   * `2026-12-12T18:00`. The way back is `toUtc()`.
   */
  toZoned: (date: DateLike) => string;
  /** Clock time in `timeZone`, like an input's value, as the UTC moment it is (ISO string). */
  toUtc: (value: string) => string;
  /** Switches the time zone of the whole app, same as `setTimeZone()`. */
  set: typeof setTimeZone;
};

/**
 * Dates in the app's locale and time zone, SSR safe. Keep moments in UTC everywhere and turn them
 * into local time only to show them: format them, say how far they are, or convert them for an
 * input and back.
 *
 * With the app's time zone set, the server and the browser render the same. Only now is never read
 * on the server (its clock differs from the browser's): it is known in the browser, right away in
 * a component mounted there, after mounting in one hydrating the server's markup.
 *
 * ```ts
 * const date = useDate();
 * date.format(match.starts_at, { dateStyle: "medium", timeStyle: "short" });
 * date.diffForHumans(match.starts_at); // "in 3 hours"
 * form.starts_at = date.toUtc(input.value);
 * ```
 */
export function useDate(): UseDate {
  const browser = typeof window !== "undefined";
  // While hydrating, the component's vnode already points at the server's element.
  const hydrating = !!getCurrentInstance()?.vnode.el;

  const browserZone = shallowRef<string>();
  const clock = shallowRef<number>();

  function read() {
    browserZone.value = getLocalTimeZone();
    clock.value = Date.now();
  }

  if (browser && !hydrating) read();
  else if (getCurrentInstance()) onMounted(read);

  const timeZone = computed(() => currentTimeZone() ?? browserZone.value ?? "UTC");
  const now = computed(() =>
    clock.value === undefined ? undefined : fromAbsolute(clock.value, timeZone.value),
  );
  const today = computed(() => (now.value ? toCalendarDate(now.value) : undefined));

  function format(date: DateLike, options: Intl.DateTimeFormatOptions = {}) {
    const { timeZone: zone, ...style } = options;
    return new Intl.DateTimeFormat(currentLocale(), {
      ...(Object.keys(style).length ? style : { dateStyle: "medium", timeStyle: "short" }),
      timeZone: zone ?? timeZone.value,
    }).format(new Date(date));
  }

  function diffForHumans(date: DateLike, other?: DateLike, options: DiffForHumansOptions = {}) {
    const against = other ?? clock.value;
    if (against === undefined) return "";

    const seconds = Math.trunc((new Date(date).getTime() - new Date(against).getTime()) / 1000);

    if (seconds === 0) return translateTime(other === undefined ? "time.now" : "time.same");

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

  const toZoned = (date: DateLike) => clockIn(date, timeZone.value);

  function toUtc(value: string) {
    // The zone's offset is read from how the zone prints the moment, twice, so a time next to a
    // daylight saving change lands right as well. A time that happens twice takes the first one.
    const zone = timeZone.value;
    const wall = Date.parse(`${value}Z`);
    const offset = (moment: number) => Date.parse(`${clockIn(moment, zone)}Z`) - moment;

    return new Date(wall - offset(wall - offset(wall))).toISOString();
  }

  return { timeZone, now, today, format, diffForHumans, toZoned, toUtc, set: setTimeZone };
}

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

/** A moment as the clock time in a zone, without seconds: `2026-12-12T18:00`. */
function clockIn(date: DateLike, timeZone: string): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date(date))
      .map((part) => [part.type, part.value]),
  );

  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
    const form = short
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
