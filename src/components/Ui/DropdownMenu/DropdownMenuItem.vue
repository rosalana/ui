<script setup lang="ts">
import type { DropdownMenuItemProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { DropdownMenuItem, useForwardProps } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";

const dropdownMenuItem = tv({
  base: "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

type DropdownMenuItemVariants = VariantProps<typeof dropdownMenuItem>;

interface Props extends DropdownMenuItemProps {
  class?: HTMLAttributes["class"];
  inset?: DropdownMenuItemVariants["inset"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
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
