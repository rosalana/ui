<script setup lang="ts">
import { computed, ref } from "vue";
import { UiButton, UiProgress } from "@rosalana/ui";

const steps = ["Team", "Players", "Payment", "Confirm"];
const step = ref(1);
const progress = computed(() => (step.value / steps.length) * 100);
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div class="flex flex-col gap-2">
      <p class="text-sm font-medium">Step {{ step }} of {{ steps.length }}: {{ steps[step - 1] }}</p>
      <UiProgress :model-value="progress" aria-label="Registration progress" />
    </div>
    <div class="flex justify-between">
      <UiButton variant="outline" :disabled="step === 1" @click="step--">Back</UiButton>
      <UiButton :disabled="step === steps.length" @click="step++">Continue</UiButton>
    </div>
  </div>
</template>
