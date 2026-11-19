import { section, type ComponentArticle } from "../schema";

export default {
  category: "Feedback",
  description: "A small indicator pinned to a corner of another element.",
  guidance:
    "Wrap the element in UiChip; the chip sits on its corner. Without text it is a dot (online, new), with text it grows into a pill (an unread count). Give the wrapped control an accessible name that includes the state, the chip itself is only visual.",
  sections: [
    section(
      "content",
      "Text and visibility",
      "text sets the content; with max a number above it shows as max+, e.g. 99+. The content slot replaces the text with your own markup. show hides or shows the chip with a spring animation, so bind it to the state it represents, such as unread > 0. pulse adds a soft ring to draw attention.",
    ),
    section(
      "placement",
      "Position",
      "position picks the corner. By default the chip sits on the element's edge; inset moves it inside the corner, which fits round elements like avatars. color overrides variant with any Tailwind palette color.",
    ),
  ],
  examples: [
    { file: "Variants", title: "Variants", description:
      "Every variant, plus any palette color through color." },
    { file: "Sizes", title: "Sizes" },
    { file: "Positions", title: "Positions and inset", description:
      "The four corners, inset on round avatars and the default edge placement." },
    { file: "Notifications", title: "Notifications", description:
      "A capped unread count that hides when read, and a pulsing live dot." },
  ],
} satisfies ComponentArticle;
