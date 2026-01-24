<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

const dropdownMenuShortcut = tv({
  base: "ml-auto text-xs tracking-widest opacity-60",
})

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <span
    data-slot="dropdown-menu-shortcut"
    :class="[dropdownMenuShortcut(), props.class]"
  >
    <slot />
  </span>
</template>
