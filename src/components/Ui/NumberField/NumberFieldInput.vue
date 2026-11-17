<script setup lang="ts">
import type { NumberFieldInputProps } from "reka-ui";
import { NumberFieldInput, injectNumberFieldRootContext, useForwardProps } from "reka-ui";
import { computed, ref, watch } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import NumberFieldRoller from "./NumberFieldRoller.vue";

const numberFieldInput = tv({
  slots: {
    wrapper: "relative flex h-full min-w-0 flex-1 items-center",
    input: [
      "h-full w-full min-w-0 bg-transparent text-center text-sm tabular-nums text-foreground outline-none",
      "placeholder:text-theme disabled:cursor-not-allowed",
    ],
    roller: "pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-foreground",
  },
  variants: {
    // The rolling digits stand in for the input's own text, the caret and selection go with it
    rolling: {
      true: { input: "text-transparent caret-transparent selection:bg-transparent" },
    },
  },
});

interface Props extends NumberFieldInputProps {
  /** Rolls the digits on every change. Typing shows the plain input until it loses focus. */
  animated?: boolean;
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  animated: true,
});

// placeholder, name, aria-* … belong on the input, not on the wrapper
defineOptions({ inheritAttrs: false });

const delegated = computed(() => {
  const { class: _, animated, ...rest } = props;
  return rest;
});

const forwarded = useForwardProps(delegated);

const root = injectNumberFieldRootContext();

/** Typing since the input got focus: the digits would roll under the caret, so they step aside. */
const typing = ref(false);

/** Which way the digits roll: up when the value grows, down when it shrinks. */
const direction = ref(1);

watch(
  () => root.modelValue.value,
  (value, previous) => {
    if (value != null && previous != null && value !== previous) direction.value = value > previous ? 1 : -1;
  },
);

const rolling = computed(() => props.animated && !typing.value && root.textValue.value !== "");

const styles = computed(() => numberFieldInput({ rolling: rolling.value }));
</script>

<template>
  <div data-slot="number-field-input-wrapper" :class="styles.wrapper({ class: props.class })">
    <NumberFieldInput
      data-slot="number-field-input"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="styles.input()"
      @input="typing = true"
      @blur="typing = false"
    />
    <span v-if="animated" v-show="rolling" data-slot="number-field-roller" :class="styles.roller()">
      <NumberFieldRoller :text="root.textValue.value" :direction="direction" />
    </span>
  </div>
</template>
