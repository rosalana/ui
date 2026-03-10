<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const cardFooter = tv({
  base: "flex items-center p-6 pt-0",
});

interface Props extends PrimitiveProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="card-footer"
    :as="as ?? 'div'"
    :as-child="asChild"
    :class="[cardFooter({ class: props.class })]"
  >
    <slot />
  </Primitive>
</template>
