import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { InjectionKey, Ref } from "vue";
import { useEventListener } from "@vueuse/core";
import type { TocHeading } from "./types";

export interface TocOptions {
  headings: TocHeading[];
  /** Distance from the top of the viewport at which a heading counts as being read. */
  offset: number;
  /** Write the heading's id to the URL hash on a jump. */
  hash: boolean;
}

export interface TocState {
  active: Ref<string | null>;
  jump: (id: string) => void;
}

export const tocKey: InjectionKey<TocState> =
  Symbol("Toc");

/** Tracks the section being read and jumps to a heading. Call in setup. */
export function useTocState(
  options: () => TocOptions,
  onSelect: (id: string) => void,
): TocState {
  const active = ref<string | null>(null);

  /** The heading last scrolled past, the section being read. */
  function track() {
    const { headings, offset } = options();
    let last: string | null = headings[0]?.id ?? null;

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element && element.getBoundingClientRect().top <= offset) {
        last = heading.id;
      }
    }

    active.value = last;
  }

  /**
   * While the page scrolls to a chosen heading, the headings it passes are not the section
   * being read. The jump ends once scrolling has paused for a moment.
   */
  let jumping = false;
  let jumpEnd: ReturnType<typeof setTimeout> | undefined;

  function settle() {
    clearTimeout(jumpEnd);
    jumpEnd = setTimeout(() => (jumping = false), 150);
  }

  function onScroll() {
    if (jumping) settle();
    else track();
  }

  // The page may scroll in any container, and scroll events reach the window only while capturing.
  useEventListener("scroll", onScroll, { capture: true, passive: true });
  onMounted(track);
  onBeforeUnmount(() => clearTimeout(jumpEnd));
  watch(() => options().headings, track);

  function jump(id: string) {
    jumping = true;
    // Nothing to scroll (already in place) ends the jump right away too.
    settle();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (options().hash) history.replaceState(history.state, "", `#${id}`);
    active.value = id;
    onSelect(id);
  }

  return { active, jump };
}
