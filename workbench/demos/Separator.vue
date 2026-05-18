<script setup lang="ts">
import UiSeparator from "../../src/components/Ui/Separator/Separator.vue";
import Section from "workbench/components/Section.vue";
</script>

<template>
  <Section title="Horizontal" class="w-80">
    <div class="space-y-4">
      <p class="text-sm">Content above the separator.</p>
      <UiSeparator />
      <p class="text-sm">Content below the separator.</p>
    </div>
  </Section>

  <Section title="Vertical" class="w-80">
    <div class="flex items-center gap-4 h-8">
      <span class="text-sm">Home</span>
      <UiSeparator orientation="vertical" />
      <span class="text-sm">Blog</span>
      <UiSeparator orientation="vertical" />
      <span class="text-sm">About</span>
      <UiSeparator orientation="vertical" />
      <span class="text-sm">Contact</span>
    </div>
  </Section>

  <Section title="In a Card Layout" class="w-80">
    <div
      class="rounded-xl border border-muted-200 dark:border-muted-800 overflow-hidden"
    >
      <div class="p-4">
        <p class="font-medium text-sm">Profile Settings</p>
        <p class="text-xs text-theme mt-0.5">Manage your account preferences</p>
      </div>
      <UiSeparator />
      <div class="p-4 space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-sm">Display name</span>
          <span class="text-sm text-theme">John Doe</span>
        </div>
        <UiSeparator />
        <div class="flex justify-between items-center">
          <span class="text-sm">Email</span>
          <span class="text-sm text-theme">john@example.com</span>
        </div>
        <UiSeparator />
        <div class="flex justify-between items-center">
          <span class="text-sm">Role</span>
          <span class="text-sm text-theme">Admin</span>
        </div>
      </div>
    </div>
  </Section>
</template>
