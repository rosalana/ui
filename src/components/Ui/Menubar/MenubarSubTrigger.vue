<script setup lang="ts">
import type { MenubarSubTriggerProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { MenubarSubTrigger, useForwardProps } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const menubarSubTrigger = tv({
  base: "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

type MenubarSubTriggerVariants = VariantProps<typeof menubarSubTrigger>;

interface Props extends MenubarSubTriggerProps {
  class?: HTMLAttributes["class"];
  inset?: MenubarSubTriggerVariants["inset"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MenubarSubTrigger
    data-slot="menubar-sub-trigger"
    v-bind="forwarded"
    :class="[menubarSubTrigger({ inset, class: props.class })]"
  >
    <slot />
    <UiIcon name="lucide:chevron-right" class="ml-auto size-4" />
  </MenubarSubTrigger>
</template>
