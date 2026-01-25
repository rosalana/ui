<script setup lang="ts">
import type {
  DropdownMenuCheckboxItemEmits,
  DropdownMenuCheckboxItemProps,
} from "reka-ui";
import type { HTMLAttributes } from "vue";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuItemIndicator,
  useForwardPropsEmits,
} from "reka-ui";
import { tv } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const dropdownMenuCheckboxItem = tv({
  base: [
    "relative flex cursor-default select-none items-center",
    "rounded-lg py-2 pl-8 pr-2.5 text-sm outline-none",
    "transition-colors duration-150",
    "focus:bg-accent focus:text-accent-foreground",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ],
});

interface Props extends DropdownMenuCheckboxItemProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const emit = defineEmits<DropdownMenuCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <DropdownMenuCheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    v-bind="forwarded"
    :class="[dropdownMenuCheckboxItem({ class: props.class })]"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <UiIcon name="lucide:check" class="size-4" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
