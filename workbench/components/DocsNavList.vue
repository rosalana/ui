<script setup lang="ts">
import type { DocPage } from "../docs/types";
import type { DocsNavSection } from "./DocsNav.vue";
import { useDocsLocale } from "../docs/locale";

defineProps<{
  sections: DocsNavSection[];
  isActive: (href: string) => boolean;
}>();
const { t } = useDocsLocale();

const statusLabel = (status: NonNullable<DocPage["status"]>) =>
  t(
    status === "done"
      ? "ready"
      : status === "untouched"
        ? "review"
        : "unavailable",
  );
</script>

<template>
  <nav :aria-label="t('navigation')">
    <ul class="flex flex-col gap-6">
      <li v-for="section in sections" :key="section.title ?? ''">
        <p
          v-if="section.title"
          class="mb-1.5 px-3 text-xs font-semibold text-foreground"
        >
          {{ section.title }}
        </p>
        <ul class="flex flex-col gap-px">
          <li v-for="link in section.links" :key="link.href">
            <a
              :href="link.href"
              :aria-current="isActive(link.href) ? 'page' : undefined"
              :class="[
                'flex items-center justify-between gap-3 rounded-lg px-3 py-1.5 text-sm transition-colors',
                isActive(link.href)
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-foreground/70 hover:bg-muted/60 hover:text-foreground',
              ]"
            >
              <span class="truncate">{{ link.title }}</span>
              <span
                v-if="link.status"
                :class="['status-dot', link.status]"
                :title="statusLabel(link.status)"
                :aria-label="statusLabel(link.status)"
                role="img"
              />
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
