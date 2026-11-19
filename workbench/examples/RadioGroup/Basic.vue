<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiRadioGroup, UiRadioGroupItem } from "@rosalana/ui";

const plans = [
  { value: "casual", label: "Casual", hint: "Friendly matches, no standings" },
  { value: "league", label: "League", hint: "Weekly matches and a season table" },
  { value: "cup", label: "Cup", hint: "Knockout rounds with a final" },
];

const format = ref("league");
</script>

<template>
  <div class="grid gap-3">
    <p id="format-label" class="text-sm font-medium">Tournament format</p>
    <UiRadioGroup v-model="format" aria-labelledby="format-label">
      <div v-for="plan in plans" :key="plan.value" class="flex items-start gap-3">
        <UiRadioGroupItem :id="`format-${plan.value}`" :value="plan.value" class="mt-0.5" />
        <div class="grid gap-1">
          <UiLabel :for="`format-${plan.value}`">{{ plan.label }}</UiLabel>
          <p class="text-sm text-theme">{{ plan.hint }}</p>
        </div>
      </div>
    </UiRadioGroup>
  </div>
</template>
