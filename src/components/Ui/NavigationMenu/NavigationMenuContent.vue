<script setup lang="ts">
import type { NavigationMenuContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { NavigationMenuContent, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const navigationMenuContent = tv({
  base: "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
})

interface Props extends NavigationMenuContentProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <NavigationMenuContent
    data-slot="navigation-menu-content"
    v-bind="forwarded"
    :class="[navigationMenuContent(), props.class]"
  >
    <slot />
  </NavigationMenuContent>
</template>
