<script setup lang="ts">
import { ref } from "vue";
import { UploadFiles, UiButton, UiIcon, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const files = ref<File[]>([]);
const sent = ref(new Set<File>());

// Stands in for the request that uploads one file.
function send(file: File) {
  setTimeout(() => {
    sent.value = new Set(sent.value).add(file);
    sonner.success(`${file.name} sent`);
  }, 800);
}
</script>

<template>
  <div class="w-full max-w-md">
    <UploadFiles v-model="files" title="Drop the match reports">
      <template #item-actions="{ file }">
        <UiIcon v-if="sent.has(file)" name="lucide:check" class="size-4 text-success" />
        <UiButton v-else variant="outline" size="xs" type="button" @click="send(file)">
          Send
        </UiButton>
      </template>
    </UploadFiles>
  </div>
</template>
