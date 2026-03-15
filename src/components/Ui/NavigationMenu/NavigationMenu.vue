<script setup lang="ts">
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from "reka-ui";
import {
  NavigationMenuRoot,
  NavigationMenuViewport,
  useForwardPropsEmits,
} from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const navigationMenu = tv({
  base: "relative z-10 flex max-w-max flex-1 items-center justify-center",
});

const navigationMenuViewport = tv({
  base: "origin-top-center transition-all shadow-[0_4px_16px_-4px,0_8px_32px_-8px] shadow-theme/15 relative mt-1.5 h-[var(--reka-navigation-menu-viewport-height)] w-full overflow-hidden rounded-xl border bg-background text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--reka-navigation-menu-viewport-width)]",
});

interface Props extends NavigationMenuRootProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const emit = defineEmits<NavigationMenuRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <NavigationMenuRoot
    data-slot="navigation-menu"
    v-bind="forwarded"
    :class="[navigationMenu({ class: props.class })]"
  >
    <slot />
    <div class="absolute left-0 top-full flex justify-center">
      <NavigationMenuViewport :class="navigationMenuViewport()" />
    </div>
  </NavigationMenuRoot>
</template>
