<script setup lang="ts">
const props = defineProps<{
  title?: string;
  class?: string;
}>();
</script>
<template>
  <section>
    <h2
      v-if="props.title"
      class="text-xs font-semibold uppercase tracking-widest text-theme mb-4"
    >
      {{ props.title }}
    </h2>
    <div :class="props.class">
      <slot />
    </div>
  </section>
</template>
