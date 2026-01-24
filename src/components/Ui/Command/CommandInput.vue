<script setup lang="ts">
import type { ComboboxInputProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { ComboboxInput, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const commandInput = tv({
  base: "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
});

interface Props extends ComboboxInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <div
    class="flex items-center border-b px-3"
    data-slot="command-input-wrapper"
  >
    <UiIcon name="lucide:search" class="mr-2 size-4 shrink-0 opacity-50" />
    <ComboboxInput
      data-slot="command-input"
      v-bind="forwarded"
      :class="[commandInput({ class: props.class })]"
    />
  </div>
</template>
