<script setup lang="ts">
import { Dump } from "@rosalana/ui";

// Stands in for usePage().props, see the Code tab for the real usage.
const props = {
  auth: { user: { id: 7, name: "Eliska Novakova" } },
  preferences: { theme: "dark", locale: "cs" },
  flash: { success: null },
};
</script>

<template>
  <Dump :dump="props" title="Page props" :auto-collapse="1" class="w-full" />
</template>
