<script setup lang="ts">
import { Dump } from "@rosalana/ui";

const team: Record<string, unknown> = {
  name: "Falcons",
  founded: new Date("2019-03-14T10:00:00Z"),
  score: 42.5,
  rank: 1n,
  active: true,
  coach: undefined,
  captain: null,
  pattern: /^F\w+/i,
  badge: Symbol("gold"),
  average: NaN,
  limit: Infinity,
  rename: (name: string) => name.trim(),
  players: ["Ada", "Linus", "Grace"],
};

// A reference back to the parent is marked as circular instead of looping forever.
team.self = team;
</script>

<template>
  <Dump :dump="team" title="Every kind of value" :auto-collapse="0" class="w-full" />
</template>
