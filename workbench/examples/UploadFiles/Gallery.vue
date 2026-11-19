<script setup lang="ts">
import { ref } from "vue";
import { UploadFiles, UiLabel, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const photos = ref<File[]>([]);
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <UiLabel>Tournament photos</UiLabel>
    <UploadFiles
      v-model="photos"
      accept="image/*"
      icon="lucide:image-up"
      title="Add photos from the finals"
      :max-files="6"
      :max-size="3 * 1024 * 1024"
      @added="sonner.success(`${$event.length} photo${$event.length === 1 ? '' : 's'} added`)"
      @removed="sonner.default(`${$event.name} removed`)"
      @rejected="sonner.error('Only images up to 3 MB, 6 at most')"
    />
  </div>
</template>
