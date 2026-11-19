<script setup lang="ts">
import { ref } from "vue";
import { UploadImage } from "@rosalana/ui";

const photo = ref<File | null>(null);
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <UploadImage
      v-model="photo"
      :aspect-ratio="1"
      radius="full"
      skip-editor
      title="Drop a photo, crop it later"
    />
    <UploadImage disabled title="Photos are locked" subtext="The team is archived" />
  </div>
</template>
