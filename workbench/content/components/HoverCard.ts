import { section, type ComponentArticle } from "../schema";

export default {
  category: "Overlays",
  description: "A preview of related content on hover or focus.",
  guidance:
    "Use for supplementary information about a link or a name rather than for required actions. Touch devices cannot hover, so the same information must be reachable another way.",
  sections: [
    section(
      "vs",
      "Hover card, tooltip or popover",
      "A Tooltip is a one-line hint for a control. A HoverCard is a richer preview of what a link points to (a profile, a team) and opens on hover or keyboard focus. A Popover opens on click and is for interactive content.",
    ),
    section(
      "delays",
      "Open and close delay",
      "open-delay and close-delay on UiHoverCard (both 200 ms by default) keep the card from flashing when the pointer only passes by and let the pointer travel from the trigger into the card.",
    ),
  ],
  examples: [
    {
      file: "Profile",
      title: "Profile preview",
      description: "Hovering a mention shows who the person is.",
    },
    {
      file: "Delays",
      title: "Delays and placement",
      description: "open-delay, close-delay, side and align.",
    },
  ],
} satisfies ComponentArticle;
