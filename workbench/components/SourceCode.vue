<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiIcon,
  UiCollapsible,
  UiCollapsibleTrigger,
  UiCollapsibleContent,
  UiCodeBlock,
} from "@rosalana/ui";
import { useDocsLocale } from "../docs/locale";
const props = defineProps<{ file: string }>();
const sources = import.meta.glob<string>("../../src/components/**/*.vue", {
  query: "?raw",
  import: "default",
});
const code = ref(""),
  error = ref(false),
  open = ref(false);
const { t } = useDocsLocale();
async function load(value: boolean) {
  open.value = value;
  if (!value || code.value) return;
  try {
    const key = Object.keys(sources).find(
      (path) => path.toLowerCase() === ("../../" + props.file).toLowerCase(),
    );
    if (key) code.value = await sources[key]();
    else error.value = true;
  } catch {
    error.value = true;
  }
}
</script>
<template>
  <UiCollapsible :open="open" @update:open="load" class="component-source">
    <UiCollapsibleTrigger as-child>
      <UiButton variant="ghost" size="sm">
        <UiIcon :name="open ? 'lucide:chevron-up' : 'lucide:code'" />
        {{ t("viewSource") }}
      </UiButton>
    </UiCollapsibleTrigger>
    <UiCollapsibleContent class="mt-3">
      <p v-if="error" class="doc-muted" role="alert">{{ t("exampleError") }}</p>
      <UiCodeBlock v-else-if="code" :code="code" language="vue" />
      <p v-else role="status" class="doc-muted">{{ t("loading") }}</p>
    </UiCollapsibleContent>
  </UiCollapsible>
</template>
