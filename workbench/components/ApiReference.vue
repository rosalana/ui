<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  UiAccordion,
  UiAccordionItem,
  UiAccordionTrigger,
  UiAccordionContent,
  UiCodeBlock,
} from "@rosalana/ui";
import type { ComponentApi, ExportApi } from "../docs/types";
import ComponentApiPanel from "./ComponentApiPanel.vue";
import InlineText from "./InlineText.vue";
import { useDocsLocale } from "../docs/locale";
const props = defineProps<{
  components?: ComponentApi[];
  symbols?: ExportApi[];
}>();
const openParts = ref<string[]>(
  props.components?.length ? [props.components[0].name] : [],
);
const openSymbols = ref<string[]>([]);
function revealAnchor() {
  const anchor = decodeURIComponent(location.hash.split("/").at(-1) ?? "");
  if (anchor.startsWith("component-")) {
    const name = anchor.slice("component-".length);
    if (!openParts.value.includes(name)) openParts.value.push(name);
  }
  if (anchor.startsWith("export-")) {
    const name = anchor.slice("export-".length);
    if (!openSymbols.value.includes(name)) openSymbols.value.push(name);
  }
}
onMounted(() => {
  revealAnchor();
  window.addEventListener("hashchange", revealAnchor);
});
onUnmounted(() => window.removeEventListener("hashchange", revealAnchor));
const { t } = useDocsLocale();
</script>
<template>
  <section
    v-if="components?.length || symbols?.length"
    id="api"
    class="doc-section api-reference"
  >
    <h2>{{ t("api") }}</h2>
    <p class="doc-muted">{{ t("reference") }}</p>
    <UiAccordion v-if="components?.length" type="multiple" v-model="openParts">
      <UiAccordionItem
        v-for="component in components"
        :key="component.name"
        :id="`component-${component.name}`"
        :value="component.name"
      >
        <UiAccordionTrigger class="gap-3">
          <span
            class="flex min-w-0 flex-1 items-center justify-between gap-3 text-left"
          >
            <code>{{ component.name }}</code>
            <span class="shrink-0 text-xs text-theme">
              {{ component.props.length }} {{ t("props").toLowerCase() }}
            </span>
          </span>
        </UiAccordionTrigger>
        <UiAccordionContent>
          <ComponentApiPanel :component="component" />
        </UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>
    <template v-for="kind in ['value', 'type']" :key="kind">
      <template v-if="symbols?.some((symbol) => symbol.kind === kind)">
        <h3>{{ t(kind === "type" ? "types" : "values") }}</h3>
        <UiAccordion v-model="openSymbols" type="multiple">
          <UiAccordionItem
            v-for="symbol in symbols.filter((symbol) => symbol.kind === kind)"
            :key="symbol.name"
            :value="symbol.name"
            :id="`export-${symbol.name}`"
          >
            <UiAccordionTrigger class="gap-3">
              <span
                class="flex min-w-0 flex-1 items-center justify-between gap-3 text-left"
              >
                <code class="break-all">{{ symbol.name }}</code>
                <span class="hidden text-xs text-theme sm:inline">
                  {{ symbol.entry }}
                </span>
              </span>
            </UiAccordionTrigger>
            <UiAccordionContent>
              <p v-if="symbol.description" class="api-description">
                <InlineText :text="symbol.description" />
              </p>
              <UiCodeBlock :code="symbol.declaration" language="ts" />
              <p class="api-file">{{ symbol.file }}</p>
            </UiAccordionContent>
          </UiAccordionItem>
        </UiAccordion>
      </template>
    </template>
  </section>
</template>
