<script setup lang="ts">
import type { ComboboxEmptyProps } from "reka-ui";
import { ComboboxEmpty, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const commandEmpty = tv({
  base: "py-6 text-center text-sm",
});

interface Props extends ComboboxEmptyProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ComboboxEmpty
    data-slot="command-empty"
    v-bind="forwarded"
    :class="[commandEmpty({ class: props.class })]"
  >
    <slot />
  </ComboboxEmpty>
</template>
