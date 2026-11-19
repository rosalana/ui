<script setup lang="ts">
import { ref, watch } from "vue";
import { UiInput, UiLabel } from "@rosalana/ui";

const nickname = ref("");
const players = ref<number | string>(12);
const query = ref("");
const results = ref<string[]>([]);

const teams = ["Kingsley Hawks", "Harbor Owls", "Northside Foxes", "Hilltop Bears"];

// Runs once typing pauses, thanks to .debounce.
watch(query, (value) => {
  results.value = value ? teams.filter((t) => t.toLowerCase().includes(value.toLowerCase())) : [];
});
</script>

<template>
  <div class="grid w-full max-w-sm gap-5">
    <div class="grid gap-2">
      <UiLabel for="nickname">Nickname (.trim)</UiLabel>
      <UiInput id="nickname" v-model.trim="nickname" placeholder="Leading spaces are dropped" />
    </div>

    <div class="grid gap-2">
      <UiLabel for="roster-size">Roster size (.number)</UiLabel>
      <UiInput id="roster-size" v-model.number="players" type="number" min="1" max="30" />
      <p class="text-sm text-theme">Model type: {{ typeof players }}</p>
    </div>

    <div class="grid gap-2">
      <UiLabel for="team-search">Find a team (.debounce)</UiLabel>
      <UiInput id="team-search" v-model.debounce="query" icon="lucide:search" placeholder="Type a team name" />
      <p class="text-sm text-theme">{{ results.length ? results.join(", ") : "No search yet" }}</p>
    </div>
  </div>
</template>
