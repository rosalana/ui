<script setup lang="ts">
import { ref } from "vue";
import { UiFrameSelection, UiFrameSelectionItem, UiLabel, UiSwitch } from "@rosalana/ui";

const locked = ref(true);
const selected = ref<string[]>([]);

const photos = ["Opening ceremony", "Group stage", "Semifinal", "Final", "Trophy", "Team photo"];

function onEnd(payload: { selectedKeys: (string | undefined)[] }) {
  selected.value = payload.selectedKeys.filter((key): key is string => !!key);
}
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="flex items-center gap-2">
      <UiSwitch id="lock-gallery" v-model="locked" />
      <UiLabel for="lock-gallery">Lock the gallery</UiLabel>
    </div>

    <UiFrameSelection
      :disabled="locked"
      class="grid grid-cols-3 gap-3 select-none"
      @end:selection="onEnd"
    >
      <UiFrameSelectionItem v-for="photo in photos" :key="photo" :selection-key="photo">
        <div
          class="rounded-xl border px-3 py-6 text-center text-sm"
          :class="selected.includes(photo) ? 'border-primary bg-primary/10' : 'bg-background'"
        >
          {{ photo }}
        </div>
      </UiFrameSelectionItem>
    </UiFrameSelection>
  </div>
</template>
