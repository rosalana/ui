<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { tv } from "tailwind-variants";

const cardDescription = tv({
  base: "text-sm text-muted-foreground",
});

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="card-description"
    :as="as ?? 'p'"
    :as-child="asChild"
    :class="[cardDescription({ class: props.class })]"
  >
    <slot />
  </Primitive>
</template>
