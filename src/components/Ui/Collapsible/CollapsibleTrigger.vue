<script setup lang="ts">
// implemented
import type { CollapsibleTriggerProps } from "reka-ui";
import { CollapsibleTrigger, useForwardProps } from "reka-ui";

const props = defineProps<CollapsibleTriggerProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <CollapsibleTrigger
    data-slot="collapsible-trigger"
    v-bind="forwarded"
    class="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50"
  >
    <slot />
  </CollapsibleTrigger>
</template>
