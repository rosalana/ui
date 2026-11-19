<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { UiButton, UiLabel, UiSwitch, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const expand = ref(false);
const visible = ref(3);

watch(expand, (value) => sonner.configure({ expand: value }));
watch(visible, (value) => sonner.configure({ visible: value }));

const results = [
  "Falcons won 3:1",
  "Wolves won 2:0",
  "Ravens and Tigers drew 1:1",
  "Bears won 4:2",
  "Hawks won 2:1",
];

function announce() {
  results.forEach((result, index) =>
    setTimeout(() => sonner.default(result, { duration: 8000 }), index * 250),
  );
}

onBeforeUnmount(() => sonner.configure({ expand: false, visible: 3 }));
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div class="flex items-center justify-between gap-4">
      <UiLabel for="stack-expand">Keep the stack expanded</UiLabel>
      <UiSwitch id="stack-expand" v-model="expand" />
    </div>
    <div class="flex items-center justify-between gap-4">
      <UiLabel>Visible toasts</UiLabel>
      <div class="flex gap-1">
        <UiButton
          v-for="count in [1, 3, 5]"
          :key="count"
          size="sm"
          :variant="visible === count ? 'default' : 'outline'"
          :aria-label="`Show ${count} toasts at most`"
          @click="visible = count"
        >
          {{ count }}
        </UiButton>
      </div>
    </div>
    <UiButton @click="announce">Announce the round results</UiButton>
  </div>
</template>
