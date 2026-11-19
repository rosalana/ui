<script setup lang="ts">
import {
  UiButton,
  UiCard,
  UiCardContent,
  UiCardDescription,
  UiCardFooter,
  UiCardHeader,
  UiCardTitle,
} from "@rosalana/ui";
</script>

<template>
  <UiCard class="w-full max-w-sm">
    <UiCardHeader>
      <UiCardTitle>Spring Cup</UiCardTitle>
      <UiCardDescription>Starts on 12 April in Riverside Sports Hall.</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="text-sm">
      16 teams are signed up. Group stage on Saturday, finals on Sunday afternoon.
    </UiCardContent>
    <UiCardFooter class="justify-between gap-2">
      <UiButton variant="ghost">Details</UiButton>
      <UiButton>Join</UiButton>
    </UiCardFooter>
  </UiCard>
</template>
