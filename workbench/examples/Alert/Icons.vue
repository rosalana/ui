<script setup lang="ts">
import { UiAlert, UiAlertDescription, UiAlertTitle } from "@rosalana/ui";
</script>

<template>
  <div class="flex w-full max-w-xl flex-col gap-3">
    <UiAlert variant="info" icon="lucide:calendar-clock">
      <UiAlertTitle variant="mono">Reminder</UiAlertTitle>
      <UiAlertDescription>Check-in opens one hour before the first match.</UiAlertDescription>
    </UiAlert>
    <UiAlert variant="success" icon="lucide:trophy">
      <UiAlertTitle variant="mono">Final result</UiAlertTitle>
      <UiAlertDescription>Night Owls won the Spring Cup 3:1.</UiAlertDescription>
    </UiAlert>
    <UiAlert variant="outline">
      <UiAlertDescription>An alert without a title works for a single sentence.</UiAlertDescription>
    </UiAlert>
  </div>
</template>
