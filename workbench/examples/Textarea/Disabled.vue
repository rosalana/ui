<script setup lang="ts">
import { UiLabel, UiTextarea } from "@rosalana/ui";
</script>

<template>
  <div class="grid w-full max-w-md gap-5">
    <div class="grid gap-2">
      <UiLabel for="rules">Tournament rules</UiLabel>
      <UiTextarea
        id="rules"
        :rows="3"
        model-value="Matches are played in two 20-minute halves. Each team fields at most 12 players."
        readonly
      />
    </div>
    <div class="grid gap-2">
      <UiLabel for="closed-note">Organizer note</UiLabel>
      <UiTextarea id="closed-note" :rows="2" model-value="Registration is closed." disabled />
    </div>
  </div>
</template>
