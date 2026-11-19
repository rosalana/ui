<script setup lang="ts">
import { Actions, UiButton } from "@rosalana/ui";

// Nothing is allowed here, e.g. a viewer without any permissions.
const items = [
  { label: "Edit match", hidden: true },
  { label: "Cancel match", hidden: true },
];
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Actions :items="items">
      <template #trigger>
        <UiButton variant="outline">With empty state</UiButton>
      </template>
    </Actions>

    <Actions :items="items" :show-empty-state="false">
      <template #trigger>
        <UiButton variant="outline">Without (rendered nothing)</UiButton>
      </template>
    </Actions>
  </div>
</template>
