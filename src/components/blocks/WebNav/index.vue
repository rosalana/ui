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
  UiButton,
} from "../../index";
import { useScroll } from "@vueuse/core";
import { AnimatePresence, motion } from "motion-v";
import { Link } from "@inertiajs/vue3";

const props = defineProps<WebNavProps>();

const { y } = useScroll(window);
const scrolled = computed(() => y.value > 16);

const mobileOpen = ref(false);
const openSections = ref<Record<string, boolean>>({});

const currentRoute = computed(() => window.location.pathname);
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
        <UiNavigationMenu v-if="menu?.length" data-slot="web-nav">
          <UiNavigationMenuList>
            <UiNavigationMenuItem v-for="item in menu" :key="item.title">
              <template v-if="item.children">
                <UiNavigationMenuTrigger
                  :active="item.children.some((c) => c.href === currentRoute)"
                >
                  {{ item.title }}
                </UiNavigationMenuTrigger>
                <UiNavigationMenuContent>
                  <ul class="grid w-[440px] gap-1 p-3 md:grid-cols-2">
                    <li v-for="child in item.children" :key="child.title">
                      <UiNavigationMenuLink
                        :as="Link"
                        :href="child.disabled ? '#' : (child.href ?? '#')"
                        :class="
                          child.disabled ? 'pointer-events-none opacity-50' : ''
                        "
                      >
                        <div
                          class="mb-1 flex items-center gap-2 text-sm font-medium leading-none text-foreground"
                          :data-active="
                            child.href === currentRoute ? '' : undefined
                          "
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
                      </UiNavigationMenuLink>
                    </li>
                  </ul>
                </UiNavigationMenuContent>
              </template>

              <template v-else>
                <UiNavigationMenuLink
                  :active="item.href === currentRoute"
                  :disabled="item.disabled"
                  class="shadow-none h-9 inline-flex font-medium"
                  :class="item.disabled ? 'pointer-events-none opacity-50' : ''"
                  as-child
                >
                  <UiButton
                    variant="ghost"
                    :as="Link"
                    :href="item.disabled ? '#' : (item.href ?? '#')"
                  >
                    {{ item.title }}
                  </UiButton>
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
        <UiButton
          v-if="menu?.length"
          variant="ghost"
          size="icon-sm"
          class="border-none hover:bg-transparent md:hidden"
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
        </UiButton>
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
        <nav class="px-4 py-3 space-y-0.5" data-slot="web-nav">
          <template v-for="item in menu" :key="item.title">
            <!-- Item with children via Collapsible -->
            <UiCollapsible
              v-if="item.children"
              v-model:open="openSections[item.title]"
              :disabled="item.disabled"
              :default-open="item.children.some((c) => c.href === currentRoute)"
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
                  <Link
                    v-for="child in item.children"
                    :key="child.title"
                    :href="child.disabled ? undefined : (child.href ?? '#')"
                    :class="[
                      'block px-3 py-2 rounded-lg data-[active]:text-primary text-sm transition-colors',
                      child.disabled
                        ? 'pointer-events-none opacity-40 text-foreground/50'
                        : 'text-foreground/60 hover:text-foreground hover:bg-muted/60',
                    ]"
                    :data-active="child.href === currentRoute ? '' : undefined"
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
                  </Link>
                </div>
              </UiCollapsibleContent>
            </UiCollapsible>

            <!-- Simple item -->
            <Link
              v-else
              :href="item.disabled ? undefined : (item.href ?? '#')"
              :data-active="item.href === currentRoute ? '' : undefined"
              :class="[
                'flex items-center px-3 py-2.5 rounded-lg text-sm data-[active]:text-primary font-medium transition-colors',
                item.disabled
                  ? 'pointer-events-none opacity-40 text-foreground/60'
                  : 'text-foreground/70 hover:text-foreground hover:bg-muted/60',
              ]"
            >
              {{ item.title }}
            </Link>
          </template>
        </nav>
      </motion.div>
    </AnimatePresence>
  </header>
</template>
