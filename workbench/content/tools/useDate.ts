import { section, type Article } from "../schema";

export default {
  title: "useDate",
  description:
    "Dates in the app's locale and time zone, SSR safe: format them, say how far they are and convert them for inputs.",
  sections: [
    section(
      "usage",
      "Usage",
      "Keep moments in UTC everywhere: from the server, in your state and back to the server. Turn them into local time only to show them. useDate does that in the app's locale and time zone.",
      `import { useDate } from '@rosalana/ui';

const date = useDate();

date.format(match.starts_at);                                   // "Dec 12, 2026, 6:00 PM"
date.format(match.starts_at, { dateStyle: 'full' });            // "Saturday, December 12, 2026"
date.diffForHumans(match.starts_at);                            // "in 3 hours"
date.diffForHumans(match.starts_at, match.ends_at, { parts: 2 }); // "1 hour 30 minutes before"
date.toZoned(match.starts_at);                                  // "2026-12-12T18:00"
date.toUtc("2026-12-12T18:00");                                 // "2026-12-12T17:00:00.000Z"`,
    ),
    section(
      "time-zone",
      "The time zone",
      "Pass the user's time zone to createRosalanaApp, usually from the backend, and change it with setTimeZone() or date.set() when the user does. With it the server and the browser format every date the same. Without it dates show in the browser's zone, which only the browser knows: the server and the first render use UTC, and the dates switch to the browser's zone once mounted. date.timeZone is the zone in use.",
      `app.use(createRosalanaApp, {
  locale: props.locale,       // 'cs_CZ'
  timeZone: props.timeZone,   // 'Europe/Prague'
});`,
    ),
    section(
      "now",
      "Now and today",
      "date.now and date.today are now in the time zone. The server never reads its clock (it differs from the browser's), so on the server and in the first render of a hydrating page they are undefined, and filled in once mounted. A component mounted in the browser, e.g. in a popover, has them right away. diffForHumans without a second date compares with now, so it is empty until now is known. The calendars and the time picker fall back to today and now the same way when you give them no date.",
    ),
    section(
      "inputs",
      "Inputs and the server",
      "A date and time input holds clock time without a zone. toZoned turns a UTC moment into that clock time in the app's zone, toUtc turns the input's value back into the UTC moment to send. Daylight saving is handled; a clock time that happens twice when the clocks go back takes the first moment.",
    ),
  ],
  examples: [
    {
      file: "Schedule",
      title: "A match schedule",
      description: "UTC moments from the server shown in the app's zone, with how far each one is.",
    },
    {
      file: "Input",
      title: "Editing a date and time",
      description: "The input works in local clock time, the server gets UTC.",
    },
  ],
} satisfies Article;
