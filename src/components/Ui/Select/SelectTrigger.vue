<script setup lang="ts">
import type { SelectTriggerProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { SelectIcon, SelectTrigger, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const selectTrigger = tv({
  base: [
    "cursor-pointer border border-border",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40",
    "hover:shadow-muted",
    "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-xl bg-background text-foreground px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-theme focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    "active:scale-[0.97]",
    "hover:bg-muted",
  ],
});

interface Props extends SelectTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    v-bind="forwarded"
    :class="[selectTrigger({ class: props.class })]"
  >
    <slot />
    <SelectIcon as-child>
      <UiIcon name="lucide:chevron-down" class="size-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
