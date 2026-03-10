<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const breadcrumbItem = tv({
  base: "inline-flex items-center gap-1.5",
});

interface Props extends PrimitiveProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="breadcrumb-item"
    :as="as ?? 'li'"
    :as-child="asChild"
    :class="[breadcrumbItem({ class: props.class })]"
  >
    <slot />
  </Primitive>
</template>
