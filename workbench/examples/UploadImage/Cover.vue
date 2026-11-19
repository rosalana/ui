<script setup lang="ts">
import { ref } from "vue";
import { UploadImage } from "@rosalana/ui";

const cover = ref<File | null>(null);
</script>

<template>
  <div class="w-full max-w-lg">
    <UploadImage
      v-model="cover"
      :aspect-ratio="16 / 9"
      radius="xl"
      :size="1600"
      format="image/jpeg"
      :quality="0.85"
      :filters="['brightness', 'contrast']"
      :presets="false"
      title="Upload a tournament cover"
      subtext="Wide photos work best"
    />
  </div>
</template>
