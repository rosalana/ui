<script setup lang="ts">
import { UiButton } from "@rosalana/ui";
</script>

<template>
  <!-- The docs run without Inertia, the code shows the app version -->
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiButton variant="outline" arrow-back as="a" href="#" @click.prevent>
      Back
    </UiButton>
    <UiButton arrow as="a" href="#" @click.prevent>Continue</UiButton>
    <UiButton variant="ghost" as="a" href="#" @click.prevent>Log out</UiButton>
  </div>
</template>
