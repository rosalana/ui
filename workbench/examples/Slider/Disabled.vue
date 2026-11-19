<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiSlider } from "@rosalana/ui";

const progress = ref([65]);
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-3">
    <UiLabel>Season progress</UiLabel>
    <UiSlider v-model="progress" disabled />
    <p class="text-xs text-theme">Calculated from the games played so far.</p>
  </div>
</template>
