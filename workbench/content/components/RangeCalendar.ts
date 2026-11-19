import { section, type ComponentArticle } from "../schema";

export default {
  category: "Date & time",
  description: "Select a date interval across one or more calendar months.",
  guidance:
    "The model is { start, end } of DateValue values from @internationalized/date. Pass a fixed default-placeholder (or a value) so the month in view is the same on the server and in the browser.",
  sections: [
    section(
      "value",
      "How a range is picked",
      "The first click sets start, the second sets end; both are undefined until picked. Picking again after a complete range starts a new one, unless prevent-deselect is on. While the second click is pending the model holds only start, so check that end is set before you use the range. maximum-days limits how long a range can be, and is-date-unavailable days can't be part of it.",
      `const stay = shallowRef<{ start: DateValue | undefined; end: DateValue | undefined }>({
  start: undefined,
  end: undefined,
});`,
    ),
    section(
      "locale",
      "Locale",
      "Like UiCalendar, the month and weekday names and the first weekday follow the app locale. Pass locale to override it for one calendar and week-starts-on to change only the first weekday.",
    ),
  ],
  examples: [
    { file: "Basic", title: "Basic", description: "A range with a start and an end picked." },
    {
      file: "Months",
      title: "Two months",
      description: "number-of-months places months side by side, which makes long ranges easier to pick.",
    },
    {
      file: "Constraints",
      title: "Limits and states",
      description:
        "min-value, max-value, maximum-days and is-date-unavailable limit what can be picked; readonly keeps the range without letting it change.",
    },
    {
      file: "Reservation",
      title: "Reserving a stay",
      description: "The button waits for both ends and counts the nights; prevent-deselect keeps a complete range from being cleared by a click.",
    },
  ],
} satisfies ComponentArticle;
