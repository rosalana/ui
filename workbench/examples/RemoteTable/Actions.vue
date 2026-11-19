<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RemoteTable, useSonner, type Column } from "@rosalana/ui";

type Player = { id: number; name: string; team: string; goals: number };

const sonner = useSonner();

const roster: Player[] = [
  { id: 1, name: "Anna Nováková", team: "Falcons", goals: 12 },
  { id: 2, name: "Jan Dvořák", team: "Wolves", goals: 9 },
  { id: 3, name: "Eva Králová", team: "Ravens", goals: 7 },
  { id: 4, name: "Petr Svoboda", team: "Tigers", goals: 4 },
];

const columns: Column<Player>[] = [
  { key: "name", header: "Player", toggleable: false },
  { key: "team", header: "Team" },
  { key: "goals", header: "Goals" },
];

const players = ref<Player[]>([]);
const loading = ref(true);

// Stands in for the request that reloads the page from the server.
function load() {
  loading.value = true;
  setTimeout(() => {
    players.value = [...roster];
    loading.value = false;
  }, 700);
}

// Stands in for the delete request, followed by a reload of the page.
function remove(player: Player) {
  const index = roster.findIndex((item) => item.id === player.id);
  roster.splice(index, 1);
  sonner.success(`${player.name} removed from the roster`);
  load();
}

onMounted(load);
</script>

<template>
  <RemoteTable
    class="w-full"
    :data="players"
    :total="players.length"
    :columns="columns"
    row-key="id"
    :loading="loading"
    :show-search="false"
    :paginate="false"
    :header-actions="(isLoading) => [{ label: 'Refresh', icon: 'lucide:refresh-cw', disabled: isLoading.value, onClick: load }]"
    :row-actions="
      (player) => [
        { label: 'View profile', icon: 'lucide:user', onClick: () => sonner.info(`Opening ${player.name}`) },
        { divider: true },
        { label: 'Remove from roster', icon: 'lucide:trash-2', class: 'text-destructive', onClick: () => remove(player) },
      ]
    "
  >
    <template #empty-state>The roster is empty. Invite players to join the team.</template>
  </RemoteTable>
</template>
