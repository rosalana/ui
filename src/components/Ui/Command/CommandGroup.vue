<script setup lang="ts">
import type { ListboxGroupProps } from "reka-ui";
import { ListboxGroup, ListboxGroupLabel, useForwardProps } from "reka-ui";
import { computed } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { injectCommandContext, provideCommandGroupContext } from "./context";

const commandGroup = tv({
  base: "text-foreground not-first:mt-1",
});

const commandGroupHeading = tv({
  base: "px-2.5 py-1.5 text-xs font-semibold text-theme",
});

interface Props extends ListboxGroupProps {
  class?: ClassValue;
  heading?: string;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);

const { isMatch } = injectCommandContext();
const { items } = provideCommandGroupContext();

const hasMatch = computed(() => [...items].some(isMatch));
</script>

<template>
  <!-- v-show, not v-if: hidden items must stay mounted so they come back once the search changes -->
  <ListboxGroup
    v-show="hasMatch"
    data-slot="command-group"
    v-bind="forwarded"
    :class="[commandGroup({ class: props.class })]"
  >
    <ListboxGroupLabel
      v-if="heading || $slots.heading"
      data-slot="command-group-heading"
      :class="commandGroupHeading()"
    >
      <slot name="heading">{{ heading }}</slot>
    </ListboxGroupLabel>
    <slot />
  </ListboxGroup>
</template>
