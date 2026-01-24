<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="breadcrumb"
    :as="as ?? 'nav'"
    :as-child="asChild"
    aria-label="breadcrumb"
    :class="props.class"
  >
    <slot />
  </Primitive>
</template>
