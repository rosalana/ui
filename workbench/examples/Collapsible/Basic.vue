<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiCollapsible,
  UiCollapsibleContent,
  UiCollapsibleTrigger,
} from "@rosalana/ui";

const open = ref(false);
</script>

<template>
  <UiCollapsible v-model:open="open" class="w-full max-w-sm space-y-2">
    <div class="flex items-center justify-between gap-4">
      <h4 class="text-sm font-semibold">Spring Cup squad</h4>
      <UiCollapsibleTrigger as-child>
        <UiButton variant="ghost" size="sm" :aria-label="open ? 'Hide the bench' : 'Show the bench'">
          {{ open ? "Hide bench" : "Show bench" }}
        </UiButton>
      </UiCollapsibleTrigger>
    </div>

    <div class="rounded-xl border px-4 py-3 text-sm">Eva Novak, captain</div>

    <UiCollapsibleContent class="space-y-2">
      <div class="rounded-xl border px-4 py-3 text-sm">Tomas Král</div>
      <div class="rounded-xl border px-4 py-3 text-sm">Lucie Horáková</div>
    </UiCollapsibleContent>
  </UiCollapsible>
</template>
