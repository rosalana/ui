<script setup lang="ts">
import { UiSmallAlert } from "@rosalana/ui";
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-2">
    <UiSmallAlert>Your profile is visible to teammates.</UiSmallAlert>
    <UiSmallAlert variant="info">Players can join until the draw.</UiSmallAlert>
    <UiSmallAlert variant="success">Team name is available.</UiSmallAlert>
    <UiSmallAlert variant="warning">Only 2 spots left in this group.</UiSmallAlert>
    <UiSmallAlert variant="destructive">This name is already taken.</UiSmallAlert>
    <UiSmallAlert variant="outline" icon="lucide:lightbulb">Tip: use a short, memorable name.</UiSmallAlert>
  </div>
</template>
