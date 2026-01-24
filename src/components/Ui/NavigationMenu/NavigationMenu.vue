<script setup lang="ts">
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import {
  NavigationMenuRoot,
  NavigationMenuViewport,
  useForwardPropsEmits,
} from "reka-ui";
import { tv } from "tailwind-variants";

const navigationMenu = tv({
  base: "relative z-10 flex max-w-max flex-1 items-center justify-center",
});

const navigationMenuViewport = tv({
  base: "origin-top-center relative mt-1.5 h-[var(--reka-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-background text-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--reka-navigation-menu-viewport-width)]",
});

interface Props extends NavigationMenuRootProps {
  class?: HTMLAttributes["class"];
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
