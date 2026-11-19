<script setup lang="ts">
import { UiAvatar, UiAvatarFallback, UiChip } from "@rosalana/ui";

const variants = ["default", "secondary", "destructive", "success", "warning", "info", "neutral"] as const;
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-5">
    <UiChip v-for="variant in variants" :key="variant" :variant="variant">
      <UiAvatar><UiAvatarFallback>{{ variant.slice(0, 2).toUpperCase() }}</UiAvatarFallback></UiAvatar>
    </UiChip>
    <UiChip color="violet">
      <UiAvatar><UiAvatarFallback>VI</UiAvatarFallback></UiAvatar>
    </UiChip>
  </div>
</template>
