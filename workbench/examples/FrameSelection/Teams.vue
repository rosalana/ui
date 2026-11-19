<script setup lang="ts">
import { computed, ref } from "vue";
import { UiButton, UiFrameSelection, UiFrameSelectionItem } from "@rosalana/ui";

const teams = [
  { id: 1, name: "Falcons", city: "Brno" },
  { id: 2, name: "Wolves", city: "Prague" },
  { id: 3, name: "Otters", city: "Ostrava" },
  { id: 4, name: "Lynx", city: "Plzen" },
  { id: 5, name: "Bears", city: "Olomouc" },
  { id: 6, name: "Hawks", city: "Liberec" },
  { id: 7, name: "Foxes", city: "Zlin" },
  { id: 8, name: "Owls", city: "Pardubice" },
];

const selected = ref<string[]>([]);
const dragging = ref(false);

const isSelected = (id: number) => selected.value.includes(String(id));
const label = computed(() =>
  selected.value.length === 1 ? "Invite 1 team" : `Invite ${selected.value.length} teams`,
);

// Called while the frame is dragged and once more when it is released.
function onSelection(payload: { selectedKeys: (string | undefined)[] }) {
  selected.value = payload.selectedKeys.filter((key): key is string => !!key);
}
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <UiFrameSelection
      class="grid grid-cols-2 gap-3 select-none sm:grid-cols-4"
      @selecting="dragging = $event"
      @update:selection="onSelection"
      @end:selection="onSelection"
    >
      <UiFrameSelectionItem v-for="team in teams" :key="team.id" :selection-key="team.id">
        <div
          class="rounded-xl border p-3 transition-colors"
          :class="isSelected(team.id) ? 'border-primary bg-primary/10' : 'bg-background'"
        >
          <p class="font-medium">{{ team.name }}</p>
          <p class="text-xs text-theme">{{ team.city }}</p>
        </div>
      </UiFrameSelectionItem>
    </UiFrameSelection>

    <div class="flex items-center justify-between gap-3">
      <p class="text-sm text-theme">
        {{ dragging ? "Selecting..." : "Drag a frame over the teams, or click one." }}
      </p>
      <UiButton size="sm" :disabled="!selected.length">{{ label }}</UiButton>
    </div>
  </div>
</template>
