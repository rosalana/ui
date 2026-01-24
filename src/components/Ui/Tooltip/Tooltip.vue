<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from "reka-ui";
import { TooltipRoot, useForwardPropsEmits } from "reka-ui";

const props = withDefaults(defineProps<TooltipRootProps>(), {
  delayDuration: 200,
});
const emit = defineEmits<TooltipRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <TooltipRoot data-slot="tooltip" v-bind="forwarded">
    <slot />
  </TooltipRoot>
</template>
