<script setup lang="ts">
import { computed, ref } from "vue";
import type { WebNavProps } from "./types";
import {
  UiNavigationMenu,
  UiNavigationMenuList,
  UiNavigationMenuItem,
  UiNavigationMenuTrigger,
  UiNavigationMenuContent,
  UiNavigationMenuLink,
  UiCollapsible,
  UiCollapsibleTrigger,
  UiCollapsibleContent,
  UiIcon,
} from "../../index";
import { useScroll } from "@vueuse/core";
import { AnimatePresence, motion } from "motion-v";

const props = defineProps<WebNavProps>();

const { y } = useScroll(window);
const scrolled = computed(() => y.value > 16);

const mobileOpen = ref(false);
const openSections = ref<Record<string, boolean>>({});
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled || mobileOpen ? 'border-b border-border/60 bg-background' : '',
    ]"
  >
    <div class="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
      <!-- Brand -->
      <slot name="brand">
        <span class="text-base font-semibold tracking-tight">Rosalana</span>
      </slot>

      <!-- Navigation (desktop) -->
      <div class="hidden md:flex">
        <UiNavigationMenu v-if="menu?.length">
          <UiNavigationMenuList>
            <UiNavigationMenuItem v-for="item in menu" :key="item.title">
              <template v-if="item.children">
                <UiNavigationMenuTrigger
                  :class="[
                    'bg-transparent hover:bg-muted/60 data-[state=open]:bg-muted/60 text-foreground/60 hover:text-foreground data-[state=open]:text-foreground',
                    item.disabled && 'pointer-events-none opacity-40',
                  ]"
                >
                  {{ item.title }}
                </UiNavigationMenuTrigger>
                <UiNavigationMenuContent>
                  <ul class="grid w-[440px] gap-1 p-3 md:grid-cols-2">
                    <li v-for="child in item.children" :key="child.title">
                      <UiNavigationMenuLink as-child>
                        <a
                          :href="
                            child.disabled ? undefined : (child.href ?? '#')
                          "
                          :class="[
                            'block select-none rounded-lg p-3 leading-none no-underline transition-colors',
                            child.disabled
                              ? 'pointer-events-none opacity-40'
                              : 'hover:bg-muted focus:bg-muted',
                          ]"
                        >
                          <div
                            class="mb-1 flex items-center gap-2 text-sm font-medium leading-none text-foreground"
                          >
                            {{ child.title }}
                            <span
                              v-if="child.tag"
                              class="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary"
                            >
                              {{ child.tag }}
                            </span>
                          </div>
                          <p
                            v-if="child.description"
                            class="line-clamp-2 text-xs leading-relaxed text-muted-foreground"
                          >
                            {{ child.description }}
                          </p>
                        </a>
                      </UiNavigationMenuLink>
                    </li>
                  </ul>
                </UiNavigationMenuContent>
              </template>

              <template v-else>
                <UiNavigationMenuLink as-child>
                  <a
                    :href="item.disabled ? undefined : (item.href ?? '#')"
                    :class="[
                      'inline-flex h-9 items-center px-3 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground rounded-md hover:bg-muted/60',
                      item.disabled && 'pointer-events-none opacity-40',
                    ]"
                  >
                    {{ item.title }}
                  </a>
                </UiNavigationMenuLink>
              </template>
            </UiNavigationMenuItem>
          </UiNavigationMenuList>
        </UiNavigationMenu>
      </div>

      <!-- Actions + hamburger -->
      <div class="flex items-center gap-1.5">
        <slot name="actions" />

        <!-- Hamburger (mobile only) -->
        <button
          v-if="menu?.length"
          class="flex md:hidden items-center justify-center w-9 h-9 rounded-lg hover:bg-muted/60 transition-colors text-foreground/70 hover:text-foreground active:scale-[0.97]"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
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
        </button>
      </div>
    </div>

    <!-- Mobile dropdown menu -->
    <AnimatePresence>
      <motion.div
        v-if="mobileOpen"
        :initial="{ opacity: 0, height: 0 }"
        :animate="{ opacity: 1, height: 'auto' }"
        :exit="{ opacity: 0, height: 0 }"
        :transition="{ type: 'spring', stiffness: 400, damping: 38 }"
        class="overflow-hidden md:hidden border-t border-border/60 bg-background"
      >
        <nav class="px-4 py-3 space-y-0.5">
          <template v-for="item in menu" :key="item.title">
            <!-- Item with children via Collapsible -->
            <UiCollapsible
              v-if="item.children"
              v-model:open="openSections[item.title]"
              :disabled="item.disabled"
            >
              <UiCollapsibleTrigger as-child>
                <button
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    item.disabled
                      ? 'pointer-events-none opacity-40 text-foreground/60'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted/60',
                  ]"
                >
                  <span>{{ item.title }}</span>
                  <motion.span
                    :animate="{ rotate: openSections[item.title] ? 180 : 0 }"
                    :transition="{
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                    }"
                    class="inline-flex text-muted-foreground"
                  >
                    <UiIcon name="lucide:chevron-down" class="size-4" />
                  </motion.span>
                </button>
              </UiCollapsibleTrigger>
              <UiCollapsibleContent>
                <div
                  class="space-y-0.5 py-1 border-l border-border/60 pl-3 ml-4 mt-0.5 mb-1"
                >
                  <a
                    v-for="child in item.children"
                    :key="child.title"
                    :href="child.disabled ? undefined : (child.href ?? '#')"
                    :class="[
                      'block px-3 py-2 rounded-lg text-sm transition-colors',
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
                    <p
                      v-if="child.description"
                      class="mt-0.5 text-xs text-theme line-clamp-2"
                    >
                      {{ child.description }}
                    </p>
                  </a>
                </div>
              </UiCollapsibleContent>
            </UiCollapsible>

            <!-- Simple item -->
            <a
              v-else
              :href="item.disabled ? undefined : (item.href ?? '#')"
              :class="[
                'flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                item.disabled
                  ? 'pointer-events-none opacity-40 text-foreground/60'
                  : 'text-foreground/70 hover:text-foreground hover:bg-muted/60',
              ]"
            >
              {{ item.title }}
            </a>
          </template>
        </nav>
      </motion.div>
    </AnimatePresence>
  </header>
</template>
