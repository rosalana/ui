<script setup lang="ts">
import { UiAvatar, UiAvatarFallback, UiChip } from "@rosalana/ui";

const positions = ["top-right", "bottom-right", "top-left", "bottom-left"] as const;
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <UiChip v-for="position in positions" :key="position" :position="position" inset variant="success">
      <UiAvatar size="lg"><UiAvatarFallback>MK</UiAvatarFallback></UiAvatar>
    </UiChip>
    <UiChip position="top-right" variant="info">
      <UiAvatar size="lg"><UiAvatarFallback>MK</UiAvatarFallback></UiAvatar>
    </UiChip>
  </div>
</template>
