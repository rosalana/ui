<script setup lang="ts">
import { TextEffect, UiButton } from "@rosalana/ui";
</script>

<template>
  <div class="flex w-full max-w-lg flex-col items-start gap-4">
    <h2 class="text-4xl font-bold tracking-tight">
      <TextEffect.Rise text="Run your tournament," />
      <TextEffect.Rise text="not a spreadsheet." :delay="0.4" class="text-primary" />
    </h2>
    <TextEffect.Fade
      text="Brackets, schedules and results in one warm place."
      :delay="1"
      class="text-theme"
    />
    <UiButton arrow>Create a tournament</UiButton>
  </div>
</template>
