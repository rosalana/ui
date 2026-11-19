<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import {
  UiButton,
  UiIcon,
  UiInput,
  UiSelect,
  UiSelectTrigger,
  UiSelectValue,
  UiSelectContent,
  UiSelectItem,
  UiNavigationMenu,
  UiNavigationMenuList,
  UiNavigationMenuItem,
  UiNavigationMenuLink,
  useTheme,
  defineShortcuts,
} from "@rosalana/ui";
import {
  categories,
  findPage,
  documentationSections,
  sectionForPage,
  pagesForSection,
  type DocumentationSection,
} from "./docs/registry";
import { useDocsLocale } from "./docs/locale";
import GlobalSearch from "./components/GlobalSearch.vue";
import DocsNav, { type DocsNavSection } from "./components/DocsNav.vue";
import DocPage from "./components/DocPage.vue";
import HomePage from "./components/HomePage.vue";
import LibraryIndex from "./components/LibraryIndex.vue";
import "./docs.css";

const { t } = useDocsLocale();
const route = ref(""),
  anchor = ref(""),
  search = ref("");
const searchOpen = ref(false);
const mobileOpen = ref(false),
  dark = ref(false);
const content = ref<HTMLElement>();
const theme = useTheme();
const selected = computed(() => findPage(route.value));
const activeSection = computed<DocumentationSection>(() => {
  if (documentationSections.includes(route.value as DocumentationSection))
    return route.value as DocumentationSection;
  if (route.value === "tools") return "composables";
  return selected.value ? sectionForPage(selected.value) : "guides";
});
const sectionTitle = (section: DocumentationSection) =>
  t(section === "blocks" ? "blocksSection" : section);
