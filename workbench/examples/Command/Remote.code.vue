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
  useFetch,
} from "@rosalana/ui";

const search = ref("");
const results = ref<{ id: number; name: string }[]>([]);
const loading = ref(false);

let timer: ReturnType<typeof setTimeout> | undefined;

// Wait for a pause in typing before asking the backend.
async function load(term: string) {
  try {
    results.value = await useFetch(`/api/players?search=${encodeURIComponent(term)}`);
  } finally {
    loading.value = false;
  }
}

watch(search, (term) => {
  clearTimeout(timer);
  results.value = [];
  loading.value = !!term;
  if (term) timer = setTimeout(() => load(term), 250);
});
</script>

<template>
  <UiCommand ignore-filter :loading="loading" class="w-full max-w-sm">
    <UiCommandInput v-model="search" placeholder="Search players..." />
    <UiCommandList>
      <UiCommandLoading>Searching...</UiCommandLoading>
      <UiCommandEmpty v-if="search">No players found.</UiCommandEmpty>
      <UiCommandGroup v-if="results.length" heading="Players">
        <UiCommandItem v-for="player in results" :key="player.id" :value="player.name">
          <UiIcon name="lucide:user" />
          {{ player.name }}
        </UiCommandItem>
      </UiCommandGroup>
    </UiCommandList>
  </UiCommand>
</template>
