<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { UiButton, useSonner, type SonnerPosition } from "@rosalana/ui";

const sonner = useSonner();

const positions: SonnerPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];
const active = ref<SonnerPosition>("bottom-right");

function move(position: SonnerPosition) {
  active.value = position;
  sonner.configure({ position });
  sonner.dismiss();
  sonner.success("Schedule published", { description: `Toasts now appear at ${position}.` });
}

// The toaster is shared by the whole app, so give it back as it was.
onBeforeUnmount(() => sonner.configure({ position: "bottom-right" }));
</script>

<template>
  <div class="grid w-full max-w-sm grid-cols-3 gap-2">
    <UiButton
      v-for="position in positions"
      :key="position"
      size="sm"
      :variant="active === position ? 'default' : 'outline'"
      @click="move(position)"
    >
      {{ position }}
    </UiButton>
  </div>
</template>
