<script setup lang="ts">
import type { ContextMenuSubTriggerProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { ContextMenuSubTrigger, useForwardProps } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const contextMenuSubTrigger = tv({
  base: "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

type ContextMenuSubTriggerVariants = VariantProps<typeof contextMenuSubTrigger>;

interface Props extends ContextMenuSubTriggerProps {
  class?: HTMLAttributes["class"];
  inset?: ContextMenuSubTriggerVariants["inset"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ContextMenuSubTrigger
    data-slot="context-menu-sub-trigger"
    v-bind="forwarded"
    :class="[contextMenuSubTrigger({ inset, class: props.class })]"
  >
    <slot />
    <UiIcon name="lucide:chevron-right" class="ml-auto size-4" />
  </ContextMenuSubTrigger>
</template>
