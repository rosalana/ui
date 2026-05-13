<script setup lang="ts">
import { computed, ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import { AnimatePresence, motion } from 'motion-v';
import { useScroll } from '@vueuse/core';
import type { WebNavItem } from '../WebNav/types';
import type { SideNavProps } from './types';
import {
  UiCollapsible,
  UiCollapsibleTrigger,
  UiCollapsibleContent,
  UiIcon,
  UiButton,
  UiSeparator,
} from '../../index';

const props = defineProps<SideNavProps>();

const { y } = useScroll(window);
const scrolled = computed(() => y.value > 16);

const currentPath = ref(window.location.pathname);

function isActive(href?: string): boolean {
  if (!href) return false;
  return currentPath.value === href || currentPath.value.startsWith(href + '/');
}

function sectionHasActive(children?: WebNavItem[]): boolean {
  return children?.some((c) => isActive(c.href)) ?? false;
}

const openSections = ref<Record<string, boolean>>(
  Object.fromEntries(
    (props.menu ?? [])
      .filter((item) => item.children && sectionHasActive(item.children))
      .map((item) => [item.title, true]),
  ),
);

function toggle(title: string) {
  openSections.value[title] = !openSections.value[title];
}

const mobileOpen = ref(false);
</script>

<template>
  <!-- Desktop sidebar -->
  <aside
    data-slot="side-nav"
    class="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border/60 bg-background md:flex"
  >
    <div class="flex h-16 shrink-0 items-center border-b border-border/60 px-4">
      <slot name="brand" />
    </div>

    <div v-if="$slots.search" class="shrink-0 border-b border-border/60 px-3 py-3">
      <slot name="search" />
    </div>

    <nav class="flex-1 space-y-0.5 overflow-y-auto px-3 py-3" data-slot="side-nav">
      <template v-for="item in menu" :key="item.title">

        <UiCollapsible
          v-if="item.children"
          :open="openSections[item.title] ?? sectionHasActive(item.children)"
          @update:open="toggle(item.title)"
        >
          <UiCollapsibleTrigger as-child>
            <button
              :class="[
                'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                item.disabled
                  ? 'pointer-events-none opacity-40 text-foreground/60'
                  : 'text-foreground/70 hover:text-foreground hover:bg-muted/60',
              ]"
            >
              <span>{{ item.title }}</span>
              <motion.span
                :animate="{ rotate: (openSections[item.title] ?? sectionHasActive(item.children)) ? 180 : 0 }"
                :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
                class="inline-flex text-muted-foreground"
              >
                <UiIcon name="lucide:chevron-down" class="size-4" />
              </motion.span>
            </button>
          </UiCollapsibleTrigger>

          <UiCollapsibleContent>
            <div class="mt-0.5 mb-1 ml-4 space-y-0.5 border-l border-border/60 pl-3">
              <Link
                v-for="child in item.children"
                :key="child.title"
                :href="child.disabled ? '#' : (child.href ?? '#')"
                :data-active="isActive(child.href) ? '' : undefined"
                :class="[
                  'block px-3 py-2 rounded-lg text-sm transition-colors data-active:text-primary',
                  child.disabled
                    ? 'pointer-events-none opacity-40 text-foreground/50'
                    : 'text-foreground/60 hover:text-foreground hover:bg-muted/60',
                ]"
              >
                <div class="flex items-center gap-2 font-medium">
                  {{ child.title }}
                  <span
                    v-if="child.tag"
                    class="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary"
                  >
                    {{ child.tag }}
                  </span>
                </div>
                <p v-if="child.description" class="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                  {{ child.description }}
                </p>
              </Link>
            </div>
          </UiCollapsibleContent>
        </UiCollapsible>

        <Link
          v-else
          :href="item.disabled ? '#' : (item.href ?? '#')"
          :data-active="isActive(item.href) ? '' : undefined"
          :class="[
            'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors data-active:text-primary',
            item.disabled
              ? 'pointer-events-none opacity-40 text-foreground/60'
              : 'text-foreground/70 hover:text-foreground hover:bg-muted/60',
          ]"
        >
          {{ item.title }}
        </Link>

      </template>
    </nav>

    <div v-if="$slots.actions" class="shrink-0">
      <UiSeparator />
      <div class="px-3 py-3">
        <slot name="actions" />
      </div>
    </div>
  </aside>

  <!-- Mobile header (identical to WebNav header) -->
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:hidden',
      scrolled ? 'border-b border-border/60 bg-background' : '',
    ]"
  >
    <div class="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
      <slot name="brand" />

      <div class="flex items-center gap-1.5">
        <slot name="actions" />

        <UiButton
          v-if="menu?.length"
          variant="ghost"
          size="icon-sm"
          class="border-none hover:bg-transparent"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          @click="mobileOpen = !mobileOpen"
        >
          <motion.span
            :animate="{ rotate: mobileOpen ? 90 : 0 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
            class="inline-flex"
          >
            <UiIcon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" class="size-5" />
          </motion.span>
        </UiButton>
      </div>
    </div>

    <!-- Mobile slide-in nav (from left, below header) -->
    <AnimatePresence>
      <motion.div
        v-if="mobileOpen"
        :initial="{ opacity: 0, x: '-100%' }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: '-100%' }"
        :transition="{ type: 'spring', stiffness: 400, damping: 38 }"
        class="fixed bottom-0 left-0 top-18 w-full overflow-y-auto border-r border-border/60 bg-background"
      >
        <div v-if="$slots.search" class="shrink-0 border-b border-border/60 px-3 py-3">
          <slot name="search" />
        </div>

        <nav class="space-y-0.5 px-3 py-3" data-slot="side-nav">
          <template v-for="item in menu" :key="item.title">

            <UiCollapsible
              v-if="item.children"
              :open="openSections[item.title] ?? sectionHasActive(item.children)"
              @update:open="toggle(item.title)"
            >
              <UiCollapsibleTrigger as-child>
                <button
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    item.disabled
                      ? 'pointer-events-none opacity-40 text-foreground/60'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted/60',
                  ]"
                >
                  <span>{{ item.title }}</span>
                  <motion.span
                    :animate="{ rotate: (openSections[item.title] ?? sectionHasActive(item.children)) ? 180 : 0 }"
                    :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
                    class="inline-flex text-muted-foreground"
                  >
                    <UiIcon name="lucide:chevron-down" class="size-4" />
                  </motion.span>
                </button>
              </UiCollapsibleTrigger>

              <UiCollapsibleContent>
                <div class="mt-0.5 mb-1 ml-4 space-y-0.5 border-l border-border/60 pl-3">
                  <Link
                    v-for="child in item.children"
                    :key="child.title"
                    :href="child.disabled ? '#' : (child.href ?? '#')"
                    :data-active="isActive(child.href) ? '' : undefined"
                    :class="[
                      'block px-3 py-2 rounded-lg text-sm transition-colors data-active:text-primary',
                      child.disabled
                        ? 'pointer-events-none opacity-40 text-foreground/50'
                        : 'text-foreground/60 hover:text-foreground hover:bg-muted/60',
                    ]"
                    @click="mobileOpen = false"
                  >
                    <div class="flex items-center gap-2 font-medium">
                      {{ child.title }}
                      <span
                        v-if="child.tag"
                        class="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary"
                      >
                        {{ child.tag }}
                      </span>
                    </div>
                    <p v-if="child.description" class="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {{ child.description }}
                    </p>
                  </Link>
                </div>
              </UiCollapsibleContent>
            </UiCollapsible>

            <Link
              v-else
              :href="item.disabled ? '#' : (item.href ?? '#')"
              :data-active="isActive(item.href) ? '' : undefined"
              :class="[
                'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors data-active:text-primary',
                item.disabled
                  ? 'pointer-events-none opacity-40 text-foreground/60'
                  : 'text-foreground/70 hover:text-foreground hover:bg-muted/60',
              ]"
              @click="mobileOpen = false"
            >
              {{ item.title }}
            </Link>

          </template>
        </nav>
      </motion.div>
    </AnimatePresence>
  </header>
</template>
