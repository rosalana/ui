import { section, type ComponentArticle } from "../schema";

export default {
  category: "Feedback",
  description: "The global notification surface for transient feedback.",
  guidance:
    "Sonner is the toaster the plugin mounts once for the whole app, so there is nothing to render yourself and a second toaster would duplicate the stack. Create toasts with useSonner and pin actions under them with useDock. Toasts carry text only, no action button.",
  sections: [
    section(
      "stack",
      "How the stack behaves",
      "Toasts stack at the chosen corner, the newest in front. Older ones peek out behind it until the pointer rests on the stack, which expands it; expand keeps it open all the time. At most visible toasts are rendered, the rest wait in the queue. The timers pause while the stack is hovered or the tab is hidden, and a toast can be closed with its close button or by swiping it away.",
    ),
    section(
      "configure",
      "Configuring the toaster",
      "The toaster is configured with configure, which merges the given fields into the current configuration. Call it once at startup, or at any time to change the behavior, e.g. after the user picks a position. The defaults are position bottom-right, duration 4000 ms, visible 3 and expand false. A single toast can still set its own duration.",
      `import { useSonner } from '@rosalana/ui';

const sonner = useSonner();

sonner.configure({ position: 'top-center', visible: 4 });`,
    ),
    section(
      "dock",
      "Next to a dock",
      "A dock created with useDock sits at the edge of the same stack and toasts stack above it. The page can keep its end clear with padding-bottom: var(--dock-height, 0px).",
    ),
  ],
  examples: [
    {
      file: "Types",
      title: "Types",
      description:
        "Default, info, success, warning and error toasts, a loading one and a toast with a custom icon. Each can carry a description.",
    },
    {
      file: "Position",
      title: "Position",
      description:
        "configure moves the whole stack to any of the six places. The app can offer this as a preference.",
    },
    {
      file: "Stack",
      title: "Stacking",
      description:
        "Five results arrive at once: collapsed, the stack stays compact; expanded, every toast is readable. visible caps how many are rendered.",
    },
  ],
} satisfies ComponentArticle;
