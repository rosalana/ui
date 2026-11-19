<script setup lang="ts">
import { computed, ref } from "vue";
import { UiCard, UiInput, UiButton, UiIcon, UiBadge } from "@rosalana/ui";
import { categories, type DocumentationSection } from "../docs/registry";
import { useDocsLocale } from "../docs/locale";
import { useOverviewSections } from "../docs/overview";

const props = defineProps<{ section: DocumentationSection }>();
const { t } = useDocsLocale();
const sections = useOverviewSections();
const current = computed(() =>
  sections.value.find((section) => section.id === props.section)!,
);
const query = ref("");
const filtered = computed(() =>
  current.value.pages.filter((page) =>
    `${page.title} ${page.description} ${page.symbols?.map((symbol) => symbol.name).join(" ")}`
      .toLowerCase()
      .includes(query.value.toLowerCase()),
  ),
);
const groups = computed(() =>
  categories
    .map((title) => ({
      title,
      pages: filtered.value.filter((page) => page.group === title),
    }))
    .filter((group) => group.pages.length),
);
const categoryCount = computed(
  () => new Set(current.value.pages.map((page) => page.group)).size,
);
const statusLabel = (status: "done" | "untouched" | "unimplemented") =>
  t(
    status === "done"
      ? "ready"
      : status === "untouched"
        ? "review"
        : "unavailable",
  );
</script>

<template>
  <article class="section-index">
    <header class="section-index-header">
      <div class="section-index-breadcrumb">
        <a href="#/">{{ t("documentation") }}</a>
        <UiIcon name="lucide:chevron-right" class="size-3" />
        <span>{{ current.title }}</span>
      </div>
      <div class="section-index-intro">
        <div class="section-index-copy">
          <div class="section-index-title">
            <UiIcon :name="current.icon" class="size-7 text-theme" />
            <h1>{{ current.title }}</h1>
          </div>
          <p>{{ current.description }}</p>
          <div class="section-index-meta">
            <span>
              {{ t("overviewPages") }}
              <strong>{{ current.pages.length }}</strong>
            </span>
            <span v-if="categoryCount > 1">
              {{ t("overviewCategories") }}
              <strong>{{ categoryCount }}</strong>
            </span>
          </div>
        </div>
        <UiCard
          v-if="current.featured"
          as="a"
          :href="`#/${current.featured.id}`"
          class="section-index-start"
        >
          <span class="section-index-start-label">
            {{ t("overviewStartWith") }}
          </span>
          <h2>
            {{ current.featured.title }}
            <UiIcon name="lucide:arrow-up-right" class="size-4 text-theme" />
          </h2>
          <p>{{ current.featured.description }}</p>
          <span class="section-index-start-action">
            {{ t("overviewReadPage") }}
            <UiIcon name="lucide:arrow-right" class="size-3.5" />
          </span>
        </UiCard>
      </div>
    </header>

    <div class="section-index-toolbar">
      <UiInput
        v-model="query"
        class="section-index-search"
        icon="lucide:search"
        :placeholder="t('overviewFilter')"
        :aria-label="t('overviewFilterLabel')"
        show-clear
      />
      <span class="section-index-results" role="status">
        {{ t("overviewResults") }}
        <strong>{{ filtered.length }}</strong>
        <span v-if="query">/ {{ current.pages.length }}</span>
      </span>
    </div>
    <nav
      v-if="groups.length > 1"
      class="section-index-categories"
      :aria-label="t('overviewJumpTo')"
    >
      <UiButton
        v-for="group in groups"
        :key="group.title"
        as="a"
        :href="`#/${section}/${group.title}`"
        variant="ghost"
        size="sm"
      >
        {{ group.title }}
        <span class="text-theme">{{ group.pages.length }}</span>
      </UiButton>
    </nav>

    <div class="section-index-content">
      <section
        v-for="group in groups"
        :id="group.title"
        :key="group.title"
        class="section-index-group"
        :aria-label="group.title"
      >
        <div v-if="groups.length > 1" class="section-index-group-heading">
          <h2>{{ group.title }}</h2>
          <UiBadge variant="outline" size="sm">
            {{ group.pages.length }}
          </UiBadge>
          <span aria-hidden="true" />
        </div>
        <div class="section-index-grid">
          <UiCard
            v-for="page in group.pages"
            :key="page.id"
            as="a"
            :href="`#/${page.id}`"
            class="section-index-entry"
          >
            <div class="section-index-entry-title">
              <h3>{{ page.title }}</h3>
              <UiIcon name="lucide:arrow-up-right" class="size-4 text-theme" />
            </div>
            <p>{{ page.description }}</p>
            <div class="section-index-entry-footer">
              <span v-if="page.status" class="section-index-status">
                <span :class="['status-dot', page.status]" />
                {{ statusLabel(page.status) }}
              </span>
              <span v-else>{{ page.group }}</span>
              <UiIcon
                :name="current.icon"
                class="size-3.5"
                aria-hidden="true"
              />
            </div>
          </UiCard>
        </div>
      </section>
      <div v-if="!groups.length" class="section-index-empty">
        <UiIcon name="lucide:search" class="size-6 text-theme" />
        <h2>{{ t("overviewEmptyTitle") }}</h2>
        <p>{{ t("overviewEmptyDescription") }}</p>
        <UiButton variant="outline" size="sm" @click="query = ''">
          {{ t("reset") }}
        </UiButton>
      </div>
    </div>
    <footer class="section-index-footer">
      <span>@rosalana/ui</span>
      <UiButton as="a" href="#/" variant="ghost" size="sm" arrow-back>
        {{ t("home") }}
      </UiButton>
    </footer>
  </article>
