<script setup lang="ts">
import UiSmallAlert from "../../src/components/Ui/SmallAlert/SmallAlert.vue";
</script>

<template>
  <div class="space-y-10 max-w-md">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Variants</h2>
      <div class="space-y-2">
        <UiSmallAlert variant="default">Default alert message</UiSmallAlert>
        <UiSmallAlert variant="info">Your session expires in 30 minutes.</UiSmallAlert>
        <UiSmallAlert variant="success">Changes saved successfully.</UiSmallAlert>
        <UiSmallAlert variant="warning">Storage is almost full (92%).</UiSmallAlert>
        <UiSmallAlert variant="destructive">Failed to connect to server.</UiSmallAlert>
        <UiSmallAlert variant="outline">Neutral outline alert style.</UiSmallAlert>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Custom Icons</h2>
      <div class="space-y-2">
        <UiSmallAlert variant="info" icon="lucide:wifi">Connected to network.</UiSmallAlert>
        <UiSmallAlert variant="success" icon="lucide:shield-check">Account verified.</UiSmallAlert>
        <UiSmallAlert variant="warning" icon="lucide:battery-low">Battery low — 15% remaining.</UiSmallAlert>
        <UiSmallAlert variant="destructive" icon="lucide:cloud-off">Sync failed. Check connection.</UiSmallAlert>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">In Context</h2>
      <div class="p-5 rounded-xl border border-muted-200 dark:border-muted-800 space-y-4">
        <h3 class="font-medium text-sm">Profile Settings</h3>
        <UiSmallAlert variant="info" icon="lucide:info">
          Changes will take effect on next login.
        </UiSmallAlert>
        <UiSmallAlert variant="warning" icon="lucide:alert-triangle">
          Email verification pending. Please check your inbox.
        </UiSmallAlert>
        <UiSmallAlert variant="success" icon="lucide:check-circle-2">
          Two-factor authentication is enabled.
        </UiSmallAlert>
      </div>
    </section>
  </div>
</template>
