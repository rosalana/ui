<script setup lang="ts">
import { ref } from "vue";
import { UiButton, UiInput, UiLabel } from "@rosalana/ui";

const name = ref("Ada Lovelace");
const processing = ref(false);

// Stands in for the request the real form sends.
function submit() {
  processing.value = true;
  setTimeout(() => (processing.value = false), 1500);
}
</script>

<template>
  <form class="flex w-full max-w-sm flex-col gap-4" @submit.prevent="submit">
    <div class="flex flex-col gap-1.5">
      <UiLabel for="profile-name">Name</UiLabel>
      <UiInput id="profile-name" v-model="name" />
    </div>
    <UiButton type="submit" :loading="processing" class="self-end">
      Save profile
    </UiButton>
  </form>
</template>
