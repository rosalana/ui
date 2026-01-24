<script setup lang="ts">
import type {
  ContextMenuRadioGroupEmits,
  ContextMenuRadioGroupProps,
} from "reka-ui";
import { ContextMenuRadioGroup, useForwardPropsEmits } from "reka-ui";

const props = defineProps<ContextMenuRadioGroupProps>();
const emit = defineEmits<ContextMenuRadioGroupEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <ContextMenuRadioGroup
    data-slot="context-menu-radio-group"
    v-bind="forwarded"
  >
    <slot />
  </ContextMenuRadioGroup>
</template>
