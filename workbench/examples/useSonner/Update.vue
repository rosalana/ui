<script setup lang="ts">
import { ref } from "vue";
import { UiButton, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const uploading = ref(false);

// Showing a toast with an existing id updates it in place, so one toast follows the whole upload.
function upload() {
  uploading.value = true;
  const id = "upload-photos";
  const total = 4;
  let done = 0;

  sonner.loading(`Uploading photos 0/${total}`, { id, duration: Infinity, dismissible: false });

  const timer = setInterval(() => {
    done++;
    if (done < total) {
      sonner.loading(`Uploading photos ${done}/${total}`, { id, duration: Infinity, dismissible: false });
      return;
    }
    clearInterval(timer);
    sonner.success("Photos uploaded", { id, description: "The gallery of the final is ready." });
    uploading.value = false;
  }, 900);
}
</script>

<template>
  <UiButton :loading="uploading" @click="upload">Upload final photos</UiButton>
</template>
