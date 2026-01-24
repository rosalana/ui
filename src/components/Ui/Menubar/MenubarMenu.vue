<script setup lang="ts">
import type { MenubarMenuProps } from "reka-ui";
import { MenubarMenu, useForwardProps } from "reka-ui";

const props = defineProps<MenubarMenuProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MenubarMenu data-slot="menubar-menu" v-bind="forwarded">
    <slot />
  </MenubarMenu>
</template>
