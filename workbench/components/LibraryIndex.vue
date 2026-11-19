<script setup lang="ts">
import { computed, ref } from "vue";
import { UiCard, UiInput } from "@rosalana/ui";
import {
  categories,
  pagesForSection,
  type DocumentationSection,
} from "../docs/registry";
import { useDocsLocale } from "../docs/locale";
const props = defineProps<{ section: DocumentationSection }>();
const { t } = useDocsLocale();
const query = ref("");
const title = computed(() =>
  t(props.section === "blocks" ? "blocksSection" : props.section),
);
const descriptions: Record<DocumentationSection, string> = {
  guides:
    "Installation, design principles, theming and application integration. Start here to connect the library to your project.",
  components:
    "Composable UI primitives. Browse forms, actions, navigation, overlays and data display, with live examples and API references.",
  blocks:
    "Ready-made application patterns built from Rosalana primitives: tables, navigation, uploads, actions and text effects.",
  composables:
    "Shared Vue logic for application state, selection, tables, notifications and localization.",
  helpers:
    "Small functions for text, dates, time zones, locale codes and model modifiers. Import from @rosalana/ui/helpers.",
};
const filtered = computed(() =>
  pagesForSection(props.section).filter((page) =>
    `${page.title} ${page.description} ${page.symbols?.map((s) => s.name).join(" ")}`
      .toLowerCase()
      .includes(query.value.toLowerCase()),
  ),
);
const groups = computed(() =>
  categories.filter((group) =>
    filtered.value.some((page) => page.group === group),
  ),
);
</script>
<template>
  <article class="library-index">
    <header class="document-header">
      <div class="doc-breadcrumb">
        <a href="#/">{{ t("documentation") }}</a>
        <span>/</span>
        <span>{{ title }}</span>
      </div>
      <h1>{{ title }}</h1>
      <p class="document-description">{{ descriptions[section] }}</p>
      <UiInput
        v-model="query"
        class="index-search"
        icon="lucide:search"
        :placeholder="t('search')"
        :aria-label="t('searchLabel')"
      />
    </header>
    <nav v-if="groups.length > 1" class="index-groups">
      <a v-for="group in groups" :href="`#/${section}/${group}`" :key="group">
        {{ group }}
      </a>
    </nav>
    <section
      v-for="group in groups"
      :id="group"
      :key="group"
      class="home-section"
    >
      <h2 v-if="groups.length > 1">{{ group }}</h2>
      <div class="component-grid">
        <UiCard
          as="a"
          v-for="page in filtered.filter((page) => page.group === group)"
          :key="page.id"
          :href="`#/${page.id}`"
        >
          <div>
            <h3>{{ page.title }}</h3>
            <span
              v-if="page.status"
              :class="['status-dot', page.status]"
              :title="
                t(
                  page.status === 'done'
                    ? 'ready'
                    : page.status === 'untouched'
                      ? 'review'
                      : 'unavailable',
                )
              "
            />
          </div>
          <p>{{ page.description }}</p>
        </UiCard>
      </div>
    </section>
    <p v-if="!groups.length" class="doc-muted">{{ t("noResults") }}</p>
  </article>
</template>
