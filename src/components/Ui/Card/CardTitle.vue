<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { tv } from "tailwind-variants";

const cardTitle = tv({
  base: "font-semibold leading-none tracking-tight",
});

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="card-title"
    :as="as ?? 'h3'"
    :as-child="asChild"
    :class="[cardTitle({ class: props.class })]"
  >
    <slot />
  </Primitive>
</template>
