<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { UiButton, useSonner } from "@rosalana/ui";

const sonner = useSonner();

let id: string | number | undefined;

// A toast that stays until the app closes it or the user does.
function remind() {
  id = sonner.warning("Roster closes in 10 minutes", {
    description: "Submit your lineup before the first match.",
    duration: Infinity,
    onDismiss: () => sonner.default("Reminder dismissed"),
    onAutoClose: () => sonner.default("Reminder expired"),
  });
}

function submit() {
  sonner.dismiss(id);
  sonner.success("Lineup submitted");
}

// Closes every toast, whatever created it.
function clear() {
  sonner.dismiss();
}

onBeforeUnmount(() => sonner.dismiss(id));
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2">
    <UiButton variant="outline" @click="remind">Remind me</UiButton>
    <UiButton @click="submit">Submit lineup</UiButton>
    <UiButton variant="ghost" @click="clear">Dismiss all</UiButton>
  </div>
</template>
