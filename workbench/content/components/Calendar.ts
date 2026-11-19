import { section, type ComponentArticle } from "../schema";

export default {
  category: "Date & time",
  description: "An accessible date calendar with month and year navigation.",
  guidance:
    "Bind a value from @internationalized/date (CalendarDate) with v-model. Always give the calendar a fixed default-placeholder or a value, so the month in view is the same on the server and in the browser. Use UiRangeCalendar for a start and end pair.",
  sections: [
    section(
      "value",
      "Values and the month in view",
      "The model is a DateValue (usually a CalendarDate), undefined while nothing is picked, or an array of them with multiple. The month in view is separate from the value: it comes from placeholder / default-placeholder, then from the value, and only as the last resort from today's date. Today is read in the browser's time zone, which the server doesn't share, so pass default-placeholder (or a value) whenever the calendar can render on the server. Clicking the heading opens a month and year picker.",
      `import { CalendarDate, type DateValue } from "@internationalized/date";

const day = shallowRef<DateValue | undefined>();
// <UiCalendar v-model="day" :default-placeholder="new CalendarDate(2026, 11, 1)" />`,
    ),
    section(
      "locale",
      "Locale",
      "Month names, weekday names and the first day of the week follow the app locale (set once in createRosalanaApp or later with setLocale). Pass locale to override it for one calendar, and week-starts-on (0 is Sunday, 1 Monday) to override just the first weekday.",
    ),
  ],
  examples: [
    { file: "Basic", title: "Basic", description: "A single date with v-model and a fixed month in view." },
    {
      file: "Constraints",
      title: "Limits and states",
      description:
        "min-value and max-value fence the range, is-date-unavailable blocks days such as weekends, readonly keeps the value but blocks changes, and disabled blocks everything.",
    },
    {
      file: "Multiple",
      title: "Multiple dates",
      description: "multiple turns the model into an array; clicking a picked day removes it.",
    },
    {
      file: "Layout",
      title: "Months and weeks",
      description:
        "number-of-months shows several months side by side, week-starts-on picks the first weekday and fixed-weeks off lets months have only the weeks they need.",
    },
    {
      file: "Locale",
      title: "Locale",
      description: "The locale prop overrides the app locale for one calendar.",
    },
    {
      file: "Booking",
      title: "Booking a day",
      description: "A calendar with unavailable weekends next to a button that waits for a day.",
    },
  ],
} satisfies ComponentArticle;
