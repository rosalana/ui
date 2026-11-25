<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { UiAvatar, UiAvatarFallback, UiAvatarImage, UiAvatarLoading } from "@rosalana/ui";

function picture(color: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${color}"/><circle cx="32" cy="25" r="11" fill="#fff"/><path d="M10 64a22 22 0 0 1 44 0Z" fill="#fff"/></svg>`,
    )
  );
}

const members = [
  { id: 1, name: "Ada Lovelace", role: "Owner", avatar_url: picture("#14b8a6"), delay: 700 },
  { id: 2, name: "Grace Hopper", role: "Admin", avatar_url: picture("#f59e0b"), delay: 1600 },
  { id: 3, name: "Alan Turing", role: "Member", avatar_url: "/missing/alan.png", delay: 2300 },
  { id: 4, name: "Katherine Johnson", role: "Member", avatar_url: picture("#8b5cf6"), delay: 1100 },
  { id: 5, name: "Margaret Hamilton", role: "Guest", avatar_url: null, delay: 0 },
];

// Stands in for a slow connection: each picture takes a while to arrive.
// In the app the image loads by itself, UiAvatarLoading needs no prop (see the code).
const arriving = reactive(new Set(members.filter((m) => m.avatar_url).map((m) => m.id)));
onMounted(() => {
  for (const member of members) setTimeout(() => arriving.delete(member.id), member.delay);
});
</script>

<template>
  <ul class="w-full max-w-sm divide-y divide-border rounded-2xl border border-border bg-background">
    <li v-for="member in members" :key="member.id" class="flex items-center gap-3 px-4 py-3">
      <UiAvatar>
        <UiAvatarImage v-if="member.avatar_url" :src="member.avatar_url" :alt="member.name" />
        <UiAvatarFallback :name="member.name" />
        <UiAvatarLoading :loading="arriving.has(member.id) || undefined" />
      </UiAvatar>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium">{{ member.name }}</p>
        <p class="text-xs text-theme">{{ member.role }}</p>
      </div>
    </li>
  </ul>
</template>
