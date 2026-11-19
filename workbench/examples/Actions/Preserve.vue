<script setup lang="ts">
import { ref } from "vue";
import { Actions, UiButton, UiIcon } from "@rosalana/ui";

const open = ref(false);
const pinned = ref(false);
const muted = ref(false);

// preserve keeps the menu open after the item is chosen.
const items = () => [
  {
    label: pinned.value ? "Unpin match" : "Pin match",
    icon: pinned.value ? "lucide:pin-off" : "lucide:pin",
    preserve: true,
    onClick: () => (pinned.value = !pinned.value),
  },
  {
    label: muted.value ? "Unmute notifications" : "Mute notifications",
    icon: muted.value ? "lucide:bell" : "lucide:bell-off",
    preserve: true,
    onClick: () => (muted.value = !muted.value),
  },
  { divider: true },
  { label: "Close", icon: "lucide:x", onClick: () => (open.value = false) },
];
</script>

<template>
  <Actions v-model:open="open" :items="items" label="Falcons vs. Wolves" align="start">
    <template #trigger>
      <UiButton variant="outline">
        <UiIcon :name="pinned ? 'lucide:pin' : 'lucide:settings-2'" class="size-4" />
        Match settings
      </UiButton>
    </template>
  </Actions>
</template>
