<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiTabs,
  UiTabsContent,
  UiTabsList,
  UiTabsTrigger,
} from "@rosalana/ui";

const steps = ["details", "schedule", "review"];
const step = ref("details");

function next() {
  const index = steps.indexOf(step.value);
  step.value = steps[Math.min(index + 1, steps.length - 1)];
}
</script>

<template>
  <UiTabs v-model="step" class="w-full max-w-md">
    <UiTabsList aria-label="Tournament setup">
      <UiTabsTrigger value="details">Details</UiTabsTrigger>
      <UiTabsTrigger value="schedule">Schedule</UiTabsTrigger>
      <UiTabsTrigger value="review">Review</UiTabsTrigger>
    </UiTabsList>
    <UiTabsContent value="details" class="text-sm">
      Name the tournament and pick the number of teams.
    </UiTabsContent>
    <UiTabsContent value="schedule" class="text-sm">
      Choose when each round is played.
    </UiTabsContent>
    <UiTabsContent value="review" class="text-sm">
      Everything looks good. Publish the tournament when you are ready.
    </UiTabsContent>
    <UiButton
      class="mt-4"
      size="sm"
      :disabled="step === 'review'"
      @click="next"
    >
      Continue
    </UiButton>
  </UiTabs>
</template>
