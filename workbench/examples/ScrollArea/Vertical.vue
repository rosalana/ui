<script setup lang="ts">
import { UiScrollArea, UiSeparator } from "@rosalana/ui";

const teams = [
  "Falcons", "Otters", "Wolves", "Lynxes", "Herons", "Bears", "Foxes", "Hawks",
  "Badgers", "Ravens", "Stags", "Pikes",
];
</script>

<template>
  <UiScrollArea class="h-56 w-64 rounded-xl border">
    <div class="p-4">
      <h4 class="mb-3 text-sm font-semibold">Registered teams</h4>
      <template v-for="(team, index) in teams" :key="team">
        <div class="text-sm">{{ team }}</div>
        <UiSeparator v-if="index < teams.length - 1" class="my-2" />
      </template>
    </div>
  </UiScrollArea>
</template>
