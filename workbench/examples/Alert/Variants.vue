<script setup lang="ts">
import { UiAlert, UiAlertDescription, UiAlertTitle } from "@rosalana/ui";
</script>

<template>
  <div class="flex w-full max-w-xl flex-col gap-3">
    <UiAlert>
      <UiAlertTitle>Welcome to the Spring Cup</UiAlertTitle>
      <UiAlertDescription>Registration for your team is open until March 14.</UiAlertDescription>
    </UiAlert>
    <UiAlert variant="info">
      <UiAlertTitle>Schedule published</UiAlertTitle>
      <UiAlertDescription>Group matches start on Saturday at 9:00.</UiAlertDescription>
    </UiAlert>
    <UiAlert variant="success">
      <UiAlertTitle>Team registered</UiAlertTitle>
      <UiAlertDescription>The Night Owls are in. A confirmation was sent to the captain.</UiAlertDescription>
    </UiAlert>
    <UiAlert variant="warning">
      <UiAlertTitle>Roster incomplete</UiAlertTitle>
      <UiAlertDescription>Two players still have to confirm their participation.</UiAlertDescription>
    </UiAlert>
    <UiAlert variant="danger">
      <UiAlertTitle>Payment failed</UiAlertTitle>
      <UiAlertDescription>The entry fee was not charged. Check your card and try again.</UiAlertDescription>
    </UiAlert>
    <UiAlert variant="destructive">
      <UiAlertTitle>Tournament deleted</UiAlertTitle>
      <UiAlertDescription>All matches and results were removed and can't be restored.</UiAlertDescription>
    </UiAlert>
    <UiAlert variant="outline">
      <UiAlertTitle>Tip</UiAlertTitle>
      <UiAlertDescription>Drag a team onto a slot to move it in the bracket.</UiAlertDescription>
    </UiAlert>
  </div>
</template>
