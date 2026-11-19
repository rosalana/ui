<script setup lang="ts">
import { UiAspectRatio, UiBadge } from "@rosalana/ui";
</script>

<template>
  <article class="w-full max-w-sm space-y-3">
    <UiAspectRatio :ratio="16 / 9" class="overflow-hidden rounded-2xl">
      <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23f59e0b'/%3E%3Ccircle cx='120' cy='25' r='14' fill='%23fde68a'/%3E%3Cpath d='M0 90V60l40-25 35 30 30-20 55 35v10z' fill='%23b45309'/%3E%3C/svg%3E"
        alt="Sunrise over the mountains where the tournament takes place"
        class="size-full object-cover"
      />
    </UiAspectRatio>
    <div class="flex items-center justify-between gap-3">
      <h3 class="font-semibold">Mountain Open 2026</h3>
      <UiBadge>Registration open</UiBadge>
    </div>
  </article>
</template>
