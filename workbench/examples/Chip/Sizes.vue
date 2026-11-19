<script setup lang="ts">
import { UiAvatar, UiAvatarFallback, UiChip } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <UiChip size="sm" variant="success">
      <UiAvatar size="lg"><UiAvatarFallback>AB</UiAvatarFallback></UiAvatar>
    </UiChip>
    <UiChip variant="success">
      <UiAvatar size="lg"><UiAvatarFallback>AB</UiAvatarFallback></UiAvatar>
    </UiChip>
    <UiChip size="lg" variant="success">
      <UiAvatar size="lg"><UiAvatarFallback>AB</UiAvatarFallback></UiAvatar>
    </UiChip>
  </div>
</template>
