import { section, type ComponentArticle } from "../schema";

export default {
  category: "Date & time",
  description: "Edit a clock time through a localized control.",
  guidance:
    "Bind a Time from @internationalized/date with v-model. Pass a fixed placeholder so an empty picker shows the same time on the server and in the browser.",
  sections: [
    section(
      "model",
      "The model and the placeholder",
      "The model is a Time (hour, minute, second), or null while nothing is chosen. Scrolling a wheel emits a new Time. An empty picker needs a time to show; without placeholder it uses the current time, which the server can't know, so pass one whenever the picker can render on the server. A value that doesn't sit on the minute-step is snapped to the nearest earlier step on the wheel. The picker has no date or time zone: to turn a picked time into a moment, combine it with an explicit date and time zone yourself.",
      `import { Time } from "@internationalized/date";

const opens = ref<Time | null>(null);
// <UiTimePicker v-model="opens" :placeholder="new Time(8, 0)" />`,
    ),
    section(
      "hour-cycle",
      "12 or 24 hours",
      "The picker follows the app locale: 12 hours with AM / PM in the locale's words where it is the custom, 24 hours elsewhere. Pass hour-cycle to force one, or locale to override the app locale for this picker. The model is the same Time either way.",
    ),
    section(
      "use",
      "In a field",
      "To edit a time in a form field use UiDateInput with :date=\"false\" and time; it opens this picker in a popover and keeps the value as an HH:mm string.",
    ),
  ],
  examples: [
    { file: "Basic", title: "Basic", description: "A time bound with v-model and a fixed placeholder." },
    {
      file: "Options",
      title: "Hour cycle, seconds and steps",
      description: "hour-cycle chooses 12 or 24 hours, seconds adds a wheel and minute-step moves minutes and seconds in steps.",
    },
    {
      file: "Wheels",
      title: "Rows, looping and disabled",
      description: "rows sets the visible rows, :loop=\"false\" stops the wheels at their ends and disabled locks the picker.",
    },
    {
      file: "Opening",
      title: "Opening hours",
      description: "Two pickers with 15 minute steps and a check that the closing time is after the opening time.",
    },
  ],
} satisfies ComponentArticle;
