<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiNumberField } from "@rosalana/ui";

const players = ref(4);
</script>

<template>
  <div class="flex w-full max-w-[12rem] flex-col gap-1.5">
    <UiLabel for="team-size">Players per team</UiLabel>
    <UiNumberField id="team-size" v-model="players" :min="2" :max="8" />
    <p class="text-xs text-theme">From 2 to 8 players. Use the buttons, arrow keys or the wheel.</p>
  </div>
</template>
