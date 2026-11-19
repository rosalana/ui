<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from "vue";
import {
  UiButton,
  UiCodeBlock,
  UiCodeBlockGroup,
  UiCodeBlockPreview,
  UiIcon,
} from "@rosalana/ui";
import { useDocsLocale } from "../docs/locale";
import type { DocExampleEntry } from "../docs/types";
import {
  exampleCode,
  exampleComponents,
  examplePath,
} from "../docs/exampleFiles";

const props = defineProps<{ page: string; example: DocExampleEntry }>();

const component = computed(() => {
  const load = exampleComponents[examplePath(props.page, props.example.file)];
  return load ? defineAsyncComponent(load) : undefined;
});
const code = computed(() => exampleCode(props.page, props.example.file));
const { t } = useDocsLocale();

// Mounting the example again brings back its initial state.
const run = ref(0);
</script>

<template>
  <section :id="example.id" class="example-section">
    <h3>{{ example.title }}</h3>
    <p v-if="example.description" class="example-description">
      {{ example.description }}
    </p>
    <UiCodeBlockGroup
      class="example-frame"
      :class="example.overflow && 'allows-overflow'"
    >
      <UiCodeBlockPreview
        class="example-preview"
        :class="`preview-${example.preview ?? 'center'}`"
      >
        <component :is="component" v-if="component" :key="run" />
        <template #actions>
          <UiButton
            variant="ghost"
            size="icon-sm"
            class="size-7 text-theme hover:text-foreground"
            :aria-label="t('resetExample')"
            :tooltip="t('resetExample')"
            @click="run++"
          >
            <UiIcon name="lucide:rotate-ccw" class="size-3.5" />
          </UiButton>
        </template>
      </UiCodeBlockPreview>
      <UiCodeBlock :code="code" language="vue" />
    </UiCodeBlockGroup>
  </section>
</template>
