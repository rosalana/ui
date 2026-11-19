<script setup lang="ts">
import { ref } from "vue";
import {
  UiAlertDialog,
  UiAlertDialogActionDanger,
  UiAlertDialogCancel,
  UiAlertDialogContent,
  UiAlertDialogDescription,
  UiAlertDialogFooter,
  UiAlertDialogHeader,
  UiAlertDialogTitle,
  UiAlertDialogTrigger,
  UiButton,
} from "@rosalana/ui";

const teams = ref(["Night Owls", "Red Foxes", "Pixel Pirates"]);

function remove(name: string) {
  teams.value = teams.value.filter((team) => team !== name);
}
</script>

<template>
  <ul class="w-full max-w-sm divide-y rounded-xl border">
    <li v-for="team in teams" :key="team" class="flex items-center justify-between px-4 py-2">
      <span class="text-sm font-medium">{{ team }}</span>
      <UiAlertDialog>
        <UiAlertDialogTrigger as-child>
          <UiButton variant="destructive" size="sm">Remove</UiButton>
        </UiAlertDialogTrigger>
        <UiAlertDialogContent>
          <UiAlertDialogHeader>
            <UiAlertDialogTitle>Remove {{ team }}?</UiAlertDialogTitle>
            <UiAlertDialogDescription>
              The team leaves the tournament and its scheduled matches are cancelled. This
              cannot be undone.
            </UiAlertDialogDescription>
          </UiAlertDialogHeader>
          <UiAlertDialogFooter>
            <UiAlertDialogCancel>Keep team</UiAlertDialogCancel>
            <UiAlertDialogActionDanger @click="remove(team)">
              Remove team
            </UiAlertDialogActionDanger>
          </UiAlertDialogFooter>
        </UiAlertDialogContent>
      </UiAlertDialog>
    </li>
    <li v-if="!teams.length" class="px-4 py-3 text-sm text-theme">No teams left.</li>
  </ul>
</template>
