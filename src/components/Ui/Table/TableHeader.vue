<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { tv } from "tailwind-variants";

const tableHeader = tv({
  base: "[&_tr]:border-b",
});

interface Props {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <thead
    data-slot="table-header"
    :class="[tableHeader({ class: props.class })]"
  >
    <slot />
  </thead>
</template>
