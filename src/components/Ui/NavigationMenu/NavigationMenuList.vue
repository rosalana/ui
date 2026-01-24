<script setup lang="ts">
import type { NavigationMenuListProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { NavigationMenuList, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const navigationMenuList = tv({
  base: "group flex flex-1 list-none items-center justify-center gap-1",
})

interface Props extends NavigationMenuListProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <NavigationMenuList
    data-slot="navigation-menu-list"
    v-bind="forwarded"
    :class="[navigationMenuList(), props.class]"
  >
    <slot />
  </NavigationMenuList>
</template>
