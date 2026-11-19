<script setup lang="ts">
import { ref } from "vue";
import { UiCheckbox, UiInput, UiLabel, UiSwitch } from "@rosalana/ui";

const name = ref("");
</script>

<template>
  <div class="grid w-full max-w-sm gap-5">
    <div class="grid gap-2">
      <UiLabel for="player-name">Player name</UiLabel>
      <UiInput id="player-name" v-model="name" placeholder="Anna Novak" />
    </div>

    <div class="flex items-center gap-2">
      <UiCheckbox id="captain" />
      <UiLabel for="captain">I am the team captain</UiLabel>
    </div>

    <div class="flex items-center justify-between gap-4">
      <UiLabel for="public-profile">Public profile</UiLabel>
      <UiSwitch id="public-profile" />
    </div>
  </div>
</template>
