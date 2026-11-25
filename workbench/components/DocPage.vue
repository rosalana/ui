<script setup lang="ts">
import { computed } from "vue";
import {
  UiBadge,
  UiAlert,
  UiAlertTitle,
  UiAlertDescription,
  UiAccordion,
  UiAccordionItem,
  UiAccordionTrigger,
  UiAccordionContent,
  UiCodeBlock,
  UiTocIsland,
  type TocHeading,
} from "@rosalana/ui";
import type { DocPage } from "../docs/types";
import { pagesForSection, sectionForPage } from "../docs/registry";
import { useDocsLocale } from "../docs/locale";
import IntegrationPreview from "./IntegrationPreview.vue";
import ApiReference from "./ApiReference.vue";
import Example from "./Example.vue";
const props = defineProps<{ page: DocPage }>();
const { t } = useDocsLocale();
const contents = computed(() => [
  ...props.page.sections.map((s) => ({ id: s.id, title: s.title })),
  ...(props.page.examples?.length
    ? [
        { id: "examples", title: t("examples") },
        ...props.page.examples.map((e) => ({ id: e.id, title: e.title })),
      ]
    : []),
  ...(props.page.components?.length || props.page.symbols?.length
    ? [{ id: "api", title: t("api") }]
    : []),
]);
const sequence = computed(() => pagesForSection(sectionForPage(props.page)));
const index = computed(() =>
  sequence.value.findIndex((p) => p.id === props.page.id),
);
const previous = computed(() => sequence.value[index.value - 1]);
const next = computed(() => sequence.value[index.value + 1]);
function anchor(id: string) {
  return `#/${props.page.id}/${id}`;
}
const headings = computed<TocHeading[]>(() =>
  contents.value.map((item) => ({
    id: item.id,
    text: item.title,
    level: item.id.startsWith("example-") ? 3 : 2,
  })),
);
// The router lives in the hash, so the heading goes there in its own format.
function onSelect(id: string) {
  history.replaceState(history.state, "", anchor(id));
}
</script>
<template>
  <div class="document-layout">
    <article class="document" :aria-labelledby="'page-heading'">
      <header class="document-header">
        <div class="doc-breadcrumb">
          <a href="#/">{{ t("documentation") }}</a>
          <span aria-hidden="true">/</span>
          <span>{{ page.group }}</span>
        </div>
        <div class="title-row">
          <h1 id="page-heading">{{ page.title }}</h1>
          <UiBadge
            v-if="page.status"
            size="sm"
            :variant="page.status === 'done' ? 'success' : 'warning'"
          >
            {{
              t(
                page.status === "done"
                  ? "ready"
                  : page.status === "untouched"
                    ? "review"
                    : "unavailable",
              )
            }}
          </UiBadge>
          <UiBadge
            v-else-if="page.kind === 'block'"
            size="sm"
            variant="outline"
          >
            {{ t("block") }}
          </UiBadge>
        </div>
        <p class="document-description">{{ page.description }}</p>
      </header>
      <UiAlert
        v-if="page.status && page.status !== 'done'"
        variant="warning"
        class="my-6"
      >
        <UiAlertTitle>
          {{ t(page.status === "untouched" ? "review" : "unavailable") }}
        </UiAlertTitle>
        <UiAlertDescription>
          {{
            t(
              page.status === "untouched"
                ? "warningReview"
                : "warningUnavailable",
            )
          }}
        </UiAlertDescription>
      </UiAlert>
      <UiAlert v-if="page.kind === 'block'" variant="info" class="my-6">
        <UiAlertDescription>{{ t("warningBlock") }}</UiAlertDescription>
      </UiAlert>
      <UiAccordion type="single" collapsible class="mobile-contents">
        <UiAccordionItem value="contents">
          <UiAccordionTrigger>{{ t("onThisPage") }}</UiAccordionTrigger>
          <UiAccordionContent>
            <a v-for="item in contents" :key="item.id" :href="anchor(item.id)">
              {{ item.title }}
            </a>
          </UiAccordionContent>
        </UiAccordionItem>
      </UiAccordion>
      <section
        v-for="section in page.sections"
        :key="section.id"
        :id="section.id"
        class="doc-section"
      >
        <h2>
          <a :href="anchor(section.id)">{{ section.title }}</a>
        </h2>
        <p v-if="section.text" class="doc-paragraph">{{ section.text }}</p>
        <IntegrationPreview
          v-if="
            page.integration && section.id === 'integration' && section.code
          "
          :name="page.id"
          :code="section.code"
        />
        <UiCodeBlock
          v-else-if="section.code"
          :code="section.code"
          :language="section.language ?? 'ts'"
        />
      </section>
      <section v-if="page.examples?.length" id="examples" class="doc-section">
        <h2>
          <a :href="anchor('examples')">{{ t("examples") }}</a>
        </h2>
        <div class="demo-stack">
          <Example
            v-for="example in page.examples"
            :key="page.id + example.file"
            :page="page.id"
            :example="example"
          />
        </div>
      </section>
      <ApiReference :components="page.components" :symbols="page.symbols" />
      <nav class="page-pagination" :aria-label="t('documentation')">
        <a v-if="previous" :href="`#/${previous.id}`">
          <small>← {{ t("back") }}</small>
          <span>{{ previous.title }}</span>
        </a>
        <a v-if="next" :href="`#/${next.id}`" class="next-page">
          <small>{{ t("next") }} →</small>
          <span>{{ next.title }}</span>
        </a>
      </nav>
    </article>
    <UiTocIsland
      class="max-lg:hidden"
      :headings="headings"
      :hash="false"
      :offset="76"
      @select="onSelect"
    />
  </div>
</template>
