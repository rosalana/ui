<script setup lang="ts">
import { ref } from "vue";
import { UiAvatar, UiAvatarFallback, UiAvatarImage, UiAvatarLoading, UiButton } from "@rosalana/ui";

const photo =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#14b8a6"/><circle cx="32" cy="25" r="11" fill="#fff"/><path d="M10 64a22 22 0 0 1 44 0Z" fill="#fff"/></svg>',
  );

const uploading = ref(false);

// Stands in for the request that uploads the new picture.
function upload() {
  uploading.value = true;
  setTimeout(() => (uploading.value = false), 1500);
}
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <UiAvatar size="xl">
      <UiAvatarImage :src="photo" alt="Your profile picture" />
      <UiAvatarFallback name="Ada Lovelace" />
      <UiAvatarLoading :loading="uploading" />
    </UiAvatar>
    <UiButton variant="outline" size="sm" :loading="uploading" @click="upload">
      Change picture
    </UiButton>
  </div>
</template>
