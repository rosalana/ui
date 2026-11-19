import { section, type ComponentArticle } from "../schema";

export default {
  category: "Navigation",
  description: "Site navigation with links and expandable groups.",
  guidance:
    "Compose List, Item, Trigger, Content and Link. Use plain links for destinations and a trigger only for items that expand into a group of links.",
  sections: [
    section(
      "viewport",
      "Panels and links",
      "A trigger opens its UiNavigationMenuContent in a shared viewport that animates between panels as the pointer or focus moves. The viewport is absolutely positioned under the menu, so leave vertical room for it. A UiNavigationMenuLink renders an anchor; mark the current page with the active prop, and use the active prop of UiNavigationMenuTrigger when the page lives inside that group.",
    ),
    section(
      "links",
      "Links in an Inertia app",
      "In an Inertia app wrap the Inertia Link with as-child so navigation stays client-side: UiNavigationMenuLink as-child around Link. The Code tab of the first example shows this version, the preview uses plain anchors with navigation disabled.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Site navigation",
      description: "A group trigger with a panel of links, plus single links.",
      overflow: true,
    },
    {
      file: "Current",
      title: "Current page",
      description: "The active prop highlights the current link and the group that contains it.",
      overflow: true,
    },
  ],
} satisfies ComponentArticle;
