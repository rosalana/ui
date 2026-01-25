<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { tv } from "tailwind-variants";

const alertDescription = tv({
  base: "text-sm [&_p]:leading-relaxed text-theme",
});

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="alert-description"
    :as="as ?? 'div'"
    :as-child="asChild"
    :class="[alertDescription({ class: props.class })]"
  >
    <slot />
  </Primitive>
</template>
