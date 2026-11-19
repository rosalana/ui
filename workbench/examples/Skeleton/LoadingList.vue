<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { UiAvatar, UiAvatarFallback, UiBadge, UiSkeleton } from "@rosalana/ui";

const teams = [
  { name: "Night Owls", initials: "NO", points: "12 pts", variant: "success" },
  { name: "Red Foxes", initials: "RF", points: "9 pts", variant: "info" },
  { name: "Blue Herons", initials: "BH", points: "4 pts", variant: "outline" },
] as const;

const loading = ref(true);
let timer: ReturnType<typeof setTimeout> | undefined;

onMounted(() => {
  // Simulated request, in your app this is the loading state of your data
  timer = setTimeout(() => (loading.value = false), 2500);
});

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <div class="w-full max-w-sm">
    <div v-if="loading" role="status" aria-label="Loading standings" class="flex flex-col gap-4">
      <div v-for="i in 3" :key="i" class="flex items-center gap-3">
        <UiSkeleton class="size-10 rounded-full" />
        <UiSkeleton class="h-4 flex-1" />
        <UiSkeleton class="h-5 w-14 rounded-full" />
      </div>
    </div>
    <ul v-else class="flex flex-col gap-4">
      <li v-for="team in teams" :key="team.name" class="flex items-center gap-3">
        <UiAvatar><UiAvatarFallback>{{ team.initials }}</UiAvatarFallback></UiAvatar>
        <span class="flex-1 text-sm font-medium">{{ team.name }}</span>
        <UiBadge :variant="team.variant" size="sm">{{ team.points }}</UiBadge>
      </li>
    </ul>
  </div>
</template>
