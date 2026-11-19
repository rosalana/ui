<script setup lang="ts">
import { computed, ref } from "vue";
import { UiCombobox, UiLabel, type ComboboxItem } from "@rosalana/ui";

type Player = { id: number; name: string; team: string };

// Stands in for the players endpoint of the real app, see the Code tab.
const everyone: Player[] = [
  { id: 1, name: "Anna Novak", team: "North Owls" },
  { id: 2, name: "Jan Svoboda", team: "River Foxes" },
  { id: 3, name: "Petra Dvorak", team: "Iron Bears" },
  { id: 4, name: "Eva Cerna", team: "North Owls" },
  { id: 5, name: "Tomas Prochazka", team: "River Foxes" },
  { id: 6, name: "Lucie Kucerova", team: "Iron Bears" },
  { id: 7, name: "Martin Vesely", team: "North Owls" },
  { id: 8, name: "Tereza Markova", team: "River Foxes" },
];

const playerId = ref<number | undefined>(3);
const players = ref<Player[]>(everyone.filter((p) => p.id === playerId.value));

type PlayerItem = ComboboxItem & { team: string; initials: string };

// The picked player is in the first results, so the name shows before any search ran.
const items = computed<PlayerItem[]>(() =>
  players.value.map((player) => ({
    value: player.id,
    label: player.name,
    team: player.team,
    initials: player.name
      .split(" ")
      .map((part) => part[0])
      .join(""),
  })),
);

async function searchPlayers(search: string, signal: AbortSignal) {
  // Simulated request: waits a moment and honours the abort signal like fetch does.
  players.value = await new Promise<Player[]>((resolve, reject) => {
    const timer = setTimeout(() => {
      const term = search.toLowerCase();
      resolve(everyone.filter((p) => p.name.toLowerCase().includes(term)).slice(0, 5));
    }, 600);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-1.5">
    <UiLabel for="captain">Team captain</UiLabel>
    <UiCombobox
      id="captain"
      v-model="playerId"
      :items="items"
      :search="searchPlayers"
      icon="lucide:user"
      placeholder="Search players..."
      clearable
    >
      <template #item="{ item }">
        <span
          class="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium"
        >
          {{ item.initials }}
        </span>
        <div class="flex min-w-0 flex-col">
          <span class="truncate">{{ item.label }}</span>
          <span class="truncate text-xs text-theme">{{ item.team }}</span>
        </div>
      </template>
      <template #empty>Nobody plays under that name.</template>
    </UiCombobox>
  </div>
</template>
