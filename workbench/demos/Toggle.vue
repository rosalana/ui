<script setup lang="ts">
import { ref } from "vue";
import UiToggle from "../../src/components/Ui/Toggle/Toggle.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";

const bold = ref(false);
const italic = ref(false);
const underline = ref(false);
</script>

<template>
  <div class="space-y-10 max-w-md">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Basic</h2>
      <div class="flex gap-2">
        <UiToggle>Toggle</UiToggle>
        <UiToggle :default-pressed="true">Pressed</UiToggle>
        <UiToggle disabled>Disabled</UiToggle>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Variants</h2>
      <div class="flex gap-2">
        <UiToggle variant="default">Default</UiToggle>
        <UiToggle variant="outline">Outline</UiToggle>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Sizes</h2>
      <div class="flex items-center gap-2">
        <UiToggle size="sm"><UiIcon name="lucide:bold" /></UiToggle>
        <UiToggle size="default"><UiIcon name="lucide:bold" /></UiToggle>
        <UiToggle size="lg"><UiIcon name="lucide:bold" /></UiToggle>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Text Formatting Toolbar</h2>
      <div class="space-y-3">
        <div class="flex gap-1 p-1 rounded-xl border border-muted-200 dark:border-muted-800 w-fit">
          <UiToggle v-model:pressed="bold" size="sm" aria-label="Bold">
            <UiIcon name="lucide:bold" />
          </UiToggle>
          <UiToggle v-model:pressed="italic" size="sm" aria-label="Italic">
            <UiIcon name="lucide:italic" />
          </UiToggle>
          <UiToggle v-model:pressed="underline" size="sm" aria-label="Underline">
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
    </section>
  </div>
</template>
