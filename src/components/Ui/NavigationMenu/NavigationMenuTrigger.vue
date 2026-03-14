<script setup lang="ts">
import type { NavigationMenuTriggerProps } from "reka-ui";
import { NavigationMenuTrigger, useForwardProps } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const navigationMenuTrigger = tv({
  base: [
    "group inline-flex h-9 w-max items-center justify-center",
    "rounded-lg px-4 py-2 text-sm font-medium",
    "bg-transparent transition-all duration-200 ease-out text-foreground border border-transparent",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.97]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "data-[active]:text-primary data-[state=open]:bg-muted data-[state=open]:border-border/40",
  ],
});

interface Props extends NavigationMenuTriggerProps {
  class?: ClassValue;
  active?: boolean;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <NavigationMenuTrigger
    data-slot="navigation-menu-trigger"
    :data-active="props.active ? '' : undefined"
    v-bind="forwarded"
    :class="[navigationMenuTrigger({ class: props.class })]"
  >
    <slot />
    <UiIcon
      name="lucide:chevron-down"
      class="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
</template>
