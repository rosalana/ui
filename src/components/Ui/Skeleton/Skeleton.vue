<script setup lang="ts">
import { tv , type ClassValue } from "tailwind-variants";

const skeleton = tv({
  base: "animate-pulse rounded-md bg-primary/10",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <div data-slot="skeleton" :class="[skeleton({ class: props.class })]" />
</template>
