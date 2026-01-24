<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

const contextMenuShortcut = tv({
  base: "ml-auto text-xs tracking-widest text-muted-foreground",
})

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <span
    data-slot="context-menu-shortcut"
    :class="[contextMenuShortcut(), props.class]"
  >
    <slot />
  </span>
</template>
