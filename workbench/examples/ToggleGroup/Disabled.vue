<script setup lang="ts">
import { UiToggleGroup, UiToggleGroupItem } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <UiToggleGroup type="single" variant="outline" default-value="solo" disabled>
      <UiToggleGroupItem value="solo">Solo</UiToggleGroupItem>
      <UiToggleGroupItem value="teams">Teams</UiToggleGroupItem>
    </UiToggleGroup>

    <UiToggleGroup type="single" variant="outline" default-value="single">
      <UiToggleGroupItem value="single">Single elimination</UiToggleGroupItem>
      <UiToggleGroupItem value="double" disabled>Double elimination</UiToggleGroupItem>
      <UiToggleGroupItem value="swiss">Swiss</UiToggleGroupItem>
    </UiToggleGroup>
  </div>
</template>
