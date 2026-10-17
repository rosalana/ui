<script setup lang="ts">
import { ref } from "vue";
import UiToggle from "../../src/components/Ui/Toggle/Toggle.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";
import Section from "workbench/components/Section.vue";

const bold = ref(false);
const italic = ref(false);
const underline = ref(false);
</script>

<template>
  <Section title="Basic" class="max-w-md">
    <div class="flex gap-2">
      <UiToggle>Toggle</UiToggle>
      <UiToggle :default-value="true">Pressed</UiToggle>
      <UiToggle disabled>Disabled</UiToggle>
    </div>
  </Section>

  <Section title="Variants" class="max-w-md">
    <div class="space-y-2">
      <div
        v-for="variant in (['default', 'secondary', 'destructive', 'outline', 'ghost'] as const)"
        :key="variant"
        class="flex gap-2"
      >
        <UiToggle :variant="variant">{{ variant }}</UiToggle>
        <UiToggle :variant="variant" :default-value="true">{{ variant }} on</UiToggle>
      </div>
    </div>
  </Section>

  <Section title="Sizes" class="max-w-md">
    <div class="flex items-center gap-2">
      <UiToggle size="xs" variant="outline">xs</UiToggle>
      <UiToggle size="sm" variant="outline">sm</UiToggle>
      <UiToggle size="default" variant="outline">default</UiToggle>
      <UiToggle size="lg" variant="outline">lg</UiToggle>
    </div>
    <div class="mt-3 flex items-center gap-2">
      <UiToggle size="icon-sm" variant="outline"><UiIcon name="lucide:bold" /></UiToggle>
      <UiToggle size="icon" variant="outline"><UiIcon name="lucide:bold" /></UiToggle>
    </div>
  </Section>

  <Section title="Text Formatting Toolbar" class="max-w-md">
    <div class="space-y-3">
      <div
        class="flex gap-1 p-1 rounded-xl border border-muted-200 dark:border-muted-800 w-fit"
      >
        <UiToggle v-model="bold" size="icon-sm" aria-label="Bold">
          <UiIcon name="lucide:bold" />
        </UiToggle>
        <UiToggle v-model="italic" size="icon-sm" aria-label="Italic">
          <UiIcon name="lucide:italic" />
        </UiToggle>
        <UiToggle v-model="underline" size="icon-sm" aria-label="Underline">
          <UiIcon name="lucide:underline" />
        </UiToggle>
      </div>
      <p
        :class="[
          'text-sm p-3 rounded-lg bg-muted-50 dark:bg-muted-900',
          bold ? 'font-bold' : '',
          italic ? 'italic' : '',
          underline ? 'underline' : '',
        ]"
      >
        The quick brown fox jumps over the lazy dog.
      </p>
    </div>
  </Section>
</template>
