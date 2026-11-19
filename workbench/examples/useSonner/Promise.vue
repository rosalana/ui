<script setup lang="ts">
import { ref } from "vue";
import { UiButton, UiLabel, UiSwitch, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const offline = ref(false);
const saving = ref(false);

// Stands in for the request that saves the roster.
function saveRoster() {
  return new Promise<{ players: number }>((resolve, reject) =>
    setTimeout(
      () => (offline.value ? reject(new Error("offline")) : resolve({ players: 12 })),
      1500,
    ),
  );
}

async function save() {
  saving.value = true;
  try {
    await sonner.promise(saveRoster, {
      loading: "Saving the roster…",
      success: (result) => `Roster saved, ${result.players} players`,
      error: { title: "Could not save the roster", description: "Check your connection and try again." },
    });
  } catch {
    // promise returns the original promise, so the rejection is still ours to handle.
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div class="flex items-center justify-between gap-4">
      <UiLabel for="promise-offline">Simulate a lost connection</UiLabel>
      <UiSwitch id="promise-offline" v-model="offline" />
    </div>
    <UiButton :loading="saving" @click="save">Save roster</UiButton>
  </div>
</template>
