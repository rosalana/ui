<script setup lang="ts">
import type { NavigationMenuLinkProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { NavigationMenuLink, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const navigationMenuLink = tv({
  base: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
})

interface Props extends NavigationMenuLinkProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    v-bind="forwarded"
    :class="[navigationMenuLink(), props.class]"
  >
    <slot />
  </NavigationMenuLink>
</template>
