<script setup lang="ts">
import { ref } from "vue";
import { UploadImage, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const avatar = ref<File | null>(null);

// Stands in for the request the real form sends.
function save(file: File) {
  setTimeout(() => sonner.success("Profile picture saved"), 600);
}
</script>

<template>
  <div class="w-full max-w-sm">
    <UploadImage
      v-model="avatar"
      :aspect-ratio="1"
      radius="full"
      :size="512"
      filters
      :max-size="10 * 1024 * 1024"
      title="Upload a profile picture"
      @cropped="save"
      @rejected="(file, reason) => sonner.error(reason === 'size' ? `${file.name} is larger than 10 MB` : `${file.name} is not an image`)"
    />
  </div>
</template>
