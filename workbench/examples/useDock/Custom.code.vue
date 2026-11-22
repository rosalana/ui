<script setup lang="ts">
import { h, ref } from "vue";
import { router } from "@inertiajs/vue3";
import { UiButton, UiIcon, useDock } from "@rosalana/ui";

const props = defineProps<{
  album: { id: number };
  photos: File[];
}>();

const progress = ref<number | null>(null);
let cancelToken: { cancel: () => void } | undefined;

// The flash message of the response confirms the upload as a toast.
function upload() {
  progress.value = 0;
  router.post(
    `/albums/${props.album.id}/photos`,
    { photos: props.photos },
    {
      forceFormData: true,
      onCancelToken: (token) => (cancelToken = token),
      onProgress: (event) => (progress.value = event?.percentage ?? 0),
      onFinish: () => (progress.value = null),
    },
  );
}

// The content is the app's own: a progress bar the message dock doesn't have.
useDock(
  () => progress.value !== null,
  () =>
    h("div", { class: "grid gap-3" }, [
      h("div", { class: "flex items-center gap-3" }, [
        h(UiIcon, { name: "lucide:upload", class: "size-4 text-theme" }),
        h("p", { class: "flex-1 text-sm font-medium" }, `Uploading ${props.photos.length} photos`),
        h("span", { class: "text-xs tabular-nums text-theme" }, `${progress.value}%`),
      ]),
      h("div", { class: "h-1.5 overflow-hidden rounded-full bg-primary/15" }, [
        h("div", {
          class: "h-full rounded-full bg-primary transition-[width] duration-150",
          style: { width: `${progress.value}%` },
        }),
      ]),
      h("div", { class: "flex justify-end" }, [
        h(UiButton, { size: "sm", variant: "ghost", onClick: () => cancelToken?.cancel() }, () => "Cancel"),
      ]),
    ]),
);
</script>

<template>
  <div class="grid w-full max-w-sm gap-3 rounded-xl border p-4">
    <ul class="grid gap-1.5 text-sm">
      <li v-for="photo in props.photos" :key="photo.name" class="flex items-center gap-2">
        <UiIcon name="lucide:image" class="size-4 text-theme" />
        {{ photo.name }}
      </li>
    </ul>
    <UiButton :disabled="progress !== null" @click="upload" size="sm">
      <UiIcon name="lucide:upload" />
      Upload photos
    </UiButton>
  </div>
</template>
