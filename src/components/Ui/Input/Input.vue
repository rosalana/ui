<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useForwardExpose } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";

const input = tv({
  base: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      default: "",
      error: "border-destructive focus-visible:ring-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type InputVariants = VariantProps<typeof input>;

interface Props {
  defaultValue?: string | number;
  modelValue?: string | number;
  type?: HTMLInputElement["type"];
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  autocomplete?: string;
  autofocus?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  pattern?: string;
  variant?: InputVariants["variant"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  variant: "default",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { forwardRef } = useForwardExpose();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <input
    :ref="forwardRef"
    data-slot="input"
    :type="type"
    :value="modelValue ?? defaultValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :name="name"
    :id="id"
    :autocomplete="autocomplete"
    :autofocus="autofocus"
    :min="min"
    :max="max"
    :step="step"
    :pattern="pattern"
    :class="[input({ variant, class: props.class })]"
    @input="handleInput"
  />
</template>
