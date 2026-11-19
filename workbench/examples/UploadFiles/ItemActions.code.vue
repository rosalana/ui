<script setup lang="ts">
import { ref } from "vue";
import { router } from "@inertiajs/vue3";
import { UploadFiles, UiButton, UiIcon } from "@rosalana/ui";

const files = ref<File[]>([]);
const sent = ref(new Set<File>());

function send(file: File) {
  router.post(
    "/match-reports",
    { report: file },
    {
      preserveScroll: true,
      onSuccess: () => (sent.value = new Set(sent.value).add(file)),
    },
  );
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
