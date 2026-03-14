<script setup lang="ts">
import { TextEffectProps } from './types';


export interface NoneProps extends TextEffectProps {}

const props = defineProps<NoneProps>();
</script>
<template>
  <span data-slot="text-effect-none" :class="props?.class">
    {{ props.text }}
  </span>
</template>
