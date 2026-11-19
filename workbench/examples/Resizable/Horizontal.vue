<script setup lang="ts">
import { UiResizableHandle, UiResizablePanel, UiResizablePanelGroup } from "@rosalana/ui";
</script>

<template>
  <UiResizablePanelGroup
    direction="horizontal"
    class="h-64 w-full rounded-xl border"
  >
    <UiResizablePanel :default-size="30" :min-size="20">
      <div class="p-4 text-sm">
        <p class="font-semibold">Teams</p>
        <p class="text-theme">Falcons, Otters, Wolves</p>
      </div>
    </UiResizablePanel>
    <UiResizableHandle with-handle />
    <UiResizablePanel :default-size="70" :min-size="30">
      <div class="p-4 text-sm">
        <p class="font-semibold">Falcons</p>
        <p class="text-theme">Next match on Saturday at 10:00.</p>
      </div>
    </UiResizablePanel>
  </UiResizablePanelGroup>
</template>
