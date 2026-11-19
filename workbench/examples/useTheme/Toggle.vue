<script setup lang="ts">
import { onMounted } from "vue";
import { UiButton, UiIcon, useTheme } from "@rosalana/ui";

const theme = useTheme();
onMounted(() => theme.initializeTheme());

function toggle() {
  return theme.update(theme.isDark() ? "light" : "dark");
}
</script>

<template>
  <UiButton variant="ghost" size="icon" aria-label="Toggle dark mode" @click="toggle">
    <UiIcon :name="theme.isDark() ? 'lucide:sun' : 'lucide:moon'" />
  </UiButton>
</template>
