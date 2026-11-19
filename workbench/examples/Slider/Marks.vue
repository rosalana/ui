<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiSlider } from "@rosalana/ui";

const rounds = ref([3]);
const difficulty = ref([50]);
const players = ref([8]);
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8">
    <div class="flex flex-col gap-3">
      <UiLabel>Number of rounds</UiLabel>
      <!-- true puts a mark on every step -->
      <UiSlider v-model="rounds" :min="1" :max="7" :step="1" marks mark-labels />
    </div>
    <div class="flex flex-col gap-3">
      <UiLabel>Difficulty</UiLabel>
      <!-- an array places marks by hand, an item with a label also gets text under the track -->
      <UiSlider
        v-model="difficulty"
        :step="25"
        :marks="[
          { value: 0, label: 'Casual' },
          25,
          { value: 50, label: 'Normal' },
          75,
          { value: 100, label: 'Hardcore' },
        ]"
      />
    </div>
    <div class="flex flex-col gap-3">
      <UiLabel>Players</UiLabel>
      <!-- a number is the distance between marks, starting from min -->
      <UiSlider v-model="players" :min="2" :max="32" :step="2" :marks="10" mark-labels />
    </div>
  </div>
</template>
