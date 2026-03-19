<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from "reka-ui";
import { TooltipRoot, useForwardPropsEmits } from "reka-ui";
import TooltipProvider from "./TooltipProvider.vue";

const props = withDefaults(defineProps<TooltipRootProps>(), {
  delayDuration: 200,
});
const emit = defineEmits<TooltipRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <TooltipProvider>
    <TooltipRoot data-slot="tooltip" v-bind="forwarded">
      <slot />
    </TooltipRoot>
  </TooltipProvider>
</template>
