import { section, type ComponentArticle } from "../schema";

export default {
  category: "Date & time",
  description: "A date field with optional time and range selection.",
  guidance:
    "Bind an ISO string with v-model (2026-11-21, 2026-11-21T14:30 or 14:30). Use time, range and seconds to change what is edited, and pair it with a UiLabel through id.",
  sections: [
    section(
      "model",
      "The model",
      "The v-model is always an ISO string, or null while the field is empty, so it goes to and from a backend as is. The shape follows the props: date alone gives 2026-11-21, date with time gives 2026-11-21T14:30, time with :date=\"false\" gives 14:30, and seconds adds :ss. With range the model is { start, end }, each end a string or null. Strings with a zone, like 2026-11-21T14:30:00Z, are read and shown in the user's local time; the field writes back local times without a zone, so convert at the application boundary if your backend wants UTC.",
      `const kickoff = ref<string | null>("2026-11-21T14:30");
// <UiDateInput v-model="kickoff" time />

const slot = ref<DateInputRange | null>({ start: "2026-11-21T14:00", end: "2026-11-21T15:30" });
// <UiDateInput v-model="slot" range time />`,
    ),
    section(
      "popover",
      "Typing and picking",
      "Each part of the date is a segment you can type into or step with the arrow keys. The calendar icon opens a popover with a UiCalendar (or UiRangeCalendar) and, with time, a UiTimePicker. Set :manual=\"false\" to turn the whole field into a trigger that only picks from the popover. min and max are ISO strings; a value outside of them turns the field invalid.",
    ),
    section(
      "locale",
      "Locale",
      "The order of the segments, the separators, the month names and the 12 or 24 hour clock follow the app locale. Pass locale to override it for one input. The model stays an ISO string whatever the locale is.",
    ),
    section(
      "form",
      "Native forms",
      "With name the input sends its value with a native form submit; a range sends name[start] and name[end]. With Inertia, bind the same ISO strings to useForm.",
    ),
  ],
  examples: [
    { file: "Basic", title: "Basic", description: "A date with a label, bound to an ISO string." },
    {
      file: "Kinds",
      title: "Date, time and seconds",
      description: "time adds a time to the date, :date=\"false\" leaves only the time and seconds edits the seconds too.",
    },
    {
      file: "Range",
      title: "Ranges",
      description: "range edits a start and an end, with or without time.",
    },
    {
      file: "Constraints",
      title: "Limits and the destructive variant",
      description: "min, max and is-date-unavailable fence the value; variant=\"destructive\" marks a field with an error.",
    },
    {
      file: "Picking",
      title: "Clear, pick only, disabled and read-only",
      description: "show-clear adds a clear button, :manual=\"false\" allows only picking from the popover.",
    },
    {
      file: "Locale",
      title: "Locale",
      description: "The same value in two locales: segment order, separators and clock differ, the model doesn't.",
    },
    {
      file: "Booking",
      title: "Booking a slot",
      description: "A date-time range that turns destructive when it ends before it starts and blocks the submit.",
    },
  ],
} satisfies ComponentArticle;
