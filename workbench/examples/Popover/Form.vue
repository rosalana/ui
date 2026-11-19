<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiIcon,
  UiInput,
  UiLabel,
  UiPopover,
  UiPopoverClose,
  UiPopoverContent,
  UiPopoverTrigger,
} from "@rosalana/ui";

const name = ref("Spring Cup");
const draft = ref(name.value);

function save() {
  name.value = draft.value;
}
</script>

<template>
  <UiPopover @update:open="(open) => open && (draft = name)">
    <UiPopoverTrigger as-child>
      <UiButton variant="outline">
        <UiIcon name="lucide:pencil" />
        {{ name }}
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="space-y-3 p-4">
      <div class="space-y-1.5">
        <UiLabel for="tournament-name">Tournament name</UiLabel>
        <UiInput id="tournament-name" v-model="draft" />
      </div>
      <div class="flex justify-end gap-2">
        <UiPopoverClose as-child>
          <UiButton variant="ghost" size="sm">Cancel</UiButton>
        </UiPopoverClose>
        <UiPopoverClose as-child>
          <UiButton size="sm" :disabled="!draft.trim()" @click="save">Save</UiButton>
        </UiPopoverClose>
      </div>
    </UiPopoverContent>
  </UiPopover>
</template>
