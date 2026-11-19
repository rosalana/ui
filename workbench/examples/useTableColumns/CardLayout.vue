<script setup lang="ts">
import {
  ColumnRender,
  HeaderRender,
  UiBadge,
  UiButton,
  UiCard,
  UiCardContent,
  useTableColumns,
  type Column,
} from "@rosalana/ui";

type Project = { id: number; name: string; owner: string; status: string };

const projects: Project[] = [
  { id: 1, name: "Website refresh", owner: "Anna", status: "Active" },
  { id: 2, name: "Customer portal", owner: "Jan", status: "Planned" },
  { id: 3, name: "Brand guidelines", owner: "Eva", status: "Done" },
];

const definitions: Column<Project>[] = [
  { key: "name", header: "Project", bindTo: "title", toggleable: false },
  { key: "owner", header: "Owner" },
  { key: "status", header: "Status" },
];

const columns = useTableColumns<Project>(definitions);
const status = columns.getByKey("status")!;
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex flex-wrap gap-2">
      <UiButton
        v-for="column in columns.toggleable"
        :key="column.id"
        size="sm"
        :variant="column.hidden ? 'outline' : 'default'"
        :aria-pressed="!column.hidden"
        @click="columns.toggle(column)"
      >
        {{ column.header }}
      </UiButton>
      <UiButton variant="ghost" size="sm" @click="columns.moveToStart(status)">Status first</UiButton>
      <UiButton variant="ghost" size="sm" @click="columns.moveToEnd(status)">Status last</UiButton>
    </div>
    <div class="grid gap-4 sm:grid-cols-3">
      <UiCard v-for="project in projects" :key="project.id">
        <UiCardContent class="space-y-3 pt-6">
          <h3 class="font-medium">
            <ColumnRender
              v-if="columns.binded('title')"
              :column="columns.binded('title')!"
              :context="project"
            />
          </h3>
          <div
            v-for="column in columns.unbinded()"
            :key="column.id"
            class="flex items-center justify-between gap-3 text-sm"
          >
            <span class="text-theme"><HeaderRender :column="column" :context="columns" /></span>
            <UiBadge variant="outline"><ColumnRender :column="column" :context="project" /></UiBadge>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
