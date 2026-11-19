<script setup lang="ts">
import { UiBadge, useDate } from "@rosalana/ui";

const date = useDate();

// Moments come from the server in UTC.
const matches = [
  { id: 1, name: "Falcons vs. Wolves", starts_at: "2026-12-12T17:00:00Z" },
  { id: 2, name: "Ravens vs. Tigers", starts_at: "2026-12-12T18:30:00Z" },
  { id: 3, name: "Sharks vs. Bears", starts_at: "2026-12-13T16:00:00Z" },
];
</script>

<template>
  <ul class="w-full max-w-md divide-y divide-border rounded-xl border">
    <li v-for="match in matches" :key="match.id" class="flex items-center gap-3 px-4 py-3">
      <div class="flex-1">
        <p class="text-sm font-medium">{{ match.name }}</p>
        <p class="text-xs text-theme">
          {{ date.format(match.starts_at, { dateStyle: "medium", timeStyle: "short" }) }}
        </p>
      </div>
      <!-- Empty on the server: now is known only in the browser -->
      <UiBadge v-if="date.now.value" size="sm" variant="outline">
        {{ date.diffForHumans(match.starts_at) }}
      </UiBadge>
    </li>
  </ul>
</template>
