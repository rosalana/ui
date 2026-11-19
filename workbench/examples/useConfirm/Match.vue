<script setup lang="ts">
import { UiButton, UiIcon, useConfirm, useSonner } from "@rosalana/ui";

const { match } = useConfirm();
const sonner = useSonner();

async function deleteTournament() {
  const confirmed = await match({
    title: "Delete Spring Cup 2026?",
    description: "All teams, matches and results are lost. Type the name to confirm.",
    match: "Spring Cup 2026",
    placeholder: "Spring Cup 2026",
    confirm: "Delete tournament",
    danger: true,
  });
  if (!confirmed) return;

  sonner.success("Spring Cup 2026 deleted");
}
</script>

<template>
  <UiButton variant="destructive" @click="deleteTournament">
    <UiIcon name="lucide:trash-2" />
    Delete tournament
  </UiButton>
</template>
