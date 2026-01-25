<script setup lang="ts">
import type { SelectItemProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import {
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  useForwardProps,
} from "reka-ui";
import { tv } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const selectItem = tv({
  base: [
    "relative flex cursor-pointer select-none items-center gap-2",
    "rounded-lg px-2.5 py-2 text-sm outline-none",
    "transition-colors duration-150",
    "focus:bg-accent focus:text-accent-foreground",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "[&>svg]:size-4 [&>svg]:shrink-0",
  ],
});

interface Props extends SelectItemProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <SelectItem
    data-slot="select-item"
    v-bind="forwarded"
    :class="[selectItem({ class: props.class })]"
  >
    <span class="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectItemIndicator>
        <UiIcon name="lucide:check" class="size-4" />
      </SelectItemIndicator>
    </span>
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
