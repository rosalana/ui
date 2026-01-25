<script setup lang="ts">
import type { PinInputInputProps } from "reka-ui";
import { onMounted, ref, type HTMLAttributes } from "vue";
import { PinInputInput, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";
import { ComponentPublicInstance } from "vue";

const pinInputInput = tv({
  base: [
    "size-10 p-2 rounded-xl text-center text-sm font-medium",
    "bg-background text-foreground outline-none focus-visible:ring-1 focus-visible:ring",
    "border border-border select-none",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40",
    "hover:bg-muted",
    "hover:shadow-muted",
    "focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    "focus:scale-105",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "transition-all duration-200 ease-out",
    "data-[filled=true]:bg-muted",
    "caret-transparent",
  ],
});

interface Props extends PinInputInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);

const inputRef = ref<ComponentPublicInstance | null>(null);
const isFilled = ref(false);

const checkFilledState = () => {
  if (inputRef.value) {
    isFilled.value = inputRef.value?.$el.value?.length > 0 || false;
  }
};

onMounted(() => {
  setTimeout(checkFilledState, 0);
});
</script>
<template>
  <PinInputInput
    data-slot="pin-input-input"
    ref="inputRef"
    :data-filled="isFilled || undefined"
    v-bind="forwarded"
    :class="[pinInputInput({ class: props.class })]"
    @input="checkFilledState"
    @keyup="checkFilledState"
  />
</template>
