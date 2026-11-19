<script setup lang="ts">
import { ref } from "vue";
import { UploadFiles, UiLabel } from "@rosalana/ui";

const roster = ref<File[]>([]);
</script>

<template>
  <div class="grid w-full max-w-md gap-6">
    <div class="flex flex-col gap-3">
      <UiLabel>Team roster</UiLabel>
      <UploadFiles
        v-model="roster"
        :multiple="false"
        accept=".csv,.xlsx"
        title="Drop the roster spreadsheet"
        subtext="A new file replaces the previous one"
      />
    </div>

    <div class="flex flex-col gap-3">
      <UiLabel>Results export</UiLabel>
      <UploadFiles disabled title="Uploads are closed" subtext="The tournament has finished" />
    </div>
  </div>
</template>
