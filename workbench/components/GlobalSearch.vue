<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  UiCommandDialog,
  UiCommandInput,
  UiCommandList,
  UiCommandItem,
  UiCommandEmpty,
  UiCommandGroup,
  UiBadge,
  UiIcon,
} from "@rosalana/ui";
import { searchDocumentation, searchResultTypes } from "../docs/search";
import { useDocsLocale } from "../docs/locale";
const open = defineModel<boolean>("open", { default: false });
const { t } = useDocsLocale();
const query = ref("");
const results = computed(() => searchDocumentation(query.value));
const groupLabels = {
  page: "searchPages",
  section: "searchSections",
  example: "examples",
  component: "searchComponents",
  prop: "props",
  event: "events",
  value: "values",
  type: "types",
} as const;
const groups = computed(() =>
  searchResultTypes
    .map((type) => ({
      type,
      heading: t(groupLabels[type]),
      items: results.value.filter((result) => result.type === type),
    }))
    .filter((group) => group.items.length),
);
const sectionTitle = (section: string) =>
  t(
    section === "blocks"
      ? "blocksSection"
      : (section as Parameters<typeof t>[0]),
  );
watch(open, (value) => {
  if (value) query.value = "";
});
function navigate(href: string) {
  open.value = false;
  location.hash = href;
}
</script>
<template>
  <UiCommandDialog
    v-model:open="open"
    ignore-filter
    :title="t('searchLabel')"
    :description="t('search')"
  >
    <UiCommandInput
      v-model="query"
      :placeholder="t('search')"
      :aria-label="t('searchLabel')"
    />
    <UiCommandList class="max-h-[min(60vh,480px)]">
      <UiCommandEmpty>{{ t("noResults") }}</UiCommandEmpty>
      <UiCommandGroup
        v-for="group in groups"
        :key="group.type"
        :heading="group.heading"
      >
        <UiCommandItem
          v-for="result in group.items"
          :key="result.id"
          :value="result.id"
          @select="navigate(result.href)"
        >
          <UiIcon
            :name="result.id.includes('/') ? 'lucide:hash' : 'lucide:file-text'"
            class="text-theme"
          />
          <span class="min-w-0 flex-1">
            <span class="block truncate font-medium">{{ result.title }}</span>
            <span class="mt-0.5 block truncate text-xs text-theme">
              {{ result.detail }}
            </span>
          </span>
          <UiBadge variant="outline" size="sm" class="shrink-0">
            {{ sectionTitle(result.section) }}
          </UiBadge>
        </UiCommandItem>
      </UiCommandGroup>
    </UiCommandList>
  </UiCommandDialog>
</template>
