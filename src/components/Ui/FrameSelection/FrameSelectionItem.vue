<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
  selectionKey: string | number | undefined;
}>();

const elRef = ref<HTMLElement | null>(null);

const registerItem = inject<(el: HTMLElement) => void>(
  "registerFrameSelectionItem",
);
const unregisterItem = inject<(el: HTMLElement) => void>(
  "unregisterFrameSelectionItem",
);

onMounted(() => {
  if (elRef.value) registerItem?.(elRef.value);
});
onBeforeUnmount(() => {
  if (elRef.value) unregisterItem?.(elRef.value);
});
</script>
<template>
  <div ref="elRef" as-child :data-frame-selection-key="props.selectionKey">
    <slot />
  </div>
</template>
