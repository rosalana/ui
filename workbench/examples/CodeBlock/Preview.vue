<script setup lang="ts">
import { ref } from "vue";
import { UiButton, UiCodeBlock, UiCodeBlockGroup, UiCodeBlockPreview, UiIcon } from "@rosalana/ui";

const count = ref(0);

const code = `<script setup lang="ts">
import { ref } from "vue";
import { UiButton } from "@rosalana/ui";

const count = ref(0);
<\/script>

<template>
  <UiButton @click="count++">Goals scored: {{ count }}</UiButton>
</template>`;
</script>

<template>
  <UiCodeBlockGroup class="w-full max-w-xl">
    <UiCodeBlockPreview>
      <UiButton @click="count++">Goals scored: {{ count }}</UiButton>
      <template #actions>
        <UiButton size="icon-sm" variant="ghost" aria-label="Reset" @click="count = 0">
          <UiIcon name="lucide:rotate-ccw" />
        </UiButton>
      </template>
    </UiCodeBlockPreview>
    <UiCodeBlock :code="code" language="vue" filename="Counter.vue" label="Code" />
  </UiCodeBlockGroup>
</template>
