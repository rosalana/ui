<script setup lang="ts">
import type { SelectScrollUpButtonProps } from "reka-ui";
import { SelectScrollUpButton, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const selectScrollUpButton = tv({
  base: "flex cursor-default items-center justify-center py-1",
});

interface Props extends SelectScrollUpButtonProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <SelectScrollUpButton
    data-slot="select-scroll-up-button"
    v-bind="forwarded"
    :class="[selectScrollUpButton({ class: props.class })]"
  >
    <slot>
      <UiIcon name="lucide:chevron-up" class="size-4" />
    </slot>
  </SelectScrollUpButton>
</template>
