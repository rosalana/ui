<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { UiIcon, UiProgress } from "@rosalana/ui";

const progress = ref(0);
let timer: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  // Simulated upload, in your app bind this to the request's upload progress
  timer = setInterval(() => {
    progress.value = Math.min(100, progress.value + 4);
    if (progress.value === 100) clearInterval(timer);
  }, 150);
});

onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-2 rounded-2xl border border-border p-4">
    <div class="flex items-center gap-2 text-sm">
      <UiIcon name="lucide:file-spreadsheet" class="size-4 text-theme" />
      <span class="flex-1 truncate font-medium">spring-cup-roster.csv</span>
      <span class="text-theme">{{ progress }}%</span>
    </div>
    <UiProgress
      :model-value="progress"
      :variant="progress === 100 ? 'success' : 'default'"
      aria-label="Uploading spring-cup-roster.csv"
    />
    <p class="text-xs text-theme">
      {{ progress === 100 ? "Roster imported" : "Uploading roster..." }}
    </p>
  </div>
</template>
