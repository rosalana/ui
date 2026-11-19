<script setup lang="ts">
import { UiAvatar, UiAvatarFallback } from "@rosalana/ui";

const members = ["Ada Lovelace", "Grace Hopper", "Alan Turing", "Katherine Johnson"];
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <div class="flex -space-x-3">
      <UiAvatar v-for="member in members" :key="member" class="ring-2 ring-background">
        <UiAvatarFallback :name="member" />
      </UiAvatar>
    </div>
    <p class="text-sm text-theme">Falcons, 4 players</p>
  </div>
</template>
