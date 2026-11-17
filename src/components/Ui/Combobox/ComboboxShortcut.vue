<script setup lang="ts">
import { tv, type ClassValue } from "tailwind-variants";

// The same hint as UiCommandShortcut, at the end of an option
const comboboxShortcut = tv({
  base: "ml-auto text-xs tracking-widest opacity-60",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <span data-slot="combobox-shortcut" :class="comboboxShortcut({ class: props.class })">
    <slot />
  </span>
</template>
