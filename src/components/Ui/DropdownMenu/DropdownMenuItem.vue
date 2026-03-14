<script setup lang="ts">
import type { DropdownMenuItemProps } from "reka-ui";
import {
  DropdownMenuItem,
  DropdownMenuItemEmits,
  useForwardPropsEmits,
} from "reka-ui";
import { tv, type VariantProps, type ClassValue } from "tailwind-variants";

const dropdownMenuItem = tv({
  base: [
    "relative flex cursor-pointer select-none items-center gap-1",
    "rounded-lg px-2 py-1.5 text-sm outline-none border border-transparent",
    "transition-colors duration-150",
    "focus:bg-accent focus:border-border/40 focus:text-accent-foreground",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "[&>svg]:size-4 [&>svg]:shrink-0",
  ],
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

type DropdownMenuItemVariants = VariantProps<typeof dropdownMenuItem>;

interface Props extends DropdownMenuItemProps {
  class?: ClassValue;
  inset?: DropdownMenuItemVariants["inset"];
}

const props = defineProps<Props>();
const emit = defineEmits<DropdownMenuItemEmits>();
const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    v-bind="forwarded"
    :class="[dropdownMenuItem({ inset, class: props.class })]"
  >
    <slot />
  </DropdownMenuItem>
</template>
