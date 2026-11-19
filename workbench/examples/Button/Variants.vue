<script setup lang="ts">
import { UiButton } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiButton>Save</UiButton>
    <UiButton variant="secondary">Draft</UiButton>
    <UiButton variant="outline">Cancel</UiButton>
    <UiButton variant="ghost">Skip</UiButton>
    <UiButton variant="destructive">Delete</UiButton>
    <UiButton variant="link">Learn more</UiButton>
    <UiButton variant="clear">Clear</UiButton>
  </div>
</template>
