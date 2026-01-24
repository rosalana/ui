<script setup lang="ts">
import type { ComboboxGroupProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { ComboboxGroup, ComboboxLabel, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const commandGroup = tv({
  base: "overflow-hidden p-1 text-foreground [&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:py-1.5 [&_[data-slot=command-group-heading]]:text-xs [&_[data-slot=command-group-heading]]:font-medium [&_[data-slot=command-group-heading]]:text-muted-foreground",
});

interface Props extends ComboboxGroupProps {
  class?: HTMLAttributes["class"];
  heading?: string;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ComboboxGroup
    data-slot="command-group"
    v-bind="forwarded"
    :class="[commandGroup({ class: props.class })]"
  >
    <ComboboxLabel v-if="heading" data-slot="command-group-heading">
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>
