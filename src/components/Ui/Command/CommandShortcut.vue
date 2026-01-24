<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { tv } from "tailwind-variants";

const commandShortcut = tv({
  base: "ml-auto text-xs tracking-widest text-muted-foreground",
});

interface Props {
  class?: HTMLAttributes["class"];
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