const isIndex = computed(
  () =>
    documentationSections.includes(route.value as DocumentationSection) ||
    route.value === "tools",
);
const visiblePages = computed(() => pagesForSection(activeSection.value));
const navSections = computed<DocsNavSection[]>(() => [
  {
    links: [
      {
        title: t("overview"),
        href:
          activeSection.value === "guides" ? "#/" : `#/${activeSection.value}`,
      },
    ],
  },
  ...categories.flatMap((category) => {
    const links = visiblePages.value
      .filter((page) => page.group === category)
      .map((page) => ({
        title: page.title,
        href: `#/${page.id}`,
        status: page.status,
      }));
    return links.length ? [{ title: category, links }] : [];
  }),
]);
function isActive(href?: string) {
  return href === (route.value ? `#/${route.value}` : "#/");
}
function navigateSection(value: unknown) {
  if (
    typeof value === "string" &&
    documentationSections.includes(value as DocumentationSection)
  )
    location.hash = "#/" + value;
}
function focusSearch() {
  document.querySelector<HTMLInputElement>(".docs-navigation input")?.focus();
}
async function scrollToAnchor(id = anchor.value) {
  await nextTick();
  if (!id) return;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ block: "start", behavior: "instant" });
    if (anchor.value === id) anchor.value = "";
  }
}
function readRoute() {
  const parts = location.hash
    .replace(/^#\/?/, "")
    .split("/")
    .map((part) => {
      try {
        return decodeURIComponent(part);
      } catch {
        return part;
      }
    });
  const previous = route.value;
  route.value = parts[0] ?? "";
  anchor.value = parts.slice(1).join("/");
  mobileOpen.value = false;
  if (previous !== route.value) {
    search.value = "";
    nextTick(() => {
      content.value?.scrollTo(0, 0);
      content.value?.focus({ preventScroll: true });
    });
  }
  void scrollToAnchor();
}
function repeatAnchor(event: MouseEvent) {
  const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
  if (link?.hash && link.hash === location.hash) readRoute();
}
defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => (searchOpen.value = true),
  },
  escape: {
    usingInput: true,
    // Only when there is something to reset, so Escape still reaches open dialogs.
    whenever: [computed(() => mobileOpen.value || !!search.value)],
    handler: () => {
      mobileOpen.value = false;
      search.value = "";
    },
  },
});
async function toggleTheme() {
  dark.value = !dark.value;
  await theme.update(dark.value ? "dark" : "light");
}
let stopObserver: (() => void) | undefined;
onMounted(() => {
  theme.initializeTheme();
  dark.value = theme.isDark();
  readRoute();
  window.addEventListener("hashchange", readRoute);
  const observer = new MutationObserver(() => {
    if (anchor.value && document.getElementById(anchor.value))
      void scrollToAnchor();
  });
  observer.observe(content.value!, { childList: true, subtree: true });
  stopObserver = () => observer.disconnect();
});
onUnmounted(() => {
  window.removeEventListener("hashchange", readRoute);
  stopObserver?.();
});
watch(
  () => selected.value?.title,
  (title) => {
    document.title = `${title ?? (route.value === "" ? "Documentation" : route.value)} — Rosalana UI`;
  },
);
</script>
<template>
  <div class="docs-app">
    <a class="skip-link" href="#main-content" @click.prevent="content?.focus()">
      {{ t("skip") }}
    </a>
    <div class="docs-navigation">
      <DocsNav
        v-model:open="mobileOpen"
        :sections="navSections"
        :is-active="isActive"
      >
        <template #brand>
          <div class="flex w-full items-center gap-3">
            <a href="#/" class="brand">
              <span class="brand-mark" aria-hidden="true" />
              <span class="hidden md:inline">
                rosalana
                <span class="brand-suffix">/ui</span>
              </span>
            </a>
            <div class="min-w-0 flex-1 md:hidden">
              <UiSelect
                :model-value="activeSection"
                @update:model-value="navigateSection"
              >
                <UiSelectTrigger :aria-label="t('section')">
                  <UiSelectValue />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="section in documentationSections"
                    :key="section"
                    :value="section"
                  >
                    {{ sectionTitle(section) }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </div>
        </template>
        <template #search>
          <div class="space-y-3">
            <UiInput
              readonly
              @click="searchOpen = true"
              @keydown.enter="searchOpen = true"
              :placeholder="t('search')"
              :aria-label="t('searchLabel')"
              icon="lucide:search"
            />
            <p
              v-if="!visiblePages.length"
              class="text-xs text-theme"
              role="status"
            >
              {{ t("noResults") }}
            </p>
          </div>
        </template>
        <template #actions>
          <div class="hidden md:block">
            <UiButton as="a" href="#/introduction" variant="ghost" size="sm">
              {{ t("aboutLibrary") }}
            </UiButton>
          </div>
          <div class="flex items-center gap-1 md:hidden">
            <UiButton
              as="a"
              href="https://github.com/rosalana/ui"
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              size="icon-sm"
              :aria-label="t('github')"
            >
              <UiIcon name="lucide:github" />
            </UiButton>
            <UiButton
              variant="ghost"
              size="icon-sm"
              :aria-label="t('theme')"
              @click="toggleTheme"
            >
              <UiIcon :name="dark ? 'lucide:sun' : 'lucide:moon'" />
            </UiButton>
          </div>
        </template>
      </DocsNav>
    </div>
    <header class="docs-topbar hidden md:flex">
      <UiNavigationMenu :aria-label="t('section')">
        <UiNavigationMenuList>
          <UiNavigationMenuItem
            v-for="section in documentationSections"
            :key="section"
          >
            <UiNavigationMenuLink
              :href="`#/${section}`"
              :active="activeSection === section"
              class="px-3 py-2"
            >
              {{ sectionTitle(section) }}
            </UiNavigationMenuLink>
          </UiNavigationMenuItem>
        </UiNavigationMenuList>
      </UiNavigationMenu>
      <div class="flex items-center gap-1">
        <UiButton
          as="a"
          href="https://github.com/rosalana/ui"
          target="_blank"
          rel="noreferrer"
          variant="ghost"
          size="icon-sm"
          :aria-label="t('github')"
        >
          <UiIcon name="lucide:github" />
        </UiButton>
        <UiButton
          variant="ghost"
          size="icon-sm"
          :aria-label="t('theme')"
          @click="toggleTheme"
        >
          <UiIcon :name="dark ? 'lucide:sun' : 'lucide:moon'" />
        </UiButton>
      </div>
    </header>
    <GlobalSearch v-model:open="searchOpen" />
    <main
      id="main-content"
      ref="content"
      tabindex="-1"
      class="docs-main"
      @click="repeatAnchor"
    >
      <HomePage v-if="route === ''" />
      <LibraryIndex v-else-if="isIndex" :key="route" :section="activeSection" />
      <DocPage v-else-if="selected" :key="selected.id" :page="selected" />
      <article v-else class="not-found">
        <h1>{{ t("notFound") }}</h1>
        <p>{{ t("notFoundText") }}</p>
        <UiButton as="a" href="#/">{{ t("goHome") }}</UiButton>
      </article>
    </main>
  </div>
</template>
