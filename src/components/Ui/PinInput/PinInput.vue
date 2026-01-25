<script setup lang="ts" generic="T extends 'text' | 'number' = 'text'">
import type { PinInputRootEmits, PinInputRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { PinInputRoot, useForwardPropsEmits } from "reka-ui";
import { tv } from "tailwind-variants";

const pinInput = tv({
  base: "flex items-center gap-2",
});

const props = withDefaults(
  defineProps<PinInputRootProps<T> & { class?: HTMLAttributes["class"] }>(),
  {
    placeholder: "○",
  },
);
const emit = defineEmits<PinInputRootEmits<T>>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <PinInputRoot
    data-slot="pin-input"
    v-bind="forwarded"
    :class="[pinInput({ class: props.class })]"
  >
    <slot />
  </PinInputRoot>
</template>
