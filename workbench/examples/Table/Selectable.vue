<script setup lang="ts">
import { computed, ref } from "vue";
import {
  UiButton,
  UiCheckbox,
  UiTable,
  UiTableBody,
  UiTableCell,
  UiTableHead,
  UiTableHeader,
  UiTableRow,
  useSonner,
} from "@rosalana/ui";

const sonner = useSonner();

const teams = [
  { id: 1, name: "Falcons", captain: "Anna Nováková", players: 9 },
  { id: 2, name: "Wolves", captain: "Jan Dvořák", players: 11 },
  { id: 3, name: "Ravens", captain: "Eva Králová", players: 8 },
  { id: 4, name: "Tigers", captain: "Petr Svoboda", players: 10 },
];

const selected = ref<number[]>([]);

const allSelected = computed<boolean | "indeterminate">(() =>
  selected.value.length === teams.length
    ? true
    : selected.value.length > 0
      ? "indeterminate"
      : false,
);

function toggleAll() {
  selected.value = selected.value.length === teams.length ? [] : teams.map((team) => team.id);
}

function toggle(id: number) {
  selected.value = selected.value.includes(id)
    ? selected.value.filter((item) => item !== id)
    : [...selected.value, id];
}

function invite() {
  sonner.success(`${selected.value.length} captains invited`);
  selected.value = [];
}
</script>

<template>
  <div class="w-full space-y-4">
    <UiTable>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-10 pl-4">
            <UiCheckbox
              :model-value="allSelected"
              aria-label="Select all teams"
              @update:model-value="toggleAll"
            />
          </UiTableHead>
          <UiTableHead>Team</UiTableHead>
          <UiTableHead>Captain</UiTableHead>
          <UiTableHead class="pr-4 text-right">Players</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow
          v-for="team in teams"
          :key="team.id"
          :data-state="selected.includes(team.id) ? 'selected' : undefined"
        >
          <UiTableCell class="pl-4">
            <UiCheckbox
              :model-value="selected.includes(team.id)"
              :aria-label="`Select ${team.name}`"
              @update:model-value="toggle(team.id)"
            />
          </UiTableCell>
          <UiTableCell class="font-medium">{{ team.name }}</UiTableCell>
          <UiTableCell class="text-theme">{{ team.captain }}</UiTableCell>
          <UiTableCell class="pr-4 text-right">{{ team.players }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
    <div class="flex items-center justify-between gap-3">
      <span class="text-sm text-theme">{{ selected.length }} of {{ teams.length }} teams selected</span>
      <UiButton :disabled="!selected.length" @click="invite">Invite captains</UiButton>
    </div>
  </div>
</template>
