<script setup lang="ts">
import type { NavigationMenuItemProps } from "reka-ui"
import { NavigationMenuItem, useForwardProps } from "reka-ui"

const props = defineProps<NavigationMenuItemProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <NavigationMenuItem data-slot="navigation-menu-item" v-bind="forwarded">
    <slot />
  </NavigationMenuItem>
</template>
