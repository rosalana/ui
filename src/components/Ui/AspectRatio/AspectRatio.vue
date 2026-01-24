<script setup lang="ts">
import type { AspectRatioProps } from "reka-ui";
import { AspectRatio, useForwardProps } from "reka-ui";

const props = defineProps<AspectRatioProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AspectRatio data-slot="aspect-ratio" v-bind="forwarded">
    <slot />
  </AspectRatio>
</template>
