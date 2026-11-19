import {
  CalendarDate,
  CalendarDateTime,
  Time,
  parseAbsolute,
  parseDate,
  parseDateTime,
  parseTime,
  toCalendarDate,
  toCalendarDateTime,
  toTime,
  toZoned,
  type DateValue,
} from "@internationalized/date";

/** What the input edits, picked from the `date` / `time` props. */
export type DateInputKind = "date" | "datetime" | "time";

export type DateInputValue = CalendarDate | CalendarDateTime | Time;

/** Range value in the v-model. Each end is an ISO string, or null while it's not filled in. */
export interface DateInputRange {
  start: string | null;
  end: string | null;
}

const ZONED = /([zZ]|[+-]\d{2}:?\d{2})$/;

/** Whether an ISO string names its zone (`Z`, `+01:00`), as UTC moments from a backend do. */
export const isZoned = (value: string | null | undefined) => !!value && ZONED.test(value.trim());

/**
 * Reads an ISO string into the value the field edits. Lenient about what backends send:
 * `2026-11-16`, `2026-11-16 14:30`, `2026-11-16T14:30:00.000000Z` (converted to clock time in
 * `timeZone`, the app's) or `14:30`. Anything unreadable becomes null.
 */
export function parseValue(
  value: string | null | undefined,
  kind: DateInputKind,
  timeZone: string,
): DateInputValue | null {
  if (!value) return null;
  const text = value.trim().replace(" ", "T");

  try {
    if (kind === "time") {
      // A full date-time only gives up its time
      if (text.includes("T")) return toTime(parseDateTime(stripZone(text)));
      return parseTime(text);
    }

    const dateTime = ZONED.test(text)
      ? toCalendarDateTime(parseAbsolute(text.replace(/\.\d+/, ""), timeZone))
      : text.includes("T")
        ? parseDateTime(stripFraction(text))
        : toCalendarDateTime(parseDate(text));

    return kind === "date" ? toCalendarDate(dateTime) : dateTime;
  } catch {
    return null;
  }
}

function stripFraction(text: string) {
  return text.replace(/\.\d+$/, "");
}

function stripZone(text: string) {
  return stripFraction(text.replace(ZONED, ""));
}

const pad = (part: number) => String(part).padStart(2, "0");

function formatTime(value: { hour: number; minute: number; second: number }, seconds: boolean) {
  const time = `${pad(value.hour)}:${pad(value.minute)}`;
  return seconds ? `${time}:${pad(value.second)}` : time;
}

/**
 * Writes the field's value back as an ISO string: `2026-11-16`, `2026-11-16T14:30` or `14:30`.
 * With `utcFrom`, a date-time is clock time in that zone and goes back as the UTC moment it is,
 * `2026-11-16T13:30:00.000Z`.
 */
export function serializeValue(
  value: DateValue | Time | null | undefined,
  kind: DateInputKind,
  seconds = false,
  utcFrom?: string,
): string | null {
  if (!value) return null;

  if (kind === "time") return formatTime(value as Time, seconds);

  const date = toCalendarDate(value as DateValue).toString();
  if (kind === "date") return date;

  const dateTime = value instanceof CalendarDateTime ? value : toCalendarDateTime(value as CalendarDate);
  if (utcFrom) {
    const moment = toZoned(seconds ? dateTime : dateTime.set({ second: 0, millisecond: 0 }), utcFrom);
    return moment.toDate().toISOString();
  }
  return `${date}T${formatTime(dateTime, seconds)}`;
}

/**
 * Puts a day picked in the calendar into the current value. A date-time keeps the time
 * already typed in, or starts at midnight.
 */
export function withPickedDay(day: DateValue, current: DateInputValue | null | undefined, kind: DateInputKind) {
  if (kind !== "datetime") return toCalendarDate(day);
  const time = current instanceof CalendarDateTime ? toTime(current) : new Time(0, 0);
  return toCalendarDateTime(toCalendarDate(day), time);
}

/** Calendar works with days only. */
export function toDay(value: DateInputValue | null | undefined): CalendarDate | undefined {
  if (!value || value instanceof Time) return undefined;
  return toCalendarDate(value);
}

/** Time part of the value, for the time picker. */
export function timeOf(value: DateInputValue | null | undefined): Time | null {
  if (!value) return null;
  if (value instanceof Time) return value;
  return value instanceof CalendarDateTime ? toTime(value) : null;
}

/**
 * Puts a time picked in the time picker into the current value. A date-time without a day yet
 * starts on `today`.
 */
export function withPickedTime(
  time: Time,
  current: DateInputValue | null | undefined,
  kind: DateInputKind,
  today: CalendarDate,
) {
  if (kind === "time") return time;
  return toCalendarDateTime(toDay(current) ?? today, time);
}
