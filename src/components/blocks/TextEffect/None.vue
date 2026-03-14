<script setup lang="ts">
import { TextEffectProps } from ".";

const props = defineProps<TextEffectProps>();
</script>
<template>
  <span data-slot="text-effect-none" :class="props?.class">
    {{ props.text }}
  </span>
</template>
