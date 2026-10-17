<script setup lang="ts">
import { tv, type ClassValue } from "tailwind-variants";

const commandShortcut = tv({
  base: "ml-auto text-xs tracking-widest opacity-60",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <span
    data-slot="command-shortcut"
    :class="[commandShortcut({ class: props.class })]"
  >
    <slot />
  </span>
</template>
