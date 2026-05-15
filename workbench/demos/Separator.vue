<script setup lang="ts">
import UiSeparator from "../../src/components/Ui/Separator/Separator.vue";
</script>

<template>
  <div class="space-y-10 max-w-lg">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Horizontal</h2>
      <div class="space-y-4">
        <p class="text-sm">Content above the separator.</p>
        <UiSeparator />
        <p class="text-sm">Content below the separator.</p>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Vertical</h2>
      <div class="flex items-center gap-4 h-8">
        <span class="text-sm">Home</span>
        <UiSeparator orientation="vertical" />
        <span class="text-sm">Blog</span>
        <UiSeparator orientation="vertical" />
        <span class="text-sm">About</span>
        <UiSeparator orientation="vertical" />
        <span class="text-sm">Contact</span>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">In a Card Layout</h2>
      <div class="rounded-xl border border-muted-200 dark:border-muted-800 overflow-hidden">
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
    </section>
  </div>
</template>
