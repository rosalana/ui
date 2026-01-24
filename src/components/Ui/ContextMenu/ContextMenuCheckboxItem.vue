<script setup lang="ts">
import type {
  ContextMenuCheckboxItemEmits,
  ContextMenuCheckboxItemProps,
} from "reka-ui";
import type { HTMLAttributes } from "vue";
import {
  ContextMenuCheckboxItem,
  ContextMenuItemIndicator,
  useForwardPropsEmits,
} from "reka-ui";
import { tv } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const contextMenuCheckboxItem = tv({
  base: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
});

interface Props extends ContextMenuCheckboxItemProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const emit = defineEmits<ContextMenuCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <ContextMenuCheckboxItem
    data-slot="context-menu-checkbox-item"
    v-bind="forwarded"
    :class="[contextMenuCheckboxItem({ class: props.class })]"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuItemIndicator>
        <UiIcon name="lucide:check" class="size-4" />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuCheckboxItem>
</template>
