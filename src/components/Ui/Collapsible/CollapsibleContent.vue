<script setup lang="ts">
import type { CollapsibleContentProps } from "reka-ui";
import { CollapsibleContent, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

// implemented
const collapsibleContent = tv({
  base: "overflow-hidden text-sm text-foreground/80 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
});

interface Props extends CollapsibleContentProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <CollapsibleContent
    data-slot="collapsible-content"
    v-bind="forwarded"
    :class="[collapsibleContent({ class: props.class })]"
  >
    <slot />
  </CollapsibleContent>
</template>
