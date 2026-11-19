<script setup lang="ts">
import { computed, ref } from "vue";
import { UiToggleGroup, UiToggleGroupItem } from "@rosalana/ui";

const status = ref("live");

const matches = [
  { teams: "Falcons vs Wolves", status: "live" },
  { teams: "Otters vs Lynx", status: "live" },
  { teams: "Bears vs Hawks", status: "upcoming" },
  { teams: "Foxes vs Owls", status: "finished" },
];

const visible = computed(() =>
  matches.filter((match) => match.status === status.value),
);
</script>

<template>
  <div class="flex w-full max-w-sm flex-col items-center gap-4">
    <UiToggleGroup v-model="status" type="single" variant="outline" size="sm">
      <UiToggleGroupItem value="live">Live</UiToggleGroupItem>
      <UiToggleGroupItem value="upcoming">Upcoming</UiToggleGroupItem>
      <UiToggleGroupItem value="finished">Finished</UiToggleGroupItem>
    </UiToggleGroup>

    <ul class="flex w-full flex-col gap-2">
      <li v-for="match in visible" :key="match.teams" class="rounded-xl border px-4 py-2 text-sm">
        {{ match.teams }}
      </li>
    </ul>
  </div>
</template>
