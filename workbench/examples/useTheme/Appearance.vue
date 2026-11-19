<script setup lang="ts">
import { onMounted } from "vue";
import { UiButton, UiIcon, useTheme } from "@rosalana/ui";

const theme = useTheme();

// Apply the stored appearance once the browser is there; the server has no document.
onMounted(() => theme.initializeTheme());

const modes = [
  { value: "light", label: "Light", icon: "lucide:sun" },
  { value: "dark", label: "Dark", icon: "lucide:moon" },
  { value: "system", label: "System", icon: "lucide:monitor" },
] as const;
</script>

<template>
  <div class="flex w-full max-w-sm flex-col items-center gap-4">
    <div class="flex flex-wrap justify-center gap-2" role="group" aria-label="Appearance">
      <UiButton
        v-for="mode in modes"
        :key="mode.value"
        :variant="theme.get() === mode.value ? 'default' : 'outline'"
        :aria-pressed="theme.get() === mode.value"
        @click="theme.update(mode.value)"
      >
        <UiIcon :name="mode.icon" />
        {{ mode.label }}
      </UiButton>
    </div>
    <p class="text-center text-sm text-theme">
      Appearance is <strong>{{ theme.get() }}</strong>, the page is currently
      {{ theme.isDark() ? "dark" : "light" }}.
    </p>
  </div>
</template>
