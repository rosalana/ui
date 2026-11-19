<script setup lang="ts">
import { ref } from "vue";
import { DataTable, UiButton, useSonner, type Column } from "@rosalana/ui";

type Registration = {
  id: number;
  team: string;
  captain: string;
  email: string;
  paid: boolean;
};

const sonner = useSonner();

const registrations = ref<Registration[]>([
  { id: 1, team: "Falcons", captain: "Anna Nováková", email: "anna@falcons.cz", paid: true },
  { id: 2, team: "Wolves", captain: "Jan Dvořák", email: "jan@wolves.cz", paid: true },
  { id: 3, team: "Ravens", captain: "Eva Králová", email: "eva@ravens.cz", paid: false },
  { id: 4, team: "Tigers", captain: "Petr Svoboda", email: "petr@tigers.cz", paid: false },
  { id: 5, team: "Sharks", captain: "Marie Horáková", email: "marie@sharks.cz", paid: true },
]);
const selected = ref<Registration[]>([]);
const table = ref<{ table: { state: { select: { clear(): void } } } }>();

const columns: Column<Registration>[] = [
  { key: "team", header: "Team", toggleable: false },
  { key: "captain", header: "Captain" },
  { key: "email", header: "Email", hidden: true, relevant: true },
  { key: "paid", header: "Paid", render: (row) => (row.paid ? "Yes" : "No"), searchable: false },
];

function remove(ids: number[]) {
  registrations.value = registrations.value.filter((row) => !ids.includes(row.id));
  table.value?.table.state.select.clear();
  selected.value = [];
  sonner.success(`${ids.length} registration${ids.length === 1 ? "" : "s"} removed`);
}

function remind(row: Registration) {
  sonner.info(`Payment reminder sent to ${row.captain}`);
}
</script>

<template>
  <div class="w-full space-y-3">
    <DataTable
      ref="table"
      :data="registrations"
      :columns="columns"
      row-key="id"
      selectable
      :paginate="false"
      :row-actions="
        (row) => [
          { label: 'Send payment reminder', icon: 'lucide:mail', hidden: row.paid, onClick: () => remind(row) },
          { divider: true },
          { label: 'Remove', icon: 'lucide:trash-2', class: 'text-destructive', onClick: () => remove([row.id]) },
        ]
      "
      :header-actions="[
        { label: 'Export to CSV', icon: 'lucide:download', onClick: () => sonner.info('Export started') },
      ]"
      @select="selected = $event"
    >
      <template #empty-state>No registrations left. New teams will show up here.</template>
    </DataTable>
    <div class="flex items-center justify-between gap-3">
      <span class="text-sm text-theme">{{ selected.length }} selected</span>
      <UiButton
        variant="destructive"
        :disabled="!selected.length"
        @click="remove(selected.map((row) => row.id))"
      >
        Remove selected
      </UiButton>
    </div>
  </div>
</template>
