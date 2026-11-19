<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiSlider } from "@rosalana/ui";

const duration = ref([45]);
const budget = ref([1200]);
const level = ref([3]);

const levels = ["Rookie", "Amateur", "Skilled", "Pro", "Legend"];
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 pt-6">
    <div class="flex flex-col gap-3">
      <UiLabel>Match length</UiLabel>
      <!-- {value} is replaced by the formatted value -->
      <UiSlider v-model="duration" :min="15" :max="90" :step="5" tooltip="{value} min" />
    </div>
    <div class="flex flex-col gap-3">
      <UiLabel>Prize pool</UiLabel>
      <!-- tooltip-always keeps the bubble open all the time -->
      <UiSlider v-model="budget" :max="5000" :step="100" tooltip="{value} €" tooltip-always />
    </div>
    <div class="flex flex-col gap-3">
      <UiLabel>Skill level</UiLabel>
      <!-- a function builds the text from the value and the order of the thumb -->
      <UiSlider
        v-model="level"
        :min="1"
        :max="5"
        :tooltip="(value) => levels[value - 1]"
      />
    </div>
  </div>
</template>
