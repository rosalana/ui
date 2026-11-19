import { section, type ComponentArticle } from "../schema";

export default {
  category: "Actions",
  description:
    "The primary action control, with variants, loading and icon support.",
  guidance:
    "Use one primary action per context. loading also disables the control. Label icon-only buttons with aria-label; use href for navigation.",
  sections: [
    section(
      "navigation",
      "Buttons that navigate",
      "With href the button renders an Inertia Link, so navigation stays inside the app. A string is a normal visit; an object with method and url sends that request instead, e.g. { method: 'post', url: '/logout' }. For a link out of the app, render a plain anchor with as=\"a\" and your own href and target.",
    ),
    section(
      "loading",
      "Loading and disabled",
      "loading shows a spinner in front of the label and disables the button, so a request can't be sent twice. Bind it to the request's own state, such as form.processing of an Inertia form. disabled only disables, for actions that are not available yet.",
    ),
  ],
  examples: [
    {
      file: "Variants",
      title: "Variants",
      description:
        "One primary action, secondary and outline for the rest, destructive for what can't be undone.",
    },
    { file: "Sizes", title: "Sizes" },
    {
      file: "Icons",
      title: "With icons",
      description:
        "An icon before or after the label. An icon-only button needs aria-label.",
    },
    {
      file: "Loading",
      title: "Loading while saving",
      description: "The button waits for the form request and can't be pressed twice.",
    },
    {
      file: "Disabled",
      title: "Disabled until ready",
    },
    {
      file: "Navigation",
      title: "Navigation",
      description:
        "href renders an Inertia link; arrow and arrow-back hint at the direction on hover.",
    },
    {
      file: "Tooltip",
      title: "Tooltip",
      description: "A short hint on hover, colored by tooltip-variant.",
    },
  ],
} satisfies ComponentArticle;
