<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { ClassValue } from "tailwind-variants";
import { Primitive } from "reka-ui";

interface Props extends PrimitiveProps {
  class?: ClassValue;
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
