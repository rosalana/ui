<script setup lang="ts">
import { UiButton, useConfirm, useSonner } from "@rosalana/ui";

const { confirm } = useConfirm();
const sonner = useSonner();

async function removeTeam() {
  const confirmed = await confirm({
    title: "Remove the Falcons?",
    description: "The team leaves the tournament and its matches are cancelled.",
    icon: "lucide:trash-2",
    confirm: "Remove team",
    cancel: "Keep team",
    danger: true,
  });
  if (!confirmed) return;

  sonner.success("Falcons removed");
}

async function leave() {
  if (!(await confirm("Leave without saving?"))) return;

  sonner.default("Changes discarded");
}
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2">
    <UiButton variant="destructive" @click="removeTeam">Remove team</UiButton>
    <UiButton variant="outline" @click="leave">Leave page</UiButton>
  </div>
</template>
