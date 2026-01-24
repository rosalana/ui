<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { ComboboxRoot, useForwardPropsEmits } from "reka-ui";
import { tv } from "tailwind-variants";

const command = tv({
  base: "flex size-full flex-col overflow-hidden rounded-md bg-background text-foreground",
});

interface Props extends ComboboxRootProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const emit = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <ComboboxRoot
    data-slot="command"
    v-bind="forwarded"
    :class="[command({ class: props.class })]"
  >
    <slot />
  </ComboboxRoot>
</template>
