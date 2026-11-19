<script setup lang="ts">
import { computed, ref } from "vue";
import { UiCombobox, UiLabel, type ComboboxItem } from "@rosalana/ui";

type Player = { id: number; name: string; team: string };

// The form holds just the id; the page passes the picked player so it can be shown.
const props = defineProps<{ captain: Player }>();

const playerId = ref<number | undefined>(props.captain.id);
const players = ref<Player[]>([props.captain]);

type PlayerItem = ComboboxItem & { team: string; initials: string };

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

// Called debounced while typing and once when the list opens. A newer search aborts the
// older one through the signal, so a slow answer never overwrites a newer one.
async function searchPlayers(search: string, signal: AbortSignal) {
  const response = await fetch(`/players?search=${encodeURIComponent(search)}`, {
    signal,
    headers: { Accept: "application/json" },
  });
  players.value = await response.json();
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
