<script setup lang="ts">
import { ref } from "vue";
import UploadFiles from "../../src/components/Blocks/UploadFiles/index.vue";
import type { UploadFilesRejection } from "../../src/components/Blocks/UploadFiles/types";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import { useSonner } from "../../src/composables/useSonner";
import Section from "../components/Section.vue";

const sonner = useSonner();

const attachments = ref<File[]>([]);
const gallery = ref<File[]>([]);
const avatar = ref<File[]>([]);

const reasons = {
  type: "is not an accepted file type",
  size: "is too large",
  limit: "exceeds the file limit",
};

function onRejected(rejections: UploadFilesRejection[]) {
  rejections.forEach(({ file, reason }) =>
    sonner.error(`${file.name} ${reasons[reason]}`),
  );
}
</script>

<template>
  <div class="flex max-w-xl flex-col gap-10">
    <Section title="Attachments" class="flex flex-col gap-4">
      <UploadFiles v-model="attachments" @rejected="onRejected" />
      <div class="flex justify-end">
        <UiButton :disabled="!attachments.length" arrow>
          Upload {{ attachments.length || "" }}
        </UiButton>
      </div>
    </Section>

    <Section title="Images · max 3 files · 2 MB each">
      <UploadFiles
        v-model="gallery"
        accept="image/*"
        icon="lucide:image-up"
        :max-files="3"
        :max-size="2 * 1024 * 1024"
        @rejected="onRejected"
      />
    </Section>

    <Section title="Single file (replaces previous)">
      <UploadFiles
        v-model="avatar"
        :multiple="false"
        accept="image/*"
        title="Drop your Image"
        @rejected="onRejected"
      />
    </Section>

    <Section title="Disabled">
      <UploadFiles disabled />
    </Section>
  </div>
</template>
