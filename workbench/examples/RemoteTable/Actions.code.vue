<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import { RemoteTable, type Column } from "@rosalana/ui";

type Player = { id: number; name: string; team: string; goals: number };

const props = defineProps<{ players: Player[] }>();

const columns: Column<Player>[] = [
  { key: "name", header: "Player", toggleable: false },
  { key: "team", header: "Team" },
  { key: "goals", header: "Goals" },
];

function refresh() {
  router.reload({ only: ["players"] });
}

// The flash message of the response is shown as a toast by the app layout.
function remove(player: Player) {
  router.delete(`/players/${player.id}`, { preserveScroll: true });
}
</script>

<template>
  <RemoteTable
    class="w-full"
    :data="props.players"
    :total="props.players.length"
    :columns="columns"
    row-key="id"
    :show-search="false"
    :paginate="false"
    :header-actions="(isLoading) => [{ label: 'Refresh', icon: 'lucide:refresh-cw', disabled: isLoading.value, onClick: refresh }]"
    :row-actions="
      (player) => [
        { label: 'View profile', icon: 'lucide:user', onClick: () => router.visit(`/players/${player.id}`) },
        { divider: true },
        { label: 'Remove from roster', icon: 'lucide:trash-2', class: 'text-destructive', onClick: () => remove(player) },
      ]
    "
  >
    <template #empty-state>The roster is empty. Invite players to join the team.</template>
  </RemoteTable>
</template>
