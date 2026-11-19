<script setup lang="ts">
import { UiAvatar, UiAvatarFallback, UiAvatarImage } from "@rosalana/ui";

// A small inline picture, so the example needs no network.
const photo =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#f59e0b"/><circle cx="32" cy="25" r="11" fill="#fff"/><path d="M10 64a22 22 0 0 1 44 0Z" fill="#fff"/></svg>',
  );
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4">
    <UiAvatar size="sm">
      <UiAvatarImage :src="photo" alt="Ada Lovelace" />
      <UiAvatarFallback name="Ada Lovelace" />
    </UiAvatar>
    <UiAvatar>
      <UiAvatarImage :src="photo" alt="Ada Lovelace" />
      <UiAvatarFallback name="Ada Lovelace" />
    </UiAvatar>
    <UiAvatar size="lg">
      <UiAvatarImage :src="photo" alt="Ada Lovelace" />
      <UiAvatarFallback name="Ada Lovelace" />
    </UiAvatar>
    <UiAvatar size="xl">
      <UiAvatarImage :src="photo" alt="Ada Lovelace" />
      <UiAvatarFallback name="Ada Lovelace" />
    </UiAvatar>
  </div>
</template>
