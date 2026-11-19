<script setup lang="ts">
import { computed, ref } from "vue";
import { UiLabel, UiTextarea } from "@rosalana/ui";

const MAX = 200;
const bio = ref("");
const tooLong = computed(() => bio.value.length > MAX);
</script>

<template>
  <div class="grid w-full max-w-md gap-2">
    <UiLabel for="team-bio">About the team</UiLabel>
    <UiTextarea
      id="team-bio"
      v-model="bio"
      :rows="4"
      :variant="tooLong ? 'destructive' : 'default'"
      :aria-invalid="tooLong"
      placeholder="Tell other teams who you are and where you play."
    />
    <p class="text-sm" :class="tooLong ? 'text-destructive' : 'text-theme'">
      {{ bio.length }} / {{ MAX }}
    </p>
  </div>
</template>
