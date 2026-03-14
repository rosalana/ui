<script setup lang="ts">
import type { DropdownMenuSubTriggerProps } from "reka-ui";
import { DropdownMenuSubTrigger, useForwardProps } from "reka-ui";
import { tv, type VariantProps , type ClassValue } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const dropdownMenuSubTrigger = tv({
  base: [
    "flex cursor-default select-none items-center gap-1",
    "rounded-lg px-2 py-1.5 text-sm outline-none border border-transparent",
    "transition-colors duration-150",
    "focus:bg-accent focus:border-border/40 data-[state=open]:bg-accent data-[state=open]:border-border/40",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

type DropdownMenuSubTriggerVariants = VariantProps<
  typeof dropdownMenuSubTrigger
>;

interface Props extends DropdownMenuSubTriggerProps {
  class?: ClassValue;
  inset?: DropdownMenuSubTriggerVariants["inset"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DropdownMenuSubTrigger
    data-slot="dropdown-menu-sub-trigger"
    v-bind="forwarded"
    :class="[dropdownMenuSubTrigger({ inset, class: props.class })]"
  >
    <slot />
    <UiIcon name="lucide:chevron-right" class="ml-auto" />
  </DropdownMenuSubTrigger>
</template>
