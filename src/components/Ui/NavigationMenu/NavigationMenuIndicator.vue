<script setup lang="ts">
import type { NavigationMenuIndicatorProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { NavigationMenuIndicator, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const navigationMenuIndicator = tv({
  base: "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
});

interface Props extends NavigationMenuIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <NavigationMenuIndicator
    data-slot="navigation-menu-indicator"
    v-bind="forwarded"
    :class="[navigationMenuIndicator({ class: props.class })]"
  >
    <div
      class="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border shadow-md"
    />
  </NavigationMenuIndicator>
</template>
