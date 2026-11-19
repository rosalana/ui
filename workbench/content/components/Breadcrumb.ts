import { section, type ComponentArticle } from "../schema";

export default {
  category: "Navigation",
  description: "Show the current page in its parent hierarchy.",
  guidance:
    "Compose List, Item, Link, Separator and Page. Put a Separator between items, and end with a Page for the current location, which is not a link.",
  sections: [
    section(
      "links",
      "Links and routers",
      "UiBreadcrumbLink renders a plain anchor. To navigate with a router, pass as-child and put the router's link inside, so the styling stays on the breadcrumb. The Separator accepts any content in its default slot, and UiBreadcrumbEllipsis marks hidden levels; wrap it in a trigger to reveal them.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Basic",
      description: "Links to the parent pages, the current page at the end.",
    },
    {
      file: "CustomSeparator",
      title: "Custom separator and icon",
      description: "Any content in the separator slot, and an icon inside a link.",
    },
    {
      file: "Collapsed",
      title: "Collapsed levels",
      description: "UiBreadcrumbEllipsis as the trigger of a menu with the hidden levels.",
    },
    {
      file: "Links",
      title: "With Inertia links",
      description: "as-child hands the anchor to the router's Link.",
    },
  ],
} satisfies ComponentArticle;
