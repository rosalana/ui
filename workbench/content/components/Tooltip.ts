import { section, type ComponentArticle } from "../schema";

export default {
  category: "Overlays",
  description: "A brief description shown on hover and keyboard focus.",
  guidance:
    "Compose Trigger and Content. Keep required instructions visible in the page and label icon-only controls independently.",
  sections: [
    section(
      "behavior",
      "How a tooltip behaves",
      "It opens after a short delay (200 ms) when the trigger is hovered or focused, and closes when the pointer or the focus leaves. Use delay-duration on UiTooltip to change the delay. The content is plain text only and never receives focus, so it can't hold links or buttons; use a Popover for that.",
    ),
    section(
      "accessibility",
      "Icon-only controls",
      "A tooltip is a hint, not a label. An icon-only button still needs its own aria-label; the tooltip then repeats it visually for mouse users.",
    ),
    section(
      "button",
      "Tooltip on a button",
      "UiButton has a tooltip prop (and tooltipVariant) that builds this composition for you, which is shorter when the button is the only trigger. Use the components directly for any other trigger or for custom content.",
      `<UiButton size="icon" aria-label="Share bracket" tooltip="Share bracket">
  <UiIcon name="lucide:share-2" />
</UiButton>`,
      "vue",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Icon buttons",
      description:
        "Tooltips on icon-only buttons, with side and delay-duration changed.",
    },
    {
      file: "Variants",
      title: "Variants",
      description:
        "The content has the same semantic variants as other feedback components.",
    },
  ],
} satisfies ComponentArticle;
