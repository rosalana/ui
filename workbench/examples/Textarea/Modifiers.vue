<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiTextarea } from "@rosalana/ui";

const note = ref("");
const committed = ref("");
</script>

<template>
  <div class="grid w-full max-w-md gap-2">
    <UiLabel for="match-note">Match note (.lazy.trim)</UiLabel>
    <UiTextarea
      id="match-note"
      v-model.lazy.trim="note"
      :rows="3"
      placeholder="The model updates when you leave the field."
      @blur="committed = note"
    />
    <p class="text-sm text-theme">Saved note: {{ committed || "nothing yet" }}</p>
  </div>
</template>
