<script setup lang="ts">
import { ref } from "vue";
import {
  UiLabel,
  UiSelect,
  UiSelectContent,
  UiSelectItem,
  UiSelectTrigger,
  UiSelectValue,
} from "@rosalana/ui";

const format = ref<string>();
</script>

<template>
  <div class="flex w-full max-w-xs flex-col gap-1.5">
    <UiLabel for="tournament-format">Tournament format</UiLabel>
    <UiSelect v-model="format">
      <UiSelectTrigger id="tournament-format">
        <UiSelectValue placeholder="Pick a format" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem value="single">Single elimination</UiSelectItem>
        <UiSelectItem value="double">Double elimination</UiSelectItem>
        <UiSelectItem value="round-robin">Round robin</UiSelectItem>
        <UiSelectItem value="swiss">Swiss system</UiSelectItem>
      </UiSelectContent>
    </UiSelect>
  </div>
</template>
