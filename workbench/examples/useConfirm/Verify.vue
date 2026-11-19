<script setup lang="ts">
import { UiButton, useConfirm, useSonner } from "@rosalana/ui";

const { verify } = useConfirm();
const sonner = useSonner();

// Stands in for the request that checks the password (the correct one is "tigers").
async function checkPassword(password: string) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return password === "tigers";
}

async function transfer() {
  const verified = await verify({
    title: "Transfer ownership",
    description: "Enter your password to hand the tournament over to Eva.",
    callback: checkPassword,
    password: true,
    confirm: "Transfer",
  });
  if (!verified) return;

  sonner.success("Ownership transferred to Eva");
}
</script>

<template>
  <UiButton variant="outline" @click="transfer">Transfer ownership</UiButton>
</template>
