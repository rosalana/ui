<script setup lang="ts">
import { UiAvatar, UiAvatarFallback, UiAvatarImage, UiAvatarLoading } from "@rosalana/ui";

defineProps<{
  members: { id: number; name: string; role: string; avatar_url: string | null }[];
}>();
</script>

<template>
  <ul class="w-full max-w-sm divide-y divide-border rounded-2xl border border-border bg-background">
    <li v-for="member in members" :key="member.id" class="flex items-center gap-3 px-4 py-3">
      <UiAvatar>
        <!-- Without a picture there is nothing to wait for, so the initials show at once -->
        <UiAvatarImage v-if="member.avatar_url" :src="member.avatar_url" :alt="member.name" />
        <UiAvatarFallback :name="member.name" />
        <!-- Covers the avatar until the picture loads, or until it fails and the initials take over -->
        <UiAvatarLoading />
      </UiAvatar>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium">{{ member.name }}</p>
        <p class="text-xs text-theme">{{ member.role }}</p>
      </div>
    </li>
  </ul>
</template>
