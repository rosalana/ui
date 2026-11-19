<script setup lang="ts">
import { ref, watch } from "vue";
import {
  UiCommand,
  UiCommandEmpty,
  UiCommandGroup,
  UiCommandInput,
  UiCommandItem,
  UiCommandList,
  UiCommandLoading,
  UiIcon,
} from "@rosalana/ui";

const players = [
  "Anna Nováková",
  "Jan Svoboda",
  "Petr Dvořák",
  "Eva Černá",
  "Tomáš Procházka",
  "Anežka Králová",
];

const search = ref("");
const results = ref<string[]>([]);
const loading = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

// A timeout simulates the request: the app code calls the backend with useFetch.
watch(search, (term) => {
  clearTimeout(timer);
  results.value = [];
  loading.value = false;
  if (!term) return;

  loading.value = true;
  timer = setTimeout(() => {
    results.value = players.filter((p) => p.toLowerCase().includes(term.toLowerCase()));
    loading.value = false;
  }, 700);
});
</script>

<template>
  <UiCommand ignore-filter :loading="loading" class="w-full max-w-sm">
    <UiCommandInput v-model="search" placeholder="Search players..." />
    <UiCommandList>
      <UiCommandLoading>Searching...</UiCommandLoading>
      <UiCommandEmpty v-if="search">No players found.</UiCommandEmpty>
      <UiCommandGroup v-if="results.length" heading="Players">
        <UiCommandItem v-for="player in results" :key="player" :value="player">
          <UiIcon name="lucide:user" />
          {{ player }}
        </UiCommandItem>
      </UiCommandGroup>
    </UiCommandList>
  </UiCommand>
</template>
