<script setup lang="ts">
import { addLocalIcons, UiIcon } from "@rosalana/ui";

// In an app, pass these as `icons` to createRosalanaApp instead.
addLocalIcons({
  "single-elimination":
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h5v4H3zM3 15h5v4H3zM16 10h5v4h-5zM8 7h4v10H8M12 12h4"/></svg>',
  "diamond":
    '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 22 12 12 22 2 12Z"/></svg>',
});
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <UiIcon name="local:single-elimination" class="size-8" />
    <UiIcon name="local:diamond" class="size-8 text-primary" />
  </div>
</template>
