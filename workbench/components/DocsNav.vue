<script setup lang="ts">
// Documentation navigation: every section is a heading over its pages, nothing collapses,
// so the whole section stays scannable. Component pages show their implementation status.
import { computed } from "vue";
import { AnimatePresence, motion } from "motion-v";
import { useWindowScroll } from "@vueuse/core";
import { UiButton, UiIcon, UiSeparator } from "@rosalana/ui";
import type { DocPage } from "../docs/types";
import { useDocsLocale } from "../docs/locale";
import DocsNavList from "./DocsNavList.vue";

export interface DocsNavLink {
  title: string;
  href: string;
  status?: DocPage["status"];
}

export interface DocsNavSection {
  /** Heading of the section; links without a heading come first. */
  title?: string;
  links: DocsNavLink[];
}

const props = defineProps<{
  sections: DocsNavSection[];
  isActive: (href: string) => boolean;
}>();
const mobileOpen = defineModel<boolean>("open", { default: false });
const { t } = useDocsLocale();

const { y } = useWindowScroll();
const scrolled = computed(() => y.value > 16);
</script>

<template>
  <!-- Desktop sidebar -->
  <aside
    data-slot="docs-nav"
    class="fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-border/60 bg-background md:flex"
  >
    <div class="flex h-16 shrink-0 items-center border-b border-border/60 px-4">
      <slot name="brand" />
    </div>

    <div v-if="$slots.search" class="shrink-0 px-3 pt-3">
      <slot name="search" />
    </div>

    <DocsNavList
      class="flex-1 overflow-y-auto px-3 pt-4 pb-6"
      :sections="props.sections"
      :is-active="isActive"
    />

    <div v-if="$slots.actions" class="shrink-0">
      <UiSeparator />
      <div class="px-3 py-3">
        <slot name="actions" />
      </div>
    </div>
  </aside>

  <!-- Mobile header -->
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:hidden',
      scrolled || mobileOpen ? 'border-b border-border/60 bg-background' : '',
    ]"
  >
    <div class="flex h-18 items-center justify-between gap-3 px-6">
      <slot name="brand" />

      <div class="flex items-center gap-1.5">
        <slot name="actions" />

        <UiButton
          variant="ghost"
          size="icon-sm"
          class="border-none hover:bg-transparent"
          :aria-label="mobileOpen ? t('close') : t('menu')"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <motion.span
            :animate="{ rotate: mobileOpen ? 90 : 0 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
            class="inline-flex"
          >
            <UiIcon
              :name="mobileOpen ? 'lucide:x' : 'lucide:menu'"
              class="size-5"
            />
          </motion.span>
        </UiButton>
      </div>
    </div>

    <AnimatePresence>
      <motion.div
        v-if="mobileOpen"
        :initial="{ opacity: 0, x: '-100%' }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: '-100%' }"
        :transition="{ type: 'spring', stiffness: 400, damping: 38 }"
        class="fixed bottom-0 left-0 top-18 w-full overflow-y-auto bg-background"
      >
        <div v-if="$slots.search" class="px-3 pt-3">
          <slot name="search" />
        </div>

        <DocsNavList
          class="px-3 pt-4 pb-6"
          :sections="props.sections"
          :is-active="isActive"
        />
      </motion.div>
    </AnimatePresence>
  </header>
</template>
