<script setup lang="ts">
import { UiCard, UiCardContent, UiCardDescription, UiCardHeader, UiCardTitle, UiTag } from "@rosalana/ui";
</script>

<template>
  <UiCard class="w-full max-w-md">
    <UiCardHeader>
      <UiCardTitle>Spring Cup 2026</UiCardTitle>
      <UiCardDescription>Open amateur tournament, 16 teams.</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="flex flex-wrap gap-2">
      <UiTag color="emerald" icon="lucide:trophy">Football</UiTag>
      <UiTag color="sky" icon="lucide:map-pin">Prague</UiTag>
      <UiTag color="violet" icon="lucide:users">Mixed</UiTag>
      <UiTag color="amber" icon="lucide:calendar">March</UiTag>
    </UiCardContent>
  </UiCard>
</template>