</template>

<style scoped>
.section-index {
  max-width: 1240px;
  margin-inline: auto;
  padding: 42px clamp(24px, 4.3vw, 64px) 32px;
}
.section-index-breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
  color: var(--color-theme);
  font-size: 11px;
}
.section-index-breadcrumb a:hover {
  color: var(--color-foreground);
}
.section-index-breadcrumb > span {
  color: var(--color-foreground);
}
.section-index-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 0.6fr);
  align-items: center;
  gap: 50px;
  margin-bottom: 36px;
}
.section-index-title {
  display: flex;
  align-items: center;
  gap: 16px;
}
.section-index-title h1 {
  margin: 0;
  font-size: 42px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -1.5px;
}
.section-index-copy > p {
  max-width: 52ch;
  margin: 18px 0 22px;
  color: var(--color-theme);
  font-size: 15px;
  line-height: 1.8;
  text-wrap: pretty;
}
.section-index-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  font-size: 11px;
  color: var(--color-theme);
}
.section-index-meta strong {
  margin-left: 6px;
  color: var(--color-foreground);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
.section-index-start {
  display: block;
  min-width: 0;
  padding: 20px 22px;
}
.section-index-start-label {
  color: var(--color-theme);
  font-size: 10px;
}
.section-index-start h2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 9px 0 7px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.2px;
}
.section-index-start p {
  margin: 0;
  font-size: 12px;
  color: var(--color-theme);
  line-height: 1.7;
}
.section-index-start-action {
  display: flex;
  gap: 7px;
  align-items: center;
  margin-top: 16px;
  font-size: 11px;
  font-weight: 500;
  color: var(--color-primary);
}
.section-index-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 20px 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}
.section-index-search {
  width: 100%;
  max-width: 360px;
}
.section-index-results {
  color: var(--color-theme);
  font-size: 11px;
  flex-shrink: 0;
}
.section-index-results strong {
  margin-left: 6px;
  color: var(--color-foreground);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
.section-index-categories {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding: 14px 0 0;
}
.section-index-categories :deep([data-slot="button"]) {
  gap: 9px;
}
.section-index-content {
  padding-top: 30px;
}
.section-index-group {
  scroll-margin-top: 26px;
}
.section-index-group + .section-index-group {
  margin-top: 38px;
}
.section-index-group-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.section-index-group-heading h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.3px;
}
.section-index-group-heading > span:last-child {
  height: 1px;
  flex: 1;
  margin-left: 5px;
  background: var(--color-border);
}
.section-index-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.section-index-entry {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 21px 22px 16px;
}
.section-index-entry-title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.section-index-entry-title h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.15px;
  overflow-wrap: anywhere;
}
.section-index-entry-title > svg {
  flex-shrink: 0;
  margin-top: 3px;
}
.section-index-entry > p {
  flex: 1;
  max-width: 58ch;
  margin: 10px 0 22px;
  font-size: 12px;
  line-height: 1.8;
  color: var(--color-theme);
  text-wrap: pretty;
}
.section-index-entry-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
  color: var(--color-theme);
  font-size: 10px;
}
.section-index-status {
  display: flex;
  align-items: center;
  gap: 7px;
}
.section-index-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 65px 24px;
  text-align: center;
}
.section-index-empty h2 {
  margin: 18px 0 8px;
  font-size: 17px;
  font-weight: 600;
}
.section-index-empty p {
  max-width: 45ch;
  margin: 0 0 22px;
  color: var(--color-theme);
  font-size: 13px;
  line-height: 1.8;
}
.section-index-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 48px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
  color: var(--color-theme);
  font-size: 11px;
}
@media (min-width: 1600px) {
  .section-index-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 1100px) {
  .section-index-intro {
    gap: 24px;
    grid-template-columns: minmax(0, 1fr) minmax(210px, 0.7fr);
  }
  .section-index-title {
    gap: 12px;
  }
  .section-index-title h1 {
    font-size: 36px;
  }
  .section-index-copy > p {
    font-size: 14px;
  }
}
@media (max-width: 950px) {
  .section-index-intro {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 600px) {
  .section-index {
    padding-top: 28px;
  }
  .section-index-breadcrumb {
    margin-bottom: 26px;
  }
  .section-index-intro {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
    margin-bottom: 28px;
  }
  .section-index-title h1 {
    font-size: 36px;
  }
  .section-index-copy > p {
    margin-bottom: 18px;
  }
  .section-index-start {
    padding: 18px 20px;
  }
  .section-index-start p {
    display: none;
  }
  .section-index-start-action {
    margin-top: 12px;
  }
  .section-index-toolbar {
    gap: 12px;
    flex-wrap: wrap;
    padding-block: 16px;
  }
  .section-index-search {
    max-width: none;
  }
  .section-index-categories {
    padding-top: 12px;
  }
  .section-index-content {
    padding-top: 24px;
  }
  .section-index-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }
  .section-index-entry {
    padding: 20px;
  }
}
</style>
