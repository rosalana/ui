<script setup lang="ts">
import { ref } from "vue";
import { UploadFiles, UiButton, UiLabel, useSonner } from "@rosalana/ui";
import type { UploadFilesRejection } from "@rosalana/ui";

const sonner = useSonner();

const files = ref<File[]>([]);
const processing = ref(false);

const reasons = {
  type: "is not a PDF or an image",
  size: "is larger than 5 MB",
  limit: "doesn't fit, 4 files at most",
};

function rejected(rejections: UploadFilesRejection[]) {
  rejections.forEach(({ file, reason }) =>
    sonner.error(`${file.name} ${reasons[reason]}`),
  );
}

// Stands in for the request the real form sends.
function submit() {
  processing.value = true;
  setTimeout(() => {
    processing.value = false;
    files.value = [];
    sonner.success("Documents sent to the organizer");
  }, 1500);
}
</script>

<template>
  <form class="flex w-full max-w-md flex-col gap-3" @submit.prevent="submit">
    <UiLabel>Team documents</UiLabel>
    <UploadFiles
      v-model="files"
      accept="application/pdf,image/*"
      :max-size="5 * 1024 * 1024"
      :max-files="4"
      title="Drop the roster and the consents"
      @rejected="rejected"
    />
    <UiButton type="submit" :loading="processing" :disabled="!files.length" class="self-end">
      Send documents
    </UiButton>
  </form>
</template>
