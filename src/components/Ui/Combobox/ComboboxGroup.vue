<script setup lang="ts">
import type { ComboboxGroupProps } from "reka-ui";
import { ComboboxGroup, ComboboxLabel, useForwardProps } from "reka-ui";
import { computed, provide, reactive } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { COMBOBOX_GROUP_CONTEXT } from "./context";

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

const items = reactive(new Map<string, boolean>());
provide(COMBOBOX_GROUP_CONTEXT, items);

/** Every item is filtered out, so the heading would stand alone. */
const empty = computed(() => items.size > 0 && ![...items.values()].some(Boolean));
</script>

<template>
  <ComboboxGroup
    v-show="!empty"
    data-slot="combobox-group"
    :data-empty="empty || undefined"
    v-bind="forwarded"
    :class="comboboxGroup({ class: props.class })"
  >
    <ComboboxLabel v-if="heading" data-slot="combobox-group-heading" :class="comboboxGroupHeading()">
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>
