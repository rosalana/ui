<script setup lang="ts">
import type { DropdownMenuRadioItemProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  useForwardProps,
} from "reka-ui";
import { tv } from "tailwind-variants";

const dropdownMenuRadioItem = tv({
  base: [
    "relative flex cursor-pointer select-none items-center",
    "rounded-lg py-2 pl-8 pr-2.5 text-sm outline-none",
    "transition-colors duration-150",
    "focus:bg-accent focus:text-accent-foreground",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ],
});

interface Props extends DropdownMenuRadioItemProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DropdownMenuRadioItem
    data-slot="dropdown-menu-radio-item"
    v-bind="forwarded"
    :class="[dropdownMenuRadioItem({ class: props.class })]"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <span class="size-2 rounded-full bg-current" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
