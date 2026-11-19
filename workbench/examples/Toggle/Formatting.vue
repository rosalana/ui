<script setup lang="ts">
import { computed, ref } from "vue";
import { UiIcon, UiToggle } from "@rosalana/ui";

const bold = ref(false);
const italic = ref(true);
const underline = ref(false);

const textClass = computed(() => [
  bold.value && "font-bold",
  italic.value && "italic",
  underline.value && "underline",
]);
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div class="flex items-center gap-1">
      <UiToggle v-model="bold" variant="ghost" size="icon-sm" aria-label="Bold">
        <UiIcon name="lucide:bold" />
      </UiToggle>
      <UiToggle v-model="italic" variant="ghost" size="icon-sm" aria-label="Italic">
        <UiIcon name="lucide:italic" />
      </UiToggle>
      <UiToggle v-model="underline" variant="ghost" size="icon-sm" aria-label="Underline">
        <UiIcon name="lucide:underline" />
      </UiToggle>
    </div>
    <p :class="textClass">Registration closes on Friday at noon, bring your own racket.</p>
  </div>
</template>
