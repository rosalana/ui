<script setup lang="ts">
import { h } from "vue";
import { DataTable, UiBadge, type Column } from "@rosalana/ui";

type Team = {
  id: number;
  name: string;
  captain: string;
  city: string;
  players: number;
  status: "registered" | "pending" | "withdrawn";
};

const teams: Team[] = [
  { id: 1, name: "Falcons", captain: "Anna Nováková", city: "Prague", players: 9, status: "registered" },
  { id: 2, name: "Wolves", captain: "Jan Dvořák", city: "Brno", players: 11, status: "registered" },
  { id: 3, name: "Ravens", captain: "Eva Králová", city: "Ostrava", players: 8, status: "pending" },
  { id: 4, name: "Tigers", captain: "Petr Svoboda", city: "Plzeň", players: 10, status: "registered" },
  { id: 5, name: "Sharks", captain: "Marie Horáková", city: "Olomouc", players: 12, status: "withdrawn" },
  { id: 6, name: "Bears", captain: "Tomáš Procházka", city: "Liberec", players: 9, status: "pending" },
  { id: 7, name: "Eagles", captain: "Lucie Marešová", city: "Zlín", players: 10, status: "registered" },
  { id: 8, name: "Foxes", captain: "Ondřej Černý", city: "Pardubice", players: 7, status: "pending" },
];

const statusVariant = {
  registered: "default",
  pending: "secondary",
  withdrawn: "outline",
} as const;

const columns: Column<Team>[] = [
  { key: "name", header: "Team", toggleable: false },
  { key: "captain", header: "Captain" },
  { key: "city", header: "City" },
  { key: "players", header: "Players", searchable: false },
  {
    key: "status",
    header: "Status",
    render: (team) =>
      h(UiBadge, { variant: statusVariant[team.status], class: "capitalize" }, () => team.status),
  },
];
</script>

<template>
  <DataTable
    :data="teams"
    :columns="columns"
    row-key="id"
    :page="1"
    :page-size="5"
    :page-size-options="[5, 10]"
  />
</template>
