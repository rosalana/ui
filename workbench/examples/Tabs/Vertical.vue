<script setup lang="ts">
import { UiTabs, UiTabsContent, UiTabsList, UiTabsTrigger } from "@rosalana/ui";
</script>

<template>
  <!-- activation-mode="manual": arrow keys only move the focus, Enter or Space opens the panel -->
  <UiTabs
    default-value="profile"
    orientation="vertical"
    activation-mode="manual"
    class="flex w-full max-w-md items-start gap-4"
  >
    <UiTabsList aria-label="Account settings" class="h-auto flex-col items-stretch">
      <UiTabsTrigger value="profile" class="justify-start">Profile</UiTabsTrigger>
      <UiTabsTrigger value="notifications" class="justify-start">
        Notifications
      </UiTabsTrigger>
      <UiTabsTrigger value="billing" disabled class="justify-start">
        Billing
      </UiTabsTrigger>
    </UiTabsList>
    <div class="flex-1 text-sm">
      <UiTabsContent value="profile" class="mt-0">
        Your name and avatar are shown to other players in every tournament.
      </UiTabsContent>
      <UiTabsContent value="notifications" class="mt-0">
        Get an email when a match is scheduled or a result is entered.
      </UiTabsContent>
    </div>
  </UiTabs>
</template>
