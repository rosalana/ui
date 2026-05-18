<script setup lang="ts">
import { provide, ref, watch } from "vue";

const props = defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits([
  "start:selection",
  "update:selection",
  "end:selection",
  "selecting",
]);

const startX = ref(0);
const startY = ref(0);
const endX = ref(0);
const endY = ref(0);
const isSelecting = ref(false);
const maybeSelecting = ref(false);

watch(isSelecting, (isSelecting) => {
  emit("selecting", isSelecting);
});

const registeredItems = ref<HTMLElement[]>([]);

provide("registerFrameSelectionItem", (el: HTMLElement) => {
  registeredItems.value.push(el);
});
provide("unregisterFrameSelectionItem", (el: HTMLElement) => {
  registeredItems.value = registeredItems.value.filter((item) => item !== el);
});

const handleStart = (event: MouseEvent) => {
  if (props.disabled) return;
  startX.value = event.clientX;
  startY.value = event.clientY;
  endX.value = event.clientX;
  endY.value = event.clientY;
  maybeSelecting.value = true;
};

const handleMove = (event: MouseEvent) => {
  if (!maybeSelecting.value) return;
  endX.value = event.clientX;
  endY.value = event.clientY;
  if (
    !isSelecting.value &&
    (Math.abs(endX.value - startX.value) > 10 ||
      Math.abs(endY.value - startY.value) > 10)
  ) {
    isSelecting.value = true;
    emit("start:selection", event);
  }

  if (isSelecting.value) {
    const box = getSelectionBox();
    const selected = registeredItems.value.filter((el) =>
      isElementInBox(el, box),
    );
    const selectedKeys = selected.map((el) => el.dataset.frameSelectionKey);

    emit(
      "update:selection",
      {
        startX: startX.value,
        startY: startY.value,
        endX: endX.value,
        endY: endY.value,
        selected,
        selectedKeys,
      },
      event,
    );
  }
};

const handleEnd = () => {
  const box = getSelectionBox();
  const selected = registeredItems.value.filter((el) =>
    isElementInBox(el, box),
  );
  const selectedKeys = selected.map((el) => el.dataset.frameSelectionKey);
  setTimeout(() => {
    emit("end:selection", {
      startX: startX.value,
      startY: startY.value,
      endX: endX.value,
      endY: endY.value,
      selected,
      selectedKeys,
    });
    isSelecting.value = false;
    maybeSelecting.value = false;
  }, 0);
};

const getSelectionBox = () => {
  return new DOMRect(
    Math.min(startX.value, endX.value),
    Math.min(startY.value, endY.value),
    Math.abs(endX.value - startX.value),
    Math.abs(endY.value - startY.value),
  );
};

const isElementInBox = (el: HTMLElement, box: DOMRect) => {
  const rect = el.getBoundingClientRect();
  return !(
    rect.right < box.left ||
    rect.left > box.right ||
    rect.bottom < box.top ||
    rect.top > box.bottom
  );
};
</script>
<template>
  <div @mousedown="handleStart" @mousemove="handleMove" @mouseup="handleEnd">
    <div
      class="fixed w-full h-full z-50 pointer-events-none bg-primary/5 border"
      :style="{
        left: Math.min(startX, endX) + 'px',
        top: Math.min(startY, endY) + 'px',
        width: Math.abs(endX - startX) + 'px',
        height: Math.abs(endY - startY) + 'px',
        display: isSelecting ? 'block' : 'none',
      }"
    />
    <slot />
  </div>
</template>
