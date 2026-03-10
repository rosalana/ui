<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const cardContent = tv({
  base: "p-6 pt-0",
});

interface Props extends PrimitiveProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="card-content"
    :as="as ?? 'div'"
    :as-child="asChild"
    :class="[cardContent({ class: props.class })]"
  >
    <slot />
  </Primitive>
</template>
