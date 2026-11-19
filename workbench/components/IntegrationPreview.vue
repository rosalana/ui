<script setup lang="ts">
import {
  UiCodeBlock,
  UiCodeBlockGroup,
  UiCodeBlockPreview,
} from "@rosalana/ui";
import { useDocsLocale } from "../docs/locale";
defineProps<{ name: string; code: string }>();
const { t } = useDocsLocale();
</script>
<template>
  <UiCodeBlockGroup class="example-frame">
    <UiCodeBlockPreview class="block p-0">
      <iframe
        :src="`./preview.html?block=${name}`"
        :title="`${name} — ${t('preview')}`"
        class="integration-preview"
        :style="{ height: name === 'SideNav' ? '520px' : '460px' }"
      />
    </UiCodeBlockPreview>
    <UiCodeBlock :code="code" language="vue" />
  </UiCodeBlockGroup>
</template>
