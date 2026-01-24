<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { RadioGroupRoot, useForwardPropsEmits } from "reka-ui";
import { tv } from "tailwind-variants";

const radioGroup = tv({
  base: "grid gap-2",
});

interface Props extends RadioGroupRootProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const emit = defineEmits<RadioGroupRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <RadioGroupRoot
    data-slot="radio-group"
    v-bind="forwarded"
    :class="[radioGroup({ class: props.class })]"
  >
    <slot />
  </RadioGroupRoot>
</template>
