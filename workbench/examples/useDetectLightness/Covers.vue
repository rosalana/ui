<script setup lang="ts">
import { ref } from "vue";
import { UiButton, UiIcon, useDetectLightness } from "@rosalana/ui";

// Same-origin covers; an image from another host needs CORS headers to be sampled.
const svg = (from: string, to: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="320" height="180" fill="url(#g)"/></svg>`,
  )}`;

const covers = [
  { title: "Summer Cup", date: "June 14 to 16", src: svg("#fde68a", "#fef9c3") },
  { title: "Night League", date: "Every Friday, 21:00", src: svg("#1e1b4b", "#312e81") },
  { title: "Autumn Open", date: "October 3 to 5", src: svg("#fb923c", "#f59e0b") },
];

const index = ref(0);
const image = ref<HTMLElement | null>(null);
// Sampling runs again whenever the image element or the index changes.
const { isLight } = useDetectLightness(image, index);

function next() {
  index.value = (index.value + 1) % covers.length;
}
</script>

<template>
  <div class="w-full max-w-sm space-y-3">
    <div class="relative overflow-hidden rounded-2xl">
      <img
        ref="image"
        :src="covers[index].src"
        alt=""
        class="aspect-video w-full object-cover"
      />
      <div
        class="absolute inset-0 flex flex-col justify-end p-4 transition-colors"
        :class="isLight ? 'text-neutral-900' : 'text-white'"
      >
        <h3 class="text-lg font-semibold">{{ covers[index].title }}</h3>
        <p class="text-sm opacity-80">{{ covers[index].date }}</p>
      </div>
    </div>
    <UiButton variant="outline" class="w-full" @click="next">
      Next tournament
      <UiIcon name="lucide:arrow-right" />
    </UiButton>
  </div>
</template>
