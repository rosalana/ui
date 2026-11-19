<script setup lang="ts">
import { Dump } from "@rosalana/ui";

const tournament = {
  id: 42,
  name: "Summer cup 2026",
  started: false,
  prize: null,
  organizer: { id: 7, name: "Eliska Novakova", email: "eliska@example.com" },
  teams: [
    { id: 1, name: "Falcons", players: 11, checkedIn: true },
    { id: 2, name: "Wolves", players: 12, checkedIn: false },
    { id: 3, name: "Ravens", players: 10, checkedIn: true },
  ],
  tags: ["outdoor", "amateur"],
};
</script>

<template>
  <Dump :dump="tournament" title="Tournament" :auto-collapse="2" class="w-full" />
</template>
