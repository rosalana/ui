<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiCheckbox,
  UiCollapsible,
  UiCollapsibleContent,
  UiCollapsibleTrigger,
  UiLabel,
} from "@rosalana/ui";

const advanced = ref(false);
const online = ref(false);
const free = ref(true);
</script>

<template>
  <UiCollapsible v-model:open="advanced" class="w-full max-w-sm space-y-3">
    <div class="flex items-center gap-2">
      <UiCheckbox id="free" v-model="free" />
      <UiLabel for="free">Only free tournaments</UiLabel>
    </div>

    <UiCollapsibleContent>
      <div class="flex items-center gap-2 pb-1">
        <UiCheckbox id="online" v-model="online" />
        <UiLabel for="online">Played online</UiLabel>
      </div>
    </UiCollapsibleContent>

    <UiCollapsibleTrigger as-child>
      <UiButton variant="link" size="sm" class="px-0">
        {{ advanced ? "Fewer filters" : "More filters" }}
      </UiButton>
    </UiCollapsibleTrigger>
  </UiCollapsible>
</template>
