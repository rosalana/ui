<script setup lang="ts">
import {
  UiBadge,
  UiTable,
  UiTableBody,
  UiTableCaption,
  UiTableCell,
  UiTableFooter,
  UiTableHead,
  UiTableHeader,
  UiTableRow,
} from "@rosalana/ui";

const standings = [
  { id: 1, team: "Falcons", played: 8, won: 7, lost: 1, points: 21, form: "hot" },
  { id: 2, team: "Wolves", played: 8, won: 5, lost: 3, points: 15, form: "steady" },
  { id: 3, team: "Ravens", played: 8, won: 4, lost: 4, points: 12, form: "steady" },
  { id: 4, team: "Tigers", played: 8, won: 1, lost: 7, points: 3, form: "cold" },
];

const formVariant = {
  hot: "default",
  steady: "secondary",
  cold: "outline",
} as const;

const totalPoints = standings.reduce((sum, row) => sum + row.points, 0);
</script>

<template>
  <UiTable>
    <UiTableCaption class="px-3 pb-3">Spring League, after round 8</UiTableCaption>
    <UiTableHeader>
      <UiTableRow>
        <UiTableHead class="pl-4">Team</UiTableHead>
        <UiTableHead class="text-right">Played</UiTableHead>
        <UiTableHead class="text-right">Won</UiTableHead>
        <UiTableHead class="text-right">Lost</UiTableHead>
        <UiTableHead>Form</UiTableHead>
        <UiTableHead class="pr-4 text-right">Points</UiTableHead>
      </UiTableRow>
    </UiTableHeader>
    <UiTableBody>
      <UiTableRow v-for="row in standings" :key="row.id">
        <UiTableCell class="pl-4 font-medium">{{ row.team }}</UiTableCell>
        <UiTableCell class="text-right">{{ row.played }}</UiTableCell>
        <UiTableCell class="text-right">{{ row.won }}</UiTableCell>
        <UiTableCell class="text-right">{{ row.lost }}</UiTableCell>
        <UiTableCell>
          <UiBadge :variant="formVariant[row.form as keyof typeof formVariant]" class="capitalize">
            {{ row.form }}
          </UiBadge>
        </UiTableCell>
        <UiTableCell class="pr-4 text-right font-medium">{{ row.points }}</UiTableCell>
      </UiTableRow>
    </UiTableBody>
    <UiTableFooter>
      <UiTableRow>
        <UiTableCell colspan="5" class="pl-4">Points in the league</UiTableCell>
        <UiTableCell class="pr-4 text-right">{{ totalPoints }}</UiTableCell>
      </UiTableRow>
    </UiTableFooter>
  </UiTable>
</template>
