<script setup lang="ts">
import { ref, computed, watch, type HTMLAttributes, onMounted, onUnmounted, watchEffect } from "vue";
import { tv } from "tailwind-variants";
import { useGradient } from "../../../composables/useGradient";

/**
 * https://kevingrajeda.github.io/meshGradient/
 * https://github.com/KevinGrajeda/meshGradient/tree/main/src/components
 */

const avatarGradient = tv({
  base: "aspect-square size-full overflow-hidden",
});

interface Props {
  class?: HTMLAttributes["class"];
  /** Seed for deterministic gradient generation */
  seed?: string | number;
  /** Render mode - canvas for animations, image for static display */
  mode?: "canvas" | "image";
  /** Progress for animation (0-100) */
  progress?: number;
}

const props = withDefaults(defineProps<Props>(), {
  mode: "canvas",
  progress: 100,
});

// Stable seed - random if not provided
const stableSeed = computed(() => {
  if (props.seed !== undefined) return props.seed;
  return Math.floor(Math.random() * 1000000);
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
const imageUrl = ref<string>("");

// Use composable for canvas mode
const gradient = useGradient({
  seed: stableSeed.value,
  canvas: canvasRef,
  progress: props.progress,
});

onMounted(() => {
    if (props.mode === "canvas") {
      gradient.render();
    } else {
      gradient.toImage(500, 500).then((url) => {
        imageUrl.value = url;
      });
    }
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
    <canvas v-if="mode === 'canvas'" ref="canvasRef" class="size-full" />
    <img
      v-else
      :src="imageUrl"
      alt="Avatar Gradient"
      class="size-full object-cover"
    />
  </div>
</template>
