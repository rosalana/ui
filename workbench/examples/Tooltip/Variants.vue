<script setup lang="ts">
import {
  UiBadge,
  UiTooltip,
  UiTooltipContent,
  UiTooltipTrigger,
} from "@rosalana/ui";

const hints = [
  { variant: "default", label: "Scheduled", text: "Starts on Saturday at 10:00." },
  { variant: "info", label: "Seeding", text: "Teams are seeded by last season's ranking." },
  { variant: "success", label: "Checked in", text: "All 12 teams are ready to play." },
  { variant: "warning", label: "Waiting", text: "2 teams have not checked in yet." },
  { variant: "destructive", label: "Disqualified", text: "Red Foxes missed two matches." },
] as const;
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3">
    <UiTooltip v-for="hint in hints" :key="hint.variant">
      <UiTooltipTrigger as-child>
        <UiBadge :tabindex="0" variant="outline">{{ hint.label }}</UiBadge>
      </UiTooltipTrigger>
      <UiTooltipContent :variant="hint.variant">{{ hint.text }}</UiTooltipContent>
    </UiTooltip>
  </div>
</template>
