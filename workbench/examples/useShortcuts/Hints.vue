<script setup lang="ts">
import { defineShortcuts, UiButton, useShortcuts, useSonner } from "@rosalana/ui";

const sonner = useSonner();
const { metaSymbol } = useShortcuts();

function save() {
  sonner.success("Lineup saved");
}

// meta is ctrl outside macOS, and metaSymbol shows the right one.
defineShortcuts({
  meta_s: { usingInput: true, handler: save },
});
</script>

<template>
  <UiButton @click="save">
    Save lineup
    <kbd class="ml-1 rounded-md bg-white/20 px-1.5 py-0.5 text-xs">{{ metaSymbol }} S</kbd>
  </UiButton>
</template>
