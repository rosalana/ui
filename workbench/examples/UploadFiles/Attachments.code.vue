<script setup lang="ts">
import { useForm } from "@inertiajs/vue3";
import { UploadFiles, UiButton, UiLabel, useSonner } from "@rosalana/ui";
import type { UploadFilesRejection } from "@rosalana/ui";

const props = defineProps<{ team: { id: number } }>();

const sonner = useSonner();

const form = useForm<{ documents: File[] }>({ documents: [] });

const reasons = {
  type: "is not a PDF or an image",
  size: "is larger than 5 MB",
  limit: "doesn't fit, 4 files at most",
};

function rejected(rejections: UploadFilesRejection[]) {
  rejections.forEach(({ file, reason }) =>
    sonner.error(`${file.name} ${reasons[reason]}`),
  );
}

// Inertia sends the files as multipart form data. The flash message of the response is the success toast.
function submit() {
  form.post(`/teams/${props.team.id}/documents`, {
    onSuccess: () => form.reset(),
  });
}
</script>

<template>
  <form class="flex w-full max-w-md flex-col gap-3" @submit.prevent="submit">
    <UiLabel>Team documents</UiLabel>
    <UploadFiles
      v-model="form.documents"
      accept="application/pdf,image/*"
      :max-size="5 * 1024 * 1024"
      :max-files="4"
      title="Drop the roster and the consents"
      @rejected="rejected"
    />
    <p v-if="form.errors.documents" class="text-sm text-destructive">
      {{ form.errors.documents }}
    </p>
    <UiButton
      type="submit"
      :loading="form.processing"
      :disabled="!form.documents.length"
      class="self-end"
    >
      Send documents
    </UiButton>
  </form>
</template>
