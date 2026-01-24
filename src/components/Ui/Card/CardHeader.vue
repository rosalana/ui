<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { tv } from "tailwind-variants";

const cardHeader = tv({
  base: "flex flex-col space-y-1.5 p-6",
});

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="card-header"
    :as="as ?? 'div'"
    :as-child="asChild"
    :class="[cardHeader({ class: props.class })]"
  >
    <slot />
  </Primitive>
</template>
