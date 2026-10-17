<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from "reka-ui";
import { ComboboxRoot, useForwardPropsEmits } from "reka-ui";
import { computed, provide, useId } from "vue";
import { tv , type ClassValue } from "tailwind-variants";
import { LayoutGroup } from "motion-v";

const command = tv({
  base: [
    "flex size-full flex-col overflow-hidden",
    "rounded-xl border bg-background text-foreground",
    "shadow-[0_4px_16px_-4px,0_8px_32px_-8px] shadow-theme/15",
    // Groups without results are hidden while searching; their dividers would be left stacked.
    "[&:has([data-slot=command-group][hidden])_[data-slot=command-separator]]:hidden",
    // Nothing to list (e.g. remote search before typing): show just the input, no divider.
    "[&:has([data-slot=command-list-content]:empty)_[data-slot=command-input-wrapper]]:border-b-0",
  ],
});

interface Props extends ComboboxRootProps {
  class?: ClassValue;
  loading?: boolean;
}

// A command list is always shown; a closed combobox would not render CommandList at all.
const props = withDefaults(defineProps<Props>(), {
  open: true,
});
const emit = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);

// Scopes the highlight's layoutId, so it only slides between items of this command.
const layoutGroupId = useId();

// Read by CommandLoading and CommandEmpty, so "no results" is not shown while results load.
provide("commandLoading", computed(() => props.loading));
</script>

<template>
  <ComboboxRoot
    data-slot="command"
    v-bind="forwarded"
    :class="[command({ class: props.class })]"
  >
    <LayoutGroup :id="layoutGroupId">
      <slot />
    </LayoutGroup>
  </ComboboxRoot>
</template>
