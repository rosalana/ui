<script setup lang="ts">
import type { MenubarLabelProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { MenubarLabel, useForwardProps } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";

const menubarLabel = tv({
  base: "px-2 py-1.5 text-sm font-semibold",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

type MenubarLabelVariants = VariantProps<typeof menubarLabel>;

interface Props extends MenubarLabelProps {
  class?: HTMLAttributes["class"];
  inset?: MenubarLabelVariants["inset"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MenubarLabel
    data-slot="menubar-label"
    v-bind="forwarded"
    :class="[menubarLabel({ inset, class: props.class })]"
  >
    <slot />
  </MenubarLabel>
</template>
