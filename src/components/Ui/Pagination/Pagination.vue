<script setup lang="ts">
import type { PaginationRootEmits, PaginationRootProps } from "reka-ui";
import { PaginationRoot, useForwardPropsEmits } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const pagination = tv({
  base: "mx-auto flex w-full justify-center",
});

interface Props extends PaginationRootProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const emit = defineEmits<PaginationRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <PaginationRoot
    data-slot="pagination"
    v-bind="forwarded"
    :class="[pagination({ class: props.class })]"
  >
    <slot />
  </PaginationRoot>
</template>
