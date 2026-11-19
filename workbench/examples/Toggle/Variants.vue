<script setup lang="ts">
import { UiToggle } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiToggle default-value>Default</UiToggle>
    <UiToggle variant="secondary" default-value>Secondary</UiToggle>
    <UiToggle variant="destructive" default-value>Destructive</UiToggle>
    <UiToggle variant="outline" default-value>Outline</UiToggle>
    <UiToggle variant="ghost" default-value>Ghost</UiToggle>
  </div>
</template>
