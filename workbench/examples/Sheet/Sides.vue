<script setup lang="ts">
import {
  UiButton,
  UiSheet,
  UiSheetContent,
  UiSheetDescription,
  UiSheetHeader,
  UiSheetTitle,
  UiSheetTrigger,
} from "@rosalana/ui";

const sheets = [
  { side: "right", title: "Match details", text: "Night Owls vs Red Foxes, Saturday 10:00." },
  { side: "left", title: "Tournaments", text: "Spring Cup, Summer League and the Winter Open." },
  { side: "top", title: "Announcement", text: "Check-in closes in 30 minutes." },
  { side: "bottom", title: "Quick actions", text: "Share the bracket or print the schedule." },
] as const;
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3">
    <UiSheet v-for="sheet in sheets" :key="sheet.side">
      <UiSheetTrigger as-child>
        <UiButton variant="outline" class="capitalize">{{ sheet.side }}</UiButton>
      </UiSheetTrigger>
      <UiSheetContent :side="sheet.side">
        <UiSheetHeader>
          <UiSheetTitle>{{ sheet.title }}</UiSheetTitle>
          <UiSheetDescription>{{ sheet.text }}</UiSheetDescription>
        </UiSheetHeader>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>
