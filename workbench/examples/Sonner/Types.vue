<script setup lang="ts">
import { UiButton, useSonner } from "@rosalana/ui";

const sonner = useSonner();
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2">
    <UiButton variant="outline" @click="sonner.default('Draft saved')">Default</UiButton>
    <UiButton
      variant="outline"
      @click="sonner.info('Round 2 starts at 18:00', { description: 'Teams get a reminder 15 minutes before.' })"
    >
      Info
    </UiButton>
    <UiButton
      variant="outline"
      @click="sonner.success('Falcons joined the tournament', { description: 'The bracket was updated.' })"
    >
      Success
    </UiButton>
    <UiButton
      variant="outline"
      @click="sonner.warning('Only 2 spots left', { description: 'Registration closes on Friday.' })"
    >
      Warning
    </UiButton>
    <UiButton
      variant="outline"
      @click="sonner.error('Could not publish the schedule', { description: 'Two matches overlap on court 1.' })"
    >
      Error
    </UiButton>
    <UiButton variant="outline" @click="sonner.loading('Generating the bracket…', { duration: 3000 })">
      Loading
    </UiButton>
    <UiButton
      variant="outline"
      @click="sonner.default('Trophy engraved', { icon: 'lucide:trophy', description: 'A custom icon replaces the type icon.' })"
    >
      Custom icon
    </UiButton>
  </div>
</template>
