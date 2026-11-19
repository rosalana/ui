<script setup lang="ts">
import { ref } from "vue";
import { UiIcon, UiToggleGroup, UiToggleGroupItem } from "@rosalana/ui";

const formatting = ref(["bold"]);
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <UiToggleGroup v-model="formatting" type="multiple" variant="outline" size="icon-sm">
      <UiToggleGroupItem value="bold" aria-label="Bold">
        <UiIcon name="lucide:bold" />
      </UiToggleGroupItem>
      <UiToggleGroupItem value="italic" aria-label="Italic">
        <UiIcon name="lucide:italic" />
      </UiToggleGroupItem>
      <UiToggleGroupItem value="underline" aria-label="Underline">
        <UiIcon name="lucide:underline" />
      </UiToggleGroupItem>
    </UiToggleGroup>
    <p class="text-sm text-theme">
      Active: {{ formatting.length ? formatting.join(", ") : "none" }}
    </p>
  </div>
</template>
