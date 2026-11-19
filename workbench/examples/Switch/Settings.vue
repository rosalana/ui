<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiSwitch } from "@rosalana/ui";

const matchReminders = ref(true);
const publicProfile = ref(false);
</script>

<template>
  <div class="grid w-full max-w-sm gap-5">
    <div class="flex items-center justify-between gap-4">
      <div class="grid gap-1">
        <UiLabel for="match-reminders">Match reminders</UiLabel>
        <p class="text-sm text-theme">
          {{ matchReminders ? "We remind you the day before every match." : "Reminders are off." }}
        </p>
      </div>
      <UiSwitch id="match-reminders" v-model="matchReminders" />
    </div>

    <div class="flex items-center justify-between gap-4">
      <div class="grid gap-1">
        <UiLabel for="public-profile">Public profile</UiLabel>
        <p class="text-sm text-theme">
          {{ publicProfile ? "Anyone can see your team page." : "Only your team can see it." }}
        </p>
      </div>
      <UiSwitch id="public-profile" v-model="publicProfile" />
    </div>
  </div>
</template>
