<script setup lang="ts">
import { ref } from "vue";
import { UiDropfile } from "@rosalana/ui";

const files = ref<File[]>([]);
const rejected = ref(0);

function onDropped(dropped: File[]) {
  rejected.value = 0;
  files.value = dropped;
}
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <UiDropfile
      accept="image/*"
      title="Drop the team photos here"
      subtext="or click to browse, images only"
      @dropped="onDropped"
      @rejected="rejected = $event.length"
    />
    <p v-if="rejected" class="text-xs text-destructive">
      {{ rejected }} file(s) skipped, only images are accepted.
    </p>
    <ul v-if="files.length" class="flex flex-col gap-1 text-sm">
      <li v-for="file in files" :key="file.name" class="truncate">{{ file.name }}</li>
    </ul>
  </div>
</template>
