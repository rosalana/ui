<script setup lang="ts">
import { UiResizableHandle, UiResizablePanel, UiResizablePanelGroup } from "@rosalana/ui";
</script>

<template>
  <UiResizablePanelGroup direction="vertical" class="h-80 w-full rounded-xl border">
    <UiResizablePanel :default-size="25" :min-size="15">
      <div class="p-4 text-sm font-semibold">Bracket</div>
    </UiResizablePanel>
    <UiResizableHandle with-handle />
    <UiResizablePanel :default-size="75">
      <UiResizablePanelGroup direction="horizontal">
        <UiResizablePanel :default-size="50">
          <div class="p-4 text-sm">Group A</div>
        </UiResizablePanel>
        <UiResizableHandle />
        <UiResizablePanel :default-size="50">
          <div class="p-4 text-sm">Group B</div>
        </UiResizablePanel>
      </UiResizablePanelGroup>
    </UiResizablePanel>
  </UiResizablePanelGroup>
</template>
