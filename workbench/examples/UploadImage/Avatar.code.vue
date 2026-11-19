<script setup lang="ts">
import { router, useForm } from "@inertiajs/vue3";
import { UploadImage, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const form = useForm<{ avatar: File | null }>({ avatar: null });

// The cropped file is a plain image file, Inertia sends it as multipart form data.
function save() {
  form.post("/profile/avatar", { forceFormData: true, preserveScroll: true });
}

function remove() {
  router.delete("/profile/avatar", { preserveScroll: true });
}
</script>

<template>
  <div class="w-full max-w-sm">
    <UploadImage
      v-model="form.avatar"
      :aspect-ratio="1"
      radius="full"
      :size="512"
      filters
      :max-size="10 * 1024 * 1024"
      title="Upload a profile picture"
      @cropped="save"
      @removed="remove"
      @rejected="(file, reason) => sonner.error(reason === 'size' ? `${file.name} is larger than 10 MB` : `${file.name} is not an image`)"
    />
  </div>
</template>
