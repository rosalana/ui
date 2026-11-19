<script setup lang="ts">
import {
  UiButton,
  UiPopover,
  UiPopoverContent,
  UiPopoverTrigger,
} from "@rosalana/ui";

const placements = [
  { side: "top", align: "center" },
  { side: "right", align: "start" },
  { side: "bottom", align: "end" },
  { side: "left", align: "center" },
] as const;
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3 py-12">
    <UiPopover v-for="placement in placements" :key="placement.side">
      <UiPopoverTrigger as-child>
        <UiButton variant="outline" class="capitalize">{{ placement.side }}</UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent
        :side="placement.side"
        :align="placement.align"
        :side-offset="8"
        class="p-4 text-sm"
      >
        Opens on the {{ placement.side }}, aligned to the {{ placement.align }}. Near the
        edge of the screen it flips to the other side on its own.
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>
