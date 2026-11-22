<script setup lang="ts">
import { h, ref } from "vue";
import { UiButton, UiIcon, useDock, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const photos = ["final-whistle.jpg", "trophy-lift.jpg", "team-photo.jpg"];
const progress = ref<number | null>(null);
let timer: ReturnType<typeof setInterval> | undefined;

// Stands in for the upload; the app reads the progress from the request.
function upload() {
  progress.value = 0;
  timer = setInterval(() => {
    progress.value = Math.min(100, (progress.value ?? 0) + 4);
    if (progress.value < 100) return;
    clearInterval(timer);
    progress.value = null;
    sonner.success(`${photos.length} photos uploaded`);
  }, 120);
}

function cancel() {
  clearInterval(timer);
  progress.value = null;
  sonner.info("Upload canceled");
}

// The content is the app's own: a progress bar the message dock doesn't have.
useDock(
  () => progress.value !== null,
  () =>
    h("div", { class: "grid gap-3" }, [
      h("div", { class: "flex items-center gap-3" }, [
        h(UiIcon, { name: "lucide:upload", class: "size-4 text-theme" }),
        h("p", { class: "flex-1 text-sm font-medium" }, `Uploading ${photos.length} photos`),
        h("span", { class: "text-xs tabular-nums text-theme" }, `${progress.value}%`),
      ]),
      h("div", { class: "h-1.5 overflow-hidden rounded-full bg-primary/15" }, [
        h("div", {
          class: "h-full rounded-full bg-primary transition-[width] duration-150",
          style: { width: `${progress.value}%` },
        }),
      ]),
      h("div", { class: "flex justify-end" }, [
        h(UiButton, { size: "sm", variant: "ghost", onClick: cancel }, () => "Cancel"),
      ]),
    ]),
);
</script>

<template>
  <div class="grid w-full max-w-sm gap-3 rounded-xl border p-4">
    <ul class="grid gap-1.5 text-sm">
      <li v-for="photo in photos" :key="photo" class="flex items-center gap-2">
        <UiIcon name="lucide:image" class="size-4 text-theme" />
        {{ photo }}
      </li>
    </ul>
    <UiButton :disabled="progress !== null" @click="upload" size="sm">
      <UiIcon name="lucide:upload" />
      Upload photos
    </UiButton>
  </div>
</template>
