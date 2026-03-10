<script setup lang="ts">
import type { MenubarItemProps } from "reka-ui";
import { MenubarItem, useForwardProps } from "reka-ui";
import { tv, type VariantProps , type ClassValue } from "tailwind-variants";

const menubarItem = tv({
  base: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

type MenubarItemVariants = VariantProps<typeof menubarItem>;

interface Props extends MenubarItemProps {
  class?: ClassValue;
  inset?: MenubarItemVariants["inset"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MenubarItem
    data-slot="menubar-item"
    v-bind="forwarded"
    :class="[menubarItem({ inset, class: props.class })]"
  >
    <slot />
  </MenubarItem>
</template>
