<script setup lang="ts">
import type { ListboxRootEmits, ListboxRootProps } from "reka-ui";
import { ListboxRoot, useForwardPropsEmits } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";
import { provideCommandContext } from "./context";

const command = tv({
  base: [
    "flex size-full flex-col overflow-hidden",
    "rounded-xl border bg-background text-foreground",
    "shadow-[0_4px_16px_-4px,0_8px_32px_-8px] shadow-theme/15",
  ],
});

interface Props extends ListboxRootProps {
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  highlightOnHover: true,
});
const emit = defineEmits<ListboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const { search } = provideCommandContext();

// Start a fresh search once something is picked.
function onSelected() {
  search.value = "";
}
</script>

<template>
  <ListboxRoot
    data-slot="command"
    v-bind="forwarded"
    :class="[command({ class: props.class })]"
    @update:model-value="onSelected"
  >
    <slot />
  </ListboxRoot>
</template>
