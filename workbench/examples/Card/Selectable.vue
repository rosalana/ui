<script setup lang="ts">
import { ref } from "vue";
import { UiCard, UiCardDescription, UiCardHeader, UiCardTitle } from "@rosalana/ui";

const plans = [
  { id: "solo", title: "Solo", description: "Play on your own, 1 player." },
  { id: "team", title: "Team", description: "Bring your squad, up to 12 players." },
  { id: "club", title: "Club", description: "Several teams under one name." },
];

const selected = ref("team");
</script>

<template>
  <div class="grid w-full max-w-md gap-3">
    <UiCard
      v-for="plan in plans"
      :key="plan.id"
      as="button"
      type="button"
      class="cursor-pointer text-left"
      :data-state="selected === plan.id ? 'active' : undefined"
      :aria-pressed="selected === plan.id"
      @click="selected = plan.id"
    >
      <UiCardHeader class="p-4">
        <UiCardTitle>{{ plan.title }}</UiCardTitle>
        <UiCardDescription>{{ plan.description }}</UiCardDescription>
      </UiCardHeader>
    </UiCard>
  </div>
</template>
