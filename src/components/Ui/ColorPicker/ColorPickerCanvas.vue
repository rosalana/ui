<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef, watch, computed } from "vue";
import { Sandbox } from "@rosalana/sandbox";
import pickerFrag from "./picker.frag?raw";
import { type HSVA } from "../../../composables/useColorConverter";

const props = defineProps<{
  modelValue: HSVA;
}>();

const emit = defineEmits(["update:modelValue"]);

const picker = ref({ x: 0, y: 0 }); // x = saturation, y = value

const color = computed<HSVA>({
  get() {
    picker.value.x = props.modelValue?.s ?? 0;
    picker.value.y = props.modelValue?.v ?? 0;
    return props.modelValue;
  },
  set(newColor) {
    emit("update:modelValue", newColor);
  },
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
const sandbox = shallowRef<Sandbox | null>(null);

onMounted(() => {
  if (!canvasRef.value) return;

  // Initialize the WebGL sandbox
  sandbox.value = Sandbox.create(canvasRef.value, {
    fragment: pickerFrag,
    uniforms: {
      u_hue: color.value.h,
    },
    autoplay: false,
  });

  sandbox.value.render();
});

const isDragging = ref(false);

watch(
  () => color.value.h,
  (newHue) => {
    if (!sandbox.value) return;

    sandbox.value.setUniform("u_hue", newHue);
    sandbox.value.render();
  },
);

onUnmounted(() => {
  sandbox.value?.destroy();
  document.removeEventListener("mousemove", onDocMouseMove);
  document.removeEventListener("mouseup", onDocMouseUp);
});

function onCanvasMouseDown(e: MouseEvent) {
  isDragging.value = true;
  updateFromCanvas(e);
  document.addEventListener("mousemove", onDocMouseMove);
  document.addEventListener("mouseup", onDocMouseUp);
}

function onDocMouseMove(e: MouseEvent) {
  if (!isDragging.value) return;
  e.preventDefault();
  updateFromCanvas(e);
}

function onDocMouseUp() {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDocMouseMove);
  document.removeEventListener("mouseup", onDocMouseUp);
}

function updateFromCanvas(e: MouseEvent) {
  const el = canvasRef.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  picker.value.x = Math.max(
    0,
    Math.min(100, ((e.clientX - rect.left) / rect.width) * 100),
  );
  picker.value.y = Math.max(
    0,
    Math.min(100, (1 - (e.clientY - rect.top) / rect.height) * 100),
  );

  color.value = {
    ...color.value,
    s: picker.value.x,
    v: picker.value.y,
  };
}
</script>
<template>
  <div
    class="relative select-none overflow-hidden rounded-lg"
    style="height: 176px; width: 260px"
  >
    <canvas
      ref="canvasRef"
      class="h-full w-full cursor-crosshair"
      @mousedown.prevent="onCanvasMouseDown"
    />
    <!-- Selector dot -->
    <div
      class="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
      :style="{
        left: `${picker.x}%`,
        top: `${100 - picker.y}%`,
      }"
    />
  </div>
</template>
