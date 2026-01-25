<script setup lang="ts">
import { Primitive, PrimitiveProps, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const separator = tv({
  base: "mx-1 select-none shrink-0 text-center text-sm font-medium text-theme",
});

interface Props extends PrimitiveProps {
  class?: string;
}
const props = withDefaults(defineProps<Props>(), {
  as: "span",
});

const forwarded = useForwardProps(props);
</script>
<template>
  <Primitive
    data-slot="pin-input-separator"
    v-bind="forwarded"
    :class="separator({ class: props.class })"
  >
    <slot> − </slot>
  </Primitive>
</template>
