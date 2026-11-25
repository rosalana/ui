<script setup lang="ts">
import { UiResizableHandle, UiResizablePanel, UiResizablePanelGroup } from "@rosalana/ui";
</script>

<template>
  <!-- The group fills its parent, so the parent sets the size -->
  <div class="h-64 w-full overflow-hidden rounded-xl border border-border">
    <UiResizablePanelGroup direction="horizontal">
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
  </div>
</template>
