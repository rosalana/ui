<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useForwardExpose } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";

const textarea = tv({
  base: "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
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

type TextareaVariants = VariantProps<typeof textarea>;

interface Props {
  defaultValue?: string;
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  rows?: number;
  cols?: number;
  maxlength?: number;
  minlength?: number;
  wrap?: "hard" | "soft" | "off";
  variant?: TextareaVariants["variant"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { forwardRef } = useForwardExpose();

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <textarea
    :ref="forwardRef"
    data-slot="textarea"
    :value="modelValue ?? defaultValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :name="name"
    :id="id"
    :rows="rows"
    :cols="cols"
    :maxlength="maxlength"
    :minlength="minlength"
    :wrap="wrap"
    :class="[textarea({ variant, class: props.class })]"
    @input="handleInput"
  />
</template>
