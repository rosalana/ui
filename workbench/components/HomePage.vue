<script setup lang="ts">
import { computed, ref } from "vue";
import {
  UiButton,
  UiBadge,
  UiSwitch,
  UiInput,
  UiLabel,
  UiAvatar,
  UiAvatarFallback,
  UiCard,
  UiToggleGroup,
  UiToggleGroupItem,
  UiIcon,
  useSonner,
  UiCodeBlock,
} from "@rosalana/ui";
import { pages } from "../docs/registry";
import { useDocsLocale } from "../docs/locale";
const { t } = useDocsLocale();
const notify = ref(true),
  title = ref("A little room for big ideas");
const sonner = useSonner();
const families = pages.filter((p) => p.kind === "component");
const blocks = pages.filter((p) => p.kind === "block");
const tools = pages.filter((p) => p.kind === "tool");
const category = ref("All"),
  query = ref("");
const groups = [
  "All",
  "Actions",
  "Forms",
  "Date & time",
  "Data display",
  "Feedback",
  "Overlays",
  "Navigation",
  "Layout",
  "Blocks",
];
const library = computed(() =>
  pages.filter(
    (p) =>
      ["component", "block"].includes(p.kind) &&
      (category.value === "All" || p.group === category.value) &&
      `${p.title} ${p.description}`
        .toLowerCase()
        .includes(query.value.toLowerCase()),
  ),
);
const installation = `import { createRosalanaApp } from '@rosalana/ui';
import '@rosalana/ui/tailwind.css';

app.use(createRosalanaApp, {
  name: 'Your next idea',
  locale: 'en',
  colors: { primary: { color: 'blue' } },
});`;
</script>
<template>
  <div class="home-page">
    <section class="home-intro">
      <div class="home-copy">
        <div class="home-package">
          <span class="brand-mark small" aria-hidden="true">r</span>
          <code>@rosalana/ui</code>
        </div>
        <h1>{{ t("homeTitle") }}</h1>
        <p>{{ t("homeDescription") }}</p>
        <div class="home-actions">
          <UiButton as="a" href="#/installation" arrow>
            {{ t("getStarted") }}
          </UiButton>
          <UiButton as="a" href="#/components" variant="outline">
            {{ t("browse") }}
          </UiButton>
        </div>
        <p class="home-internal-note">
          {{ t("internalNote") }}
          <a href="#/introduction">{{ t("aboutLibrary") }}</a>
        </p>
        <div class="home-tech">
          <span>Vue 3</span>
          <span>Tailwind CSS 4</span>
          <span>reka-ui</span>
          <span>motion-v</span>
        </div>
      </div>
      <UiCard class="home-specimen">
        <div class="specimen-top">
          <span class="specimen-dots" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span>workspace.vue</span>
          <span class="specimen-live">{{ t("preview") }}</span>
        </div>
        <div class="specimen-content">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UiAvatar class="size-10">
                <UiAvatarFallback>R</UiAvatarFallback>
              </UiAvatar>
              <div>
                <p class="font-semibold">Your creative space</p>
                <p class="text-xs text-theme">Made with Rosalana</p>
              </div>
            </div>
            <UiBadge variant="outline">Personal</UiBadge>
          </div>
          <div class="specimen-divider"></div>
          <div class="space-y-2">
            <UiLabel for="workspace-title">Workspace name</UiLabel>
            <UiInput id="workspace-title" v-model="title" />
          </div>
          <div class="flex items-center justify-between gap-4">
            <div>
              <UiLabel for="workspace-notify">Keep me in the loop</UiLabel>
              <p class="mt-1 text-xs text-theme">
                A little update when something changes.
              </p>
            </div>
            <UiSwitch id="workspace-notify" v-model="notify" />
          </div>
          <div class="specimen-divider"></div>
          <div class="flex justify-end gap-2">
            <UiButton variant="ghost" @click="title = ''">Reset</UiButton>
            <UiButton
              arrow
              @click="sonner.success('Workspace saved', { description: title })"
            >
              Save workspace
            </UiButton>
          </div>
        </div>
        <div class="specimen-caption">
          <span class="status-dot done"></span>
          Button, Input, Switch, Avatar & Badge
        </div>
      </UiCard>
    </section>
    <div class="home-inventory">
      <a href="#/components">
        <strong>{{ families.length }}</strong>
        <span>{{ t("families") }}</span>
      </a>
      <a href="#/blocks">
        <strong>{{ blocks.length }}</strong>
        <span>{{ t("blocks") }}</span>
      </a>
      <a href="#/composables">
        <strong>{{ tools.length }}</strong>
        <span>{{ t("toolPages") }}</span>
      </a>
    </div>
    <section class="home-section">
      <h2>{{ t("startTitle") }}</h2>
      <p>{{ t("startDescription") }}</p>
      <div class="guide-links">
        <a href="#/installation">
          <span class="guide-icon" aria-hidden="true">↗</span>
          <div>
            <h3>Installation</h3>
            <p>Set up Vue, Tailwind and the plugin.</p>
          </div>
        </a>
        <a href="#/theming">
          <span class="guide-icon palette" aria-hidden="true">◐</span>
          <div>
            <h3>Theming & colors</h3>
            <p>A palette that feels like your application.</p>
          </div>
        </a>
        <a href="#/inertia-ssr">
          <span class="guide-icon integration" aria-hidden="true">⌘</span>
          <div>
            <h3>Inertia & SSR</h3>
            <p>Connect your Laravel application.</p>
          </div>
        </a>
      </div>
    </section>
    <section class="home-section">
      <div class="section-heading">
        <div>
          <h2>{{ t("catalog") }}</h2>
          <p>{{ t("componentDescription") }}</p>
        </div>
        <UiInput
          v-model="query"
          class="catalog-search"
          icon="lucide:search"
          :placeholder="t('filter')"
          :aria-label="t('filter')"
        />
      </div>
      <!-- A category is always selected, so clicking the active one keeps it. -->
      <UiToggleGroup
        type="single"
        size="sm"
        class="category-tabs"
        :model-value="category"
        @update:model-value="(value) => value && (category = value as string)"
      >
        <UiToggleGroupItem v-for="group in groups" :key="group" :value="group">
          {{ group === "All" ? t("all") : group }}
        </UiToggleGroupItem>
      </UiToggleGroup>
      <div class="component-grid">
        <UiCard
          as="a"
          v-for="page in library"
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
            ></span>
          </div>
          <p>{{ page.description }}</p>
          <small>{{ page.group }}</small>
        </UiCard>
      </div>
      <p v-if="!library.length" class="doc-muted">{{ t("noResults") }}</p>
    </section>
    <section class="home-section install-section">
      <div>
        <h2>{{ t("installTitle") }}</h2>
        <p>{{ t("installDescription") }}</p>
        <UiButton as="a" href="#/installation" variant="link" arrow>
          {{ t("getStarted") }}
        </UiButton>
      </div>
      <UiCodeBlock :code="installation" language="ts" />
    </section>
    <footer class="docs-footer">
      <span>Rosalana UI</span>
      <a href="https://github.com/rosalana/ui" target="_blank" rel="noreferrer">
        {{ t("github") }} ↗
      </a>
    </footer>
  </div>
</template>
