<script setup lang="ts">
import type { HoverCardRootEmits, HoverCardRootProps } from "reka-ui";
import { HoverCardRoot, useForwardPropsEmits } from "reka-ui";

const props = withDefaults(defineProps<HoverCardRootProps>(), {
  openDelay: 200,
  closeDelay: 200,
});
const emit = defineEmits<HoverCardRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <HoverCardRoot data-slot="hover-card" v-bind="forwarded">
    <slot />
  </HoverCardRoot>
</template>
