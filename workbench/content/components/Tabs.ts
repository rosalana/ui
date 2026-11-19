import { section, type ComponentArticle } from "../schema";

export default {
  category: "Navigation",
  description: "Switch between related panels within one page.",
  guidance:
    "Give every UiTabsTrigger a value and a UiTabsContent with the same value inside one UiTabs. Label the UiTabsList with aria-label so screen readers can name the group.",
  sections: [
    section(
      "state",
      "Uncontrolled and controlled",
      "Pass default-value and UiTabs keeps track of the open tab itself. Bind v-model when the app needs to read or change the tab, for example to move through steps with a button. Only the open panel is rendered unless a UiTabsContent has force-mount.",
    ),
    section(
      "keyboard",
      "Keyboard and orientation",
      "Arrow keys move between triggers, Home and End jump to the first and last. In the default automatic mode the focused tab opens right away; activation-mode=\"manual\" only moves the focus and Enter or Space opens it. Set orientation=\"vertical\" on UiTabs for a stacked list, which switches the arrow keys to up and down, and give the list flex-col classes to lay it out.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Basic",
      description: "A team page split into three panels.",
    },
    {
      file: "Controlled",
      title: "Controlled with v-model",
      description: "A button moves a setup flow forward by changing the bound tab.",
    },
    {
      file: "Vertical",
      title: "Vertical, manual and disabled",
      description:
        "A settings menu: orientation vertical, activation-mode manual and a disabled trigger.",
    },
  ],
} satisfies ComponentArticle;
