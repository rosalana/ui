import { tv } from "tailwind-variants";

/** Shared look of UiCalendar and UiRangeCalendar. */

export const calendarRoot = tv({
  // Relative for the month / year picker panel
  base: "relative p-3 select-none",
});

export const calendarHeader = tv({
  base: "flex items-center justify-between gap-2 pb-3",
});

export const calendarHeading = tv({
  base: "text-sm font-semibold first-letter:uppercase",
});

export const calendarNavButton = tv({
  base: [
    "cursor-pointer inline-flex size-8 items-center justify-center rounded-lg text-foreground",
    "border border-transparent transition-all duration-200 ease-out",
    "hover:bg-muted hover:border-border/40 active:scale-[0.94]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:size-4",
  ],
});

export const calendarGrid = tv({
  base: "w-full border-collapse",
});

export const calendarHeadCell = tv({
  // Only as wide as a day, its height hugs the label so it sits right above the days
  base: "w-9 pb-1 text-[0.7rem] leading-none font-medium text-theme first-letter:uppercase",
});

export const calendarCell = tv({
  base: "relative p-0 text-center focus-within:z-20",
});

/** Days are ghost buttons, the same as the ghost UiButton and the month picker. */
export const calendarCellTrigger = tv({
  base: [
    "relative cursor-pointer inline-flex size-9 items-center justify-center rounded-md text-sm tabular-nums",
    "border border-transparent text-foreground transition-all duration-200 ease-out outline-none",
    "hover:bg-muted hover:border-border/40",
    "focus-visible:ring-2 focus-visible:ring-ring/30",
    // Today: primary text with a small dot underneath
    "data-[today]:font-semibold data-[today]:text-primary",
    "data-[today]:after:absolute data-[today]:after:bottom-1 data-[today]:after:size-1 data-[today]:after:rounded-full data-[today]:after:bg-current",
    "data-[outside-view]:text-theme data-[outside-view]:opacity-50",
    "data-[unavailable]:pointer-events-none data-[unavailable]:text-theme data-[unavailable]:line-through",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
  ],
  variants: {
    mode: {
      // Selected day keeps the ghost hover look on, with a full border
      single: "data-[selected]:bg-muted data-[selected]:border-border data-[selected]:font-semibold",
      // Days inside the range sit on the cell's band (the border gray), the two ends a shade darker
      range: [
        "data-[selected]:hover:border-theme/20",
        "data-[selection-start]:bg-border data-[selection-start]:border-theme/30 data-[selection-start]:font-semibold",
        "data-[selection-end]:bg-border data-[selection-end]:border-theme/30 data-[selection-end]:font-semibold",
      ],
    },
  },
  defaultVariants: {
    mode: "single",
  },
});

/**
 * Range band behind the selected (or hovered-towards) days. It is drawn on the cells, so it runs
 * unbroken between the days and rounds off at the range ends and the edges of each week.
 */
export const rangeCell = tv({
  base: [
    // Picked range, and a lighter preview while hovering towards the end
    "has-[[data-highlighted]]:bg-border/40 has-[[data-selected]]:bg-border/60",
    "has-[[data-selection-start]]:rounded-l-md has-[[data-selection-end]]:rounded-r-md",
    "has-[[data-highlighted-start]]:rounded-l-md has-[[data-highlighted-end]]:rounded-r-md",
    "first:rounded-l-md last:rounded-r-md",
  ],
});


/** Month buttons of the month / year picker, like the ghost UiButton. */
export const pickerOption = tv({
  base: [
    "cursor-pointer inline-flex h-7 w-full items-center justify-center rounded-md text-xs",
    "border border-transparent text-foreground transition-all duration-200 ease-out outline-none",
    "hover:bg-muted hover:border-border/40 active:scale-[0.96]",
    "focus-visible:ring-2 focus-visible:ring-ring/30",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  variants: {
    current: { true: "font-semibold text-primary" },
    // Ghost button's hover look kept on, with a full border, same as a selected day
    selected: { true: "bg-muted border-border font-semibold" },
  },
});

export const calendarHeadingButton = tv({
  base: [
    "cursor-pointer inline-flex items-center gap-1 rounded-lg px-2 py-1",
    "transition-all duration-200 ease-out hover:bg-muted active:scale-[0.97]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
    "disabled:pointer-events-none",
  ],
});
