<script setup lang="ts">
import { ref } from "vue";
import { UploadImage, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const logo = ref<File | null>(null);

// An inline picture, in an app this is the URL of the saved logo.
const current = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#6366f1"/><text x="150" y="190" font-family="sans-serif" font-size="120" font-weight="700" fill="white" text-anchor="middle">F</text></svg>`,
)}`;
</script>

<template>
  <div class="w-full max-w-sm">
    <UploadImage
      v-model="logo"
      :src="current"
      :aspect-ratio="1"
      radius="xl"
      title="Change the team logo"
      @cropped="sonner.success('Logo ready to save')"
      @removed="sonner.default('Logo removed')"
    />
  </div>
</template>
