<script setup lang="ts">
import { Actions, UiButton, UiIcon, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const items = [
  {
    label: "Rename",
    icon: "lucide:pencil",
    onClick: () => sonner.default("Rename the project"),
  },
  {
    label: "Duplicate",
    icon: "lucide:copy",
    onClick: () => sonner.success("Project duplicated"),
  },
  {
    label: "Move to",
    icon: "lucide:folder",
    children: [
      { label: "Spring league", onClick: () => sonner.success("Moved to Spring league") },
      { label: "Archive", icon: "lucide:archive", onClick: () => sonner.success("Moved to archive") },
    ],
  },
  { divider: true },
  {
    label: "Delete",
    icon: "lucide:trash-2",
    class: "text-destructive",
    onClick: () => sonner.error("Project deleted"),
  },
];
</script>

<template>
  <div class="flex w-full max-w-sm items-center justify-between rounded-2xl border p-4">
    <div class="flex items-center gap-3">
      <div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <UiIcon name="lucide:trophy" class="size-5" />
      </div>
      <div>
        <p class="text-sm font-medium">Summer cup 2026</p>
        <p class="text-xs text-theme">16 teams</p>
      </div>
    </div>

    <Actions :items="items" label="Project" align="end">
      <template #trigger>
        <UiButton variant="ghost" size="icon-sm" aria-label="Project actions">
          <UiIcon name="lucide:more-horizontal" class="size-4" />
        </UiButton>
      </template>
    </Actions>
  </div>
</template>
