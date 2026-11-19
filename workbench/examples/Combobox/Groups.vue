<script setup lang="ts">
import { ref } from "vue";
import { UiCombobox, UiLabel, type ComboboxItems } from "@rosalana/ui";

const games: ComboboxItems = [
  {
    heading: "Card games",
    items: [
      { value: "poker", label: "Poker", icon: "lucide:spade", shortcut: "P" },
      { value: "bridge", label: "Bridge", icon: "lucide:heart" },
    ],
  },
  {
    heading: "Board games",
    items: [
      { value: "chess", label: "Chess", icon: "lucide:crown", shortcut: "C" },
      { value: "go", label: "Go", icon: "lucide:circle-dot" },
      { value: "backgammon", label: "Backgammon", icon: "lucide:dices" },
    ],
  },
];

const game = ref<string>();
</script>

<template>
  <div class="flex w-full max-w-xs flex-col gap-1.5">
    <UiLabel for="tournament-game">Game</UiLabel>
    <UiCombobox
      id="tournament-game"
      v-model="game"
      :items="games"
      icon="lucide:search"
      placeholder="Find a game..."
    />
  </div>
</template>
