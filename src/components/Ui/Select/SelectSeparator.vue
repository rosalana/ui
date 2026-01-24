<script setup lang="ts">
import type { SelectSeparatorProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { SelectSeparator, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const selectSeparator = tv({
  base: "-mx-1 my-1 h-px bg-muted",
});

interface Props extends SelectSeparatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <SelectSeparator
    data-slot="select-separator"
    v-bind="forwarded"
    :class="[selectSeparator({ class: props.class })]"
  />
</template>
