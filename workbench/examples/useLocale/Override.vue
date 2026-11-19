<script setup lang="ts">
import { useLocale } from "@rosalana/ui";

// A component with its own locale prop passes it as the override, the app locale stays the fallback.
const props = defineProps<{ locale?: string }>();

const { locale, t } = useLocale(() => props.locale);
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-1 rounded-xl border p-4">
    <p class="text-xs text-theme">{{ locale }}</p>
    <p class="text-sm">{{ t("table.empty") }}</p>
  </div>
</template>
