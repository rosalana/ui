<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const alertTitle = tv({
  base: "mb-1.5 font-medium leading-none tracking-tight",
});

interface Props extends PrimitiveProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="alert-title"
    :as="as ?? 'h5'"
    :as-child="asChild"
    :class="[alertTitle({ class: props.class })]"
  >
    <slot />
  </Primitive>
</template>
