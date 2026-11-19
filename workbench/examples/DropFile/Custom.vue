<script setup lang="ts">
import { ref } from "vue";
import { UiButton, UiDropfile } from "@rosalana/ui";

const count = ref(0);
</script>

<template>
  <!-- clickable off: only the button opens the file dialog -->
  <UiDropfile
    :clickable="false"
    accept=".pdf"
    class="w-full max-w-md"
    @dropped="count += $event.length"
  >
    <template #default="{ isOverDropZone, open }">
      <div class="flex flex-col items-center gap-3 px-6 py-8 text-center">
        <p class="text-sm font-medium">
          {{ isOverDropZone ? "Let go to attach" : "Drag the rulebook PDF here" }}
        </p>
        <UiButton size="sm" variant="outline" @click="open">Choose files</UiButton>
        <p class="text-xs text-theme">{{ count }} rulebook(s) attached</p>
      </div>
    </template>
  </UiDropfile>
</template>
