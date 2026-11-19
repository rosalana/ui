<script setup lang="ts">
import { ref } from "vue";
import { UiDropfile } from "@rosalana/ui";

const roster = ref<string>();
</script>

<template>
  <div class="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
    <!-- multiple off takes one file, accept narrows the types by extension or MIME type -->
    <UiDropfile
      :multiple="false"
      accept=".csv"
      icon="lucide:file-spreadsheet"
      title="Import the roster"
      subtext="A single .csv file"
      @dropped="roster = $event[0].name"
    >
      <template v-if="roster" #message>
        <div class="px-6 py-10 text-center text-sm">
          <p class="font-medium">{{ roster }}</p>
          <p class="text-xs text-theme">Drop another file to replace it.</p>
        </div>
      </template>
    </UiDropfile>
    <UiDropfile disabled title="Uploads are closed" subtext="The tournament has already started" />
  </div>
</template>
