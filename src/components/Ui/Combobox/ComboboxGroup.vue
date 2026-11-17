<script setup lang="ts">
import type { ComboboxGroupProps } from "reka-ui";
import { ComboboxGroup, ComboboxLabel, useForwardProps } from "reka-ui";
import { computed } from "vue";
import { tv, type ClassValue } from "tailwind-variants";

const comboboxGroup = tv({
  base: "text-foreground not-first:mt-1",
});

const comboboxGroupHeading = tv({
  base: "px-2.5 py-1.5 text-xs font-semibold text-theme",
});

interface Props extends ComboboxGroupProps {
  class?: ClassValue;
  heading?: string;
}

const props = defineProps<Props>();
const delegated = computed(() => {
  const { class: _, heading, ...rest } = props;
  return rest;
});
const forwarded = useForwardProps(delegated);
</script>

<template>
  <ComboboxGroup
    data-slot="combobox-group"
    v-bind="forwarded"
    :class="comboboxGroup({ class: props.class })"
  >
    <ComboboxLabel v-if="heading" data-slot="combobox-group-heading" :class="comboboxGroupHeading()">
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>
