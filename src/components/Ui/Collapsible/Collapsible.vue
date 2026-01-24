<script setup lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from "reka-ui";
import { CollapsibleRoot, useForwardPropsEmits } from "reka-ui";

const props = defineProps<CollapsibleRootProps>();
const emit = defineEmits<CollapsibleRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <CollapsibleRoot data-slot="collapsible" v-bind="forwarded">
    <slot />
  </CollapsibleRoot>
</template>
