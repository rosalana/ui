<script setup lang="ts">
import { UiBadge, UiCard, UiCardContent } from "@rosalana/ui";

const matches = [
  { teams: "Night Owls vs Red Foxes", status: "Live", variant: "destructive", icon: "lucide:radio" },
  { teams: "Blue Herons vs Iron Wolves", status: "Today 18:00", variant: "info", icon: "lucide:clock" },
  { teams: "Silver Hawks vs Wild Cats", status: "Finished", variant: "success", icon: "lucide:check" },
] as const;
</script>

<template>
  <UiCard class="w-full max-w-md">
    <UiCardContent class="flex flex-col divide-y divide-border p-0">
      <div v-for="match in matches" :key="match.teams" class="flex items-center justify-between gap-3 px-5 py-3 text-sm">
        <span class="font-medium">{{ match.teams }}</span>
        <UiBadge :variant="match.variant" :icon="match.icon" size="sm">{{ match.status }}</UiBadge>
      </div>
    </UiCardContent>
  </UiCard>
</template>
