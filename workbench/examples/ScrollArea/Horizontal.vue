<script setup lang="ts">
import { UiScrollArea } from "@rosalana/ui";

const rounds = ["Round of 32", "Round of 16", "Quarterfinals", "Semifinals", "Final", "Third place"];
</script>

<template>
  <UiScrollArea class="w-full max-w-sm rounded-xl border">
    <div class="flex w-max gap-3 p-4">
      <div
        v-for="round in rounds"
        :key="round"
        class="w-36 shrink-0 rounded-xl border px-4 py-6 text-sm font-medium"
      >
        {{ round }}
      </div>
    </div>
  </UiScrollArea>
</template>
