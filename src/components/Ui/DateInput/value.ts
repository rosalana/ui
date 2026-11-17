import {
  CalendarDate,
  CalendarDateTime,
  Time,
  getLocalTimeZone,
  parseAbsoluteToLocal,
  parseDate,
  parseDateTime,
  parseTime,
  toCalendarDate,
  toCalendarDateTime,
  toTime,
  today,
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

/**
 * Reads an ISO string into the value the field edits. Lenient about what backends send:
 * `2026-11-16`, `2026-11-16 14:30`, `2026-11-16T14:30:00.000000Z` (converted to local time)
 * or `14:30`. Anything unreadable becomes null.
 */
export function parseValue(value: string | null | undefined, kind: DateInputKind): DateInputValue | null {
  if (!value) return null;
  const text = value.trim().replace(" ", "T");

  try {
    if (kind === "time") {
      // A full date-time only gives up its time
      if (text.includes("T")) return toTime(parseDateTime(stripZone(text)));
      return parseTime(text);
    }

    const dateTime = ZONED.test(text)
      ? toCalendarDateTime(parseAbsoluteToLocal(text.replace(/\.\d+/, "")))
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

/** Writes the field's value back as an ISO string: `2026-11-16`, `2026-11-16T14:30` or `14:30`. */
export function serializeValue(
  value: DateValue | Time | null | undefined,
  kind: DateInputKind,
  seconds = false,
): string | null {
  if (!value) return null;

  if (kind === "time") return formatTime(value as Time, seconds);

  const date = toCalendarDate(value as DateValue).toString();
  if (kind === "date") return date;

  const dateTime = value instanceof CalendarDateTime ? value : toCalendarDateTime(value as CalendarDate);
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
 * starts today.
 */
export function withPickedTime(time: Time, current: DateInputValue | null | undefined, kind: DateInputKind) {
  if (kind === "time") return time;
  const day = toDay(current) ?? today(getLocalTimeZone());
  return toCalendarDateTime(day, time);
}
