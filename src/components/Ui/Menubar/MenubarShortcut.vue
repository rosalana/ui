<script setup lang="ts">
import { tv , type ClassValue } from "tailwind-variants";

const menubarShortcut = tv({
  base: "ml-auto text-xs tracking-widest text-muted-foreground",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <span
    data-slot="menubar-shortcut"
    :class="[menubarShortcut({ class: props.class })]"
  >
    <slot />
  </span>
</template>
