<script setup lang="ts">
import { ref } from "vue";
import { UploadImage } from "@rosalana/ui";

const photo = ref<File | null>(null);

const aspectRatios = [
  { label: "Free" },
  { label: "Square", value: 1 },
  { label: "Poster", value: 2 / 3 },
  { label: "Banner", value: 3 / 1 },
];
</script>

<template>
  <div class="w-full max-w-lg">
    <UploadImage
      v-model="photo"
      :aspect-ratios="aspectRatios"
      :radius="8"
      :rotate="false"
      :flip="false"
      title="Add a team photo"
    />
  </div>
</template>
