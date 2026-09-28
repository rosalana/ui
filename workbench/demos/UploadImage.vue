<script setup lang="ts">
import { ref } from "vue";
import UploadImage from "../../src/components/Blocks/UploadImage/index.vue";
import { useSonner } from "../../src/composables/useSonner";
import Section from "../components/Section.vue";

const sonner = useSonner();

const avatar = ref<File | null>(null);
const cover = ref<File | null>(null);
const free = ref<File | null>(null);
const existing = ref<File | null>(null);
const bound = ref<File | null>(null);
const instant = ref<File | null>(null);
const boundEditing = ref(false);

const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f472b6"/><stop offset="1" stop-color="#6366f1"/></linearGradient></defs><rect width="300" height="300" fill="url(#g)"/><text x="150" y="175" font-family="sans-serif" font-size="96" font-weight="600" fill="white" text-anchor="middle">R</text></svg>`,
)}`;

function onCropped(file: File) {
  sonner.success(`${file.name} ready`, {
    description: `${(file.size / 1024).toFixed(0)} KB · ${file.type}`,
  });
}

function onRejected(file: File, reason: "type" | "size") {
  sonner.error(
    reason === "size" ? `${file.name} is too large` : `${file.name} is not an image`,
  );
}
</script>

<template>
  <div class="flex max-w-xl flex-col gap-10">
    <Section title="Avatar · 1:1 · round · filters">
      <UploadImage
        v-model="avatar"
        :aspect-ratio="1"
        radius="full"
        :size="512"
        filters
        :max-size="10 * 1024 * 1024"
        title="Upload a profile picture"
        @cropped="onCropped"
        @rejected="onRejected"
      />
    </Section>

    <Section title="Cover · 16:9 · brightness & contrast only">
      <UploadImage
        v-model="cover"
        :aspect-ratio="16 / 9"
        radius="xl"
        :filters="['brightness', 'contrast']"
        :presets="false"
        format="image/jpeg"
        @cropped="onCropped"
        @rejected="onRejected"
      />
    </Section>

    <Section title="User picks the aspect ratio · no rotate/flip">
      <UploadImage
        v-model="free"
        :rotate="false"
        :flip="false"
        radius="md"
        @cropped="onCropped"
        @rejected="onRejected"
      />
    </Section>

    <Section title="For profile picture">
      <UploadImage
        v-model="free"
        radius="full"
        :aspect-ratio="1"
        @cropped="onCropped"
        @rejected="onRejected"
      />
    </Section>

    <Section title="Existing image (src)">
      <UploadImage
        v-model="existing"
        :src="placeholder"
        :aspect-ratio="1"
        radius="full"
        filters
        @cropped="onCropped"
      />
    </Section>

    <Section title="Bound editing state (v-model:editing)">
      <div class="flex flex-col gap-3">
        <p class="text-theme text-xs">
          Editor is {{ boundEditing ? "open" : "closed" }} — parents can use this to hide their own UI.
        </p>
        <UploadImage
          v-model="bound"
          v-model:editing="boundEditing"
          :aspect-ratio="1"
          radius="full"
        />
      </div>
    </Section>

    <Section title="Skip editor · crop later">
      <UploadImage
        v-model="instant"
        :aspect-ratio="1"
        radius="full"
        skip-editor
        @cropped="onCropped"
        @rejected="onRejected"
      />
    </Section>

    <Section title="Disabled">
      <UploadImage disabled />
    </Section>
  </div>
</template>
