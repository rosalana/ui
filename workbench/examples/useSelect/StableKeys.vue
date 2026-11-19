<script setup lang="ts">
import { ref } from "vue";
import { UiButton, UiCheckbox, UiLabel, useSelect } from "@rosalana/ui";

type Match = { id: number; name: string; score: string };

const matches = ref<Match[]>([
  { id: 1, name: "Falcons vs. Wolves", score: "0 : 0" },
  { id: 2, name: "Ravens vs. Tigers", score: "0 : 0" },
  { id: 3, name: "Sharks vs. Bears", score: "0 : 0" },
]);

// getKey keeps a match selected when the list is replaced by fresh objects.
const { selected, select, isSelected } = useSelect(matches, { getKey: (match) => match.id });

// Stands in for the reload of the live scores from the server.
function refresh() {
  matches.value = matches.value.map((match) => ({
    ...match,
    score: `${Math.floor(Math.random() * 4)} : ${Math.floor(Math.random() * 4)}`,
  }));
}
</script>

<template>
  <div class="w-full max-w-sm space-y-4">
    <ul class="divide-y divide-border rounded-xl border">
      <li v-for="match in matches" :key="match.id" class="flex items-center gap-3 px-4 py-3">
        <UiCheckbox
          :id="`match-${match.id}`"
          :model-value="isSelected(match)"
          @update:model-value="select(match, 'ctrl')"
        />
        <UiLabel :for="`match-${match.id}`" class="flex-1">{{ match.name }}</UiLabel>
        <span class="text-sm text-theme">{{ match.score }}</span>
      </li>
    </ul>
    <div class="flex items-center justify-between gap-3">
      <span class="text-sm text-theme">{{ selected.length }} followed</span>
      <UiButton variant="outline" size="sm" @click="refresh">Refresh scores</UiButton>
    </div>
  </div>
</template>
