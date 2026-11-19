<script setup lang="ts">
import { ref } from "vue";
import { UiBadge, UiButton, useSelect, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const players = ref(["Anna", "Jan", "Eva", "Petr", "Marie", "Tomáš", "Lucie", "Ondřej"]);
const { selected, select, selectAll, clear, isSelected } = useSelect(players);

function modeOf(event: MouseEvent) {
  if (event.shiftKey) return "shift";
  return event.metaKey || event.ctrlKey ? "ctrl" : "click";
}

function confirm() {
  sonner.success(`${selected.value.join(", ")} will start the match`);
  clear();
}
</script>

<template>
  <div class="w-full max-w-md space-y-4">
    <p class="text-sm text-theme">
      Click picks one player, Ctrl or Cmd adds another and Shift picks everyone in between.
    </p>
    <div class="flex flex-wrap gap-2">
      <UiButton
        v-for="player in players"
        :key="player"
        :variant="isSelected(player) ? 'default' : 'outline'"
        :aria-pressed="isSelected(player)"
        @click="select(player, modeOf($event))"
      >
        {{ player }}
      </UiButton>
    </div>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <UiBadge variant="outline">{{ selected.length }} in the starting lineup</UiBadge>
      <div class="flex gap-2">
        <UiButton variant="ghost" size="sm" @click="selectAll">Select all</UiButton>
        <UiButton variant="ghost" size="sm" :disabled="!selected.length" @click="clear">Clear</UiButton>
        <UiButton size="sm" :disabled="!selected.length" @click="confirm">Confirm lineup</UiButton>
      </div>
    </div>
  </div>
</template>
