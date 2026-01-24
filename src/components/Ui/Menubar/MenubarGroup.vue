<script setup lang="ts">
import type { MenubarGroupProps } from "reka-ui"
import { MenubarGroup, useForwardProps } from "reka-ui"

const props = defineProps<MenubarGroupProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <MenubarGroup data-slot="menubar-group" v-bind="forwarded">
    <slot />
  </MenubarGroup>
</template>
