<script setup lang="ts">
import { ref } from "vue";
import UiDropFile from "../../src/components/Ui/DropFile/DropFile.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";
import Section from "../components/Section.vue";

const dropped = ref<File[]>([]);
const rejected = ref<File[]>([]);
</script>

<template>
  <div class="flex max-w-xl flex-col gap-10">
    <Section title="Default" class="flex flex-col gap-3">
      <UiDropFile @dropped="dropped = $event" @rejected="rejected = $event" />
      <p v-if="dropped.length" class="text-theme text-xs">
        Last drop: {{ dropped.map((f) => f.name).join(", ") }}
      </p>
    </Section>

    <Section title="Images only, single file" class="flex flex-col gap-3">
      <UiDropFile
        accept="image/*"
        :multiple="false"
        icon="lucide:image-up"
        title="Drop a cover image"
        subtext="PNG, JPG or WEBP"
        @dropped="dropped = $event"
        @rejected="rejected = $event"
      />
      <p v-if="rejected.length" class="text-destructive text-xs">
        Rejected: {{ rejected.map((f) => f.name).join(", ") }}
      </p>
    </Section>

    <Section title="Disabled">
      <UiDropFile disabled subtext="Uploads are paused" />
    </Section>

    <Section title="Custom content">
      <UiDropFile class="py-6">
        <template #default="{ isOverDropZone }">
          <div class="flex items-center gap-3 text-sm">
            <UiIcon
              :name="isOverDropZone ? 'lucide:hand' : 'lucide:paperclip'"
              class="text-primary size-5"
            />
            <span>{{ isOverDropZone ? "Let go!" : "Attach files" }}</span>
          </div>
        </template>
      </UiDropFile>
    </Section>
  </div>
</template>
