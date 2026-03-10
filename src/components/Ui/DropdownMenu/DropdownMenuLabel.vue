<script setup lang="ts">
import type { DropdownMenuLabelProps } from "reka-ui";
import { DropdownMenuLabel, useForwardProps } from "reka-ui";
import { tv, type VariantProps , type ClassValue } from "tailwind-variants";

const dropdownMenuLabel = tv({
  base: "px-2.5 py-2 text-xs font-semibold text-theme",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

type DropdownMenuLabelVariants = VariantProps<typeof dropdownMenuLabel>;

interface Props extends DropdownMenuLabelProps {
  class?: ClassValue;
  inset?: DropdownMenuLabelVariants["inset"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DropdownMenuLabel
    data-slot="dropdown-menu-label"
    v-bind="forwarded"
    :class="[dropdownMenuLabel({ inset, class: props.class })]"
  >
    <slot />
  </DropdownMenuLabel>
</template>
