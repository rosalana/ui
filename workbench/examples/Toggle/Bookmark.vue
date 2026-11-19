<script setup lang="ts">
import { ref } from "vue";
import { UiIcon, UiToggle } from "@rosalana/ui";

const watching = ref(false);
</script>

<template>
  <div class="flex w-full max-w-sm items-center justify-between gap-4 rounded-2xl border p-4">
    <div>
      <p class="font-medium">Spring Cup 2026</p>
      <p class="text-sm text-theme">
        {{ watching ? "You get notified about every match." : "Watch the tournament to follow it." }}
      </p>
    </div>
    <UiToggle
      v-model="watching"
      variant="outline"
      size="icon"
      :aria-label="watching ? 'Stop watching' : 'Watch tournament'"
    >
      <UiIcon :name="watching ? 'lucide:bell-ring' : 'lucide:bell'" />
    </UiToggle>
  </div>
</template>
