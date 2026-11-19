<script setup lang="ts">
import { UiIcon, UiToggleGroup, UiToggleGroupItem } from "@rosalana/ui";

const sizes = ["xs", "sm", "default", "lg"] as const;
const iconSizes = ["icon-sm", "icon"] as const;
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <UiToggleGroup
      v-for="size in sizes"
      :key="size"
      type="single"
      variant="outline"
      :size="size"
      default-value="teams"
    >
      <UiToggleGroupItem value="teams">Teams</UiToggleGroupItem>
      <UiToggleGroupItem value="players">Players</UiToggleGroupItem>
    </UiToggleGroup>

    <UiToggleGroup
      v-for="size in iconSizes"
      :key="size"
      type="single"
      variant="outline"
      :size="size"
      default-value="list"
    >
      <UiToggleGroupItem value="list" aria-label="List view">
        <UiIcon name="lucide:list" />
      </UiToggleGroupItem>
      <UiToggleGroupItem value="grid" aria-label="Grid view">
        <UiIcon name="lucide:layout-grid" />
      </UiToggleGroupItem>
    </UiToggleGroup>
  </div>
</template>
