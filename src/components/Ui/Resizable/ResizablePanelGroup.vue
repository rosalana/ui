<script setup lang="ts">
import type { SplitterGroupEmits, SplitterGroupProps } from "reka-ui";
import { SplitterGroup, useForwardPropsEmits } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const resizablePanelGroup = tv({
  base: "flex size-full data-[panel-group-direction=vertical]:flex-col",
});

interface Props extends SplitterGroupProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const emit = defineEmits<SplitterGroupEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <SplitterGroup
    data-slot="resizable-panel-group"
    v-bind="forwarded"
    :class="[resizablePanelGroup({ class: props.class })]"
  >
    <slot />
  </SplitterGroup>
</template>
