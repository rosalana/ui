<script setup lang="ts">
import { ref, computed, watch, type HTMLAttributes, onMounted, onUnmounted } from "vue";
import { tv } from "tailwind-variants";
import { useGradient } from "../../../composables/useGradient";

// open source gradient maker:

// https://kevingrajeda.github.io/meshGradient/

// https://github.com/KevinGrajeda/meshGradient/tree/main/src/components

const avatarGradient = tv({
  base: "aspect-square size-full overflow-hidden",
});

interface Props {
  class?: HTMLAttributes["class"];
  /** Seed for deterministic gradient generation */
  seed?: string | number;
  /** Render mode - canvas for animations, image for static display */
//   mode?: "canvas" | "image";
  /** Progress for animation (0-100) */
  progress?: number;
}

const props = withDefaults(defineProps<Props>(), {
//   mode: "canvas",
  progress: 100,
});

// Stable seed - random if not provided
const stableSeed = computed(() => {
  if (props.seed !== undefined) return props.seed;
  return Math.floor(Math.random() * 1000000);
});

const canvasRef = ref<HTMLCanvasElement | null>(null);

// Use composable for canvas mode
const gradient = useGradient({
  seed: stableSeed.value,
  canvas: canvasRef,
  progress: props.progress,
});

onMounted(() => {
    gradient.render();
});

onUnmounted(() => {
    gradient.destroy();
});
</script>

<template>
  <div
    data-slot="avatar-gradient"
    :class="[avatarGradient({ class: props.class })]"
  >
    <canvas ref="canvasRef" class="size-full" />
  </div>
</template>
