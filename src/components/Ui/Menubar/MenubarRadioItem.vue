<script setup lang="ts">
import type { MenubarRadioItemProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import {
  MenubarItemIndicator,
  MenubarRadioItem,
  useForwardProps,
} from "reka-ui";
import { tv } from "tailwind-variants";

const menubarRadioItem = tv({
  base: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
});

interface Props extends MenubarRadioItemProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MenubarRadioItem
    data-slot="menubar-radio-item"
    v-bind="forwarded"
    :class="[menubarRadioItem({ class: props.class })]"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <MenubarItemIndicator>
        <span class="size-2 rounded-full bg-current" />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarRadioItem>
</template>
