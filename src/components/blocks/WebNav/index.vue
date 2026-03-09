<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { WebNavProps } from "./types";
import {
  UiNavigationMenu,
  UiNavigationMenuList,
  UiNavigationMenuItem,
  UiNavigationMenuTrigger,
  UiNavigationMenuContent,
  UiNavigationMenuLink,
} from "../../index";

const props = defineProps<WebNavProps>();

const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 16;
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm'
        : '',
    ]"
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
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
                          :href="child.disabled ? undefined : (child.href ?? '#')"
                          :class="[
                            'block select-none rounded-lg p-3 leading-none no-underline transition-colors',
                            child.disabled
                              ? 'pointer-events-none opacity-40'
                              : 'hover:bg-muted focus:bg-muted',
                          ]"
                        >
                          <div class="mb-1 flex items-center gap-2 text-sm font-medium leading-none text-foreground">
                            {{ child.title }}
                            <span
                              v-if="child.tag"
                              class="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary"
                            >
                              {{ child.tag }}
                            </span>
                          </div>
                          <p v-if="child.description" class="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
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

      <!-- Actions -->
      <div class="flex items-center gap-1.5">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>
