<script setup lang="ts">
import type { NavigationMenuTriggerProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { NavigationMenuTrigger, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const navigationMenuTrigger = tv({
  base: "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
});

interface Props extends NavigationMenuTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <NavigationMenuTrigger
    data-slot="navigation-menu-trigger"
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
