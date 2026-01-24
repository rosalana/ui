<script setup lang="ts">
import type { DropdownMenuSubTriggerProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { DropdownMenuSubTrigger, useForwardProps } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const dropdownMenuSubTrigger = tv({
  base: "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
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
  class?: HTMLAttributes["class"];
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
