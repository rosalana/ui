<script setup lang="ts">
import { inject, useId } from "vue";
import { motion } from "motion-v";
import { tv, type ClassValue } from "tailwind-variants";
import { useLocale } from "../../../composables/useLocale";
import type { TocHeading } from "./types";
import { tocKey, useTocState } from "./state";

const list = tv({
  base: "flex flex-col border-l border-border text-sm",
});

interface Props {
  headings: TocHeading[];
  /** Distance from the top of the viewport at which a heading counts as being read. */
  offset?: number;
  /** Write the heading's id to the URL hash on a jump. Turn off for a hash-based router. */
  hash?: boolean;
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  offset: 120,
  hash: true,
});

const emit = defineEmits<{
  /** A heading was chosen, after the page started scrolling to it. */
  select: [id: string];
}>();

const { t } = useLocale();

// Inside UiTocIsland the island tracks the page for both.
const state =
  inject(tocKey, null) ??
  useTocState(
    () => ({ headings: props.headings, offset: props.offset, hash: props.hash }),
    (id) => emit("select", id),
  );
const { active, jump } = state;

// Scopes the indicator's layoutId, so it only slides within this list.
const indicator = `toc-indicator-${useId()}`;
</script>

<template>
  <nav
    v-if="headings.length"
    data-slot="toc"
    :aria-label="t('toc.label')"
  >
    <ul :class="list({ class: props.class })">
      <li v-for="heading in headings" :key="heading.id" class="relative">
        <motion.span
          v-if="active === heading.id"
          :layout-id="indicator"
          class="absolute inset-y-0 -left-px w-0.5 rounded-full bg-foreground"
          :transition="{ type: 'spring', stiffness: 400, damping: 30 }"
        />
        <button
          type="button"
          class="block w-full cursor-pointer truncate py-1 text-left transition-colors"
          :class="[
            heading.level === 3 ? 'pl-6' : 'pl-3.5',
            active === heading.id
              ? 'font-medium text-foreground'
              : 'text-theme hover:text-foreground',
          ]"
          :aria-current="active === heading.id ? 'true' : undefined"
          @click="jump(heading.id)"
        >
          {{ heading.text }}
        </button>
      </li>
    </ul>
  </nav>
</template>
