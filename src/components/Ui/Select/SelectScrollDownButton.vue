<script setup lang="ts">
import type { SelectScrollDownButtonProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { SelectScrollDownButton, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const selectScrollDownButton = tv({
  base: "flex cursor-default items-center justify-center py-1",
});

interface Props extends SelectScrollDownButtonProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <SelectScrollDownButton
    data-slot="select-scroll-down-button"
    v-bind="forwarded"
    :class="[selectScrollDownButton({ class: props.class })]"
  >
    <slot>
      <UiIcon name="lucide:chevron-down" class="size-4" />
    </slot>
  </SelectScrollDownButton>
</template>
