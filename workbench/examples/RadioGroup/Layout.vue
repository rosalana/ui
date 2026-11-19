<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiRadioGroup, UiRadioGroupItem } from "@rosalana/ui";

const sizes = ["5 vs 5", "7 vs 7", "11 vs 11"];
const size = ref("7 vs 7");
</script>

<template>
  <div class="grid gap-6">
    <div class="grid gap-3">
      <p id="team-size-label" class="text-sm font-medium">Team size</p>
      <UiRadioGroup v-model="size" orientation="horizontal" class="flex gap-5" aria-labelledby="team-size-label">
        <div v-for="item in sizes" :key="item" class="flex items-center gap-2">
          <UiRadioGroupItem :id="`size-${item}`" :value="item" />
          <UiLabel :for="`size-${item}`">{{ item }}</UiLabel>
        </div>
      </UiRadioGroup>
    </div>

    <div class="grid gap-3">
      <p id="pitch-label" class="text-sm font-medium">Pitch</p>
      <UiRadioGroup default-value="grass" disabled aria-labelledby="pitch-label">
        <div class="flex items-center gap-2">
          <UiRadioGroupItem id="pitch-grass" value="grass" />
          <UiLabel for="pitch-grass">Grass</UiLabel>
        </div>
        <div class="flex items-center gap-2">
          <UiRadioGroupItem id="pitch-indoor" value="indoor" />
          <UiLabel for="pitch-indoor">Indoor hall</UiLabel>
        </div>
      </UiRadioGroup>
    </div>
  </div>
</template>
