<script setup lang="ts">
import { computed, ref } from "vue";
import { UiInput, UiLabel, useColorConverter } from "@rosalana/ui";

const { parseColor, formatColor, detectFormat } = useColorConverter();

const input = ref("#3b82f6");

// parseColor returns null for anything it can't read, so check before converting.
const color = computed(() => parseColor(input.value));

const formats = computed(() =>
  color.value
    ? (["hex", "rgb", "hsl", "oklch"] as const).map((format) => ({
        format,
        value: formatColor(color.value!, format),
      }))
    : [],
);
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div class="flex flex-col gap-2">
      <UiLabel for="team-color">Team color</UiLabel>
      <UiInput
        id="team-color"
        v-model="input"
        :variant="color ? 'default' : 'destructive'"
        placeholder="#3b82f6, rgb(…), hsl(…) or oklch(…)"
      />
      <p v-if="color" class="text-xs text-theme">Detected as {{ detectFormat(input) }}.</p>
      <p v-else class="text-xs text-destructive">This is not a color we can read.</p>
    </div>
    <ul v-if="color" class="divide-y divide-border rounded-xl border">
      <li v-for="item in formats" :key="item.format" class="flex items-center justify-between gap-4 px-4 py-2">
        <span class="text-xs uppercase text-theme">{{ item.format }}</span>
        <code class="text-sm">{{ item.value }}</code>
      </li>
    </ul>
  </div>
</template>
