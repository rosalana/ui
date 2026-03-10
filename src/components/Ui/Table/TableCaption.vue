<script setup lang="ts">
import { tv , type ClassValue } from "tailwind-variants";

const tableCaption = tv({
  base: "mt-4 text-sm text-muted-foreground",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <caption
    data-slot="table-caption"
    :class="[tableCaption({ class: props.class })]"
  >
    <slot />
  </caption>
</template>
