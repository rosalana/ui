<script setup lang="ts">
import Root from './Root.vue';

  defineProps<{
    /** The data to display in the dump. */
    dump: any;
    /** Optional title to display in the header. */
    title?: string;
    /** Number of levels to auto-collapse (0 for none, default: 1) */
    autoCollapse?: number | string;
  }>();
</script>
<template>
  <Root v-bind="$props" />
</template>
