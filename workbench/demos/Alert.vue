<script setup lang="ts">
import UiAlert from "../../src/components/Ui/Alert/Alert.vue";
import UiAlertTitle from "../../src/components/Ui/Alert/AlertTitle.vue";
import UiAlertDescription from "../../src/components/Ui/Alert/AlertDescription.vue";
</script>

<template>
  <div class="space-y-4 max-w-2xl">
    <UiAlert variant="default">
      <UiAlertTitle>Default Alert</UiAlertTitle>
      <UiAlertDescription>This is a default alert with important information.</UiAlertDescription>
    </UiAlert>

    <UiAlert variant="info">
      <UiAlertTitle>Info Alert</UiAlertTitle>
      <UiAlertDescription>Your request has been queued and will be processed shortly.</UiAlertDescription>
    </UiAlert>

    <UiAlert variant="success">
      <UiAlertTitle>Success Alert</UiAlertTitle>
      <UiAlertDescription>Your changes have been saved successfully.</UiAlertDescription>
    </UiAlert>

    <UiAlert variant="warning">
      <UiAlertTitle>Warning Alert</UiAlertTitle>
      <UiAlertDescription>This action cannot be undone. Please review before proceeding.</UiAlertDescription>
    </UiAlert>

    <UiAlert variant="danger">
      <UiAlertTitle>Danger Alert</UiAlertTitle>
      <UiAlertDescription>An error occurred while processing your request.</UiAlertDescription>
    </UiAlert>

    <UiAlert variant="destructive">
      <UiAlertTitle>Destructive Alert</UiAlertTitle>
      <UiAlertDescription>This will permanently delete your account and all associated data.</UiAlertDescription>
    </UiAlert>

    <UiAlert variant="outline">
      <UiAlertTitle>Outline Alert</UiAlertTitle>
      <UiAlertDescription>A subtle alert for less critical information.</UiAlertDescription>
    </UiAlert>
  </div>
</template>
