<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiBadge,
  UiSwitch,
  UiInput,
  UiLabel,
  UiAvatar,
  UiAvatarFallback,
  UiCard,
  UiIcon,
  UiSeparator,
  UiCodeBlock,
  useSonner,
} from "@rosalana/ui";
import { findPage } from "../docs/registry";
import { useDocsLocale } from "../docs/locale";
import { useOverviewSections } from "../docs/overview";

const { t } = useDocsLocale();
const sections = useOverviewSections();
const notify = ref(true);
const title = ref(t("overviewWorkspaceDefault"));
const sonner = useSonner();
const guides = ["installation", "theming", "inertia-ssr"].map((id) =>
  findPage(id)!,
);
const installation = `import { createRosalanaApp } from '@rosalana/ui';
import '@rosalana/ui/tailwind.css';

app.use(createRosalanaApp, {
  name: 'Your next idea',
  locale: 'en',
  colors: { primary: { color: 'blue' } },
});`;
function resetWorkspace() {
  title.value = "";
}
</script>

<template>
  <div class="landing-home">
    <header class="landing-hero">
      <UiBadge variant="outline" class="landing-hero-badge">
        <span class="brand-mark small" aria-hidden="true" />
        {{ t("internalLibrary") }}
      </UiBadge>
      <h1>{{ t("homeTitle") }}</h1>
      <p class="landing-lead">{{ t("homeDescription") }}</p>
      <div class="landing-actions">
        <UiButton as="a" href="#/installation" arrow>
          {{ t("getStarted") }}
        </UiButton>
        <UiButton as="a" href="#/components" variant="outline">
          {{ t("browse") }}
        </UiButton>
      </div>
      <p class="landing-availability">
        {{ t("internalNote") }}
        <a href="#/introduction">
          {{ t("aboutLibrary") }}
          <UiIcon name="lucide:arrow-up-right" class="size-3" />
        </a>
      </p>
    </header>

    <section
      class="landing-directory"
      aria-labelledby="landing-directory-title"
    >
      <div class="landing-section-heading">
        <div>
          <h2 id="landing-directory-title">{{ t("catalog") }}</h2>
          <p>{{ t("overviewBrowseDescription") }}</p>
        </div>
        <code class="landing-package">@rosalana/ui</code>
      </div>
      <div class="landing-section-grid">
        <UiCard
          v-for="section in sections"
          :key="section.id"
          as="a"
          :href="`#/${section.id}`"
          class="landing-section-link"
        >
          <div class="landing-section-link-top">
            <UiIcon :name="section.icon" class="size-5 text-theme" />
            <span>{{ section.pages.length }}</span>
          </div>
          <h3>
            {{ section.title }}
            <UiIcon name="lucide:arrow-up-right" class="size-3.5 text-theme" />
          </h3>
          <p>{{ section.description }}</p>
        </UiCard>
      </div>
    </section>

    <section class="landing-showcase" aria-labelledby="landing-showcase-title">
      <div class="landing-section-heading">
        <div>
          <h2 id="landing-showcase-title">{{ t("overviewShowcaseTitle") }}</h2>
          <p>{{ t("overviewShowcaseDescription") }}</p>
        </div>
        <UiButton as="a" href="#/components" variant="ghost" size="sm" arrow>
          {{ t("explore") }}
        </UiButton>
      </div>
      <div class="landing-showcase-grid">
        <UiCard class="landing-workspace">
          <div class="landing-preview-label">
            <UiIcon name="lucide:app-window" class="size-4" />
            <span>{{ t("preview") }}</span>
            <span>Vue</span>
          </div>
          <form
            class="landing-workspace-form"
            @submit.prevent="
              sonner.success(t('overviewSaved'), { description: title })
            "
          >
            <div class="landing-workspace-heading">
              <UiAvatar><UiAvatarFallback>R</UiAvatarFallback></UiAvatar>
              <div>
                <h3>{{ t("overviewWorkspaceTitle") }}</h3>
                <p>{{ t("overviewWorkspaceDescription") }}</p>
              </div>
              <UiBadge variant="outline">{{ t("overviewPersonal") }}</UiBadge>
            </div>
            <UiSeparator />
            <div class="space-y-2">
              <UiLabel for="workspace-title">
                {{ t("overviewWorkspaceName") }}
              </UiLabel>
              <UiInput id="workspace-title" v-model="title" />
            </div>
            <div class="landing-notifications">
              <div>
                <UiLabel for="workspace-notify">
                  {{ t("overviewNotifications") }}
                </UiLabel>
                <p>{{ t("overviewNotificationsDescription") }}</p>
              </div>
              <UiSwitch id="workspace-notify" v-model="notify" />
            </div>
            <div class="landing-workspace-actions">
              <UiButton type="button" variant="ghost" @click="resetWorkspace">
                {{ t("overviewReset") }}
              </UiButton>
              <UiButton type="submit">{{ t("overviewSave") }}</UiButton>
            </div>
          </form>
          <div class="landing-component-links">
            <a
              v-for="name in ['Button', 'Input', 'Switch', 'Avatar', 'Badge']"
              :key="name"
              :href="`#/${name}`"
            >
              {{ name }}
            </a>
          </div>
        </UiCard>
        <div class="landing-foundation">
          <div class="landing-foundation-copy">
            <h3>{{ t("overviewFoundationTitle") }}</h3>
            <p>{{ t("overviewFoundationDescription") }}</p>
            <UiButton as="a" href="#/theming" variant="link" size="sm" arrow>
              {{ t("overviewThemeLink") }}
            </UiButton>
          </div>
          <UiCodeBlock :code="installation" language="ts" />
          <p class="landing-technology">{{ t("overviewTechnology") }}</p>
        </div>
      </div>
    </section>

    <section class="landing-guides" aria-labelledby="landing-guides-title">
      <div class="landing-section-heading">
        <div>
          <h2 id="landing-guides-title">{{ t("startTitle") }}</h2>
          <p>{{ t("startDescription") }}</p>
        </div>
        <UiButton as="a" href="#/guides" variant="ghost" size="sm" arrow>
          {{ t("guides") }}
        </UiButton>
      </div>
      <div class="landing-guide-grid">
        <UiCard
          v-for="(guide, index) in guides"
          :key="guide.id"
          as="a"
          :href="`#/${guide.id}`"
          class="landing-guide-link"
        >
          <UiIcon
            :name="
              ['lucide:terminal', 'lucide:palette', 'lucide:workflow'][index]
            "
            class="size-5 text-theme"
          />
          <div class="landing-guide-copy">
            <h3>{{ guide.title }}</h3>
            <p>{{ guide.description }}</p>
          </div>
          <UiIcon name="lucide:arrow-up-right" class="size-4 text-theme" />
        </UiCard>
      </div>
    </section>
    <footer class="landing-footer">
      <span>{{ t("overviewPackageDescription") }}</span>
      <a href="https://github.com/rosalana/ui" target="_blank" rel="noreferrer">
        {{ t("github") }}
        <UiIcon name="lucide:arrow-up-right" class="size-3.5" />
      </a>
    </footer>
  </div>
</template>

<style scoped>
.landing-home {
  max-width: 1280px;
  margin-inline: auto;
  padding: 0 clamp(24px, 4.3vw, 64px) 28px;
}
.landing-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 76px 0 60px;
  text-align: center;
}
.landing-hero-badge {
  gap: 8px;
  font-weight: 500;
}
.landing-hero-badge .brand-mark {
  width: 14px;
  height: 14px;
}
.landing-hero h1 {
  max-width: 760px;
  margin: 26px 0 20px;
  font-size: clamp(42px, 4.5vw, 68px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.055em;
  text-wrap: balance;
}
.landing-lead {
  max-width: 600px;
  margin: 0;
  color: var(--color-theme);
  font-size: 16px;
  line-height: 1.8;
  text-wrap: pretty;
}
.landing-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}
.landing-availability {
  max-width: 560px;
  margin: 24px 0 0;
  color: var(--color-theme);
  font-size: 11px;
  line-height: 1.8;
}
.landing-availability a {
  display: inline-flex;
  gap: 3px;
  align-items: center;
  margin-left: 6px;
  color: var(--color-foreground);
}
.landing-availability a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}
.landing-section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}
.landing-section-heading h2 {
  margin: 0;
  font-size: 23px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.6px;
}
.landing-section-heading p {
  margin: 7px 0 0;
  color: var(--color-theme);
  font-size: 13px;
  line-height: 1.7;
}
.landing-package {
  color: var(--color-theme);
  font-size: 11px;
}
.landing-section-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}
.landing-section-link {
  min-width: 0;
  padding: 20px 18px;
}
.landing-section-link-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}
.landing-section-link-top span {
  color: var(--color-theme);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.landing-section-link h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}
.landing-section-link p {
  margin: 9px 0 0;
  color: var(--color-theme);
  font-size: 12px;
  line-height: 1.7;
  text-wrap: pretty;
}
.landing-showcase,
.landing-guides {
  margin-top: 64px;
}
.landing-showcase-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 36px;
  align-items: center;
}
.landing-workspace {
  min-width: 0;
  overflow: hidden;
}
.landing-preview-label {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 12px 22px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-theme);
  font-size: 11px;
}
.landing-preview-label > :last-child {
  margin-left: auto;
  font-size: 10px;
}
.landing-workspace-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 26px;
}
.landing-workspace-heading {
  display: flex;
  align-items: center;
  gap: 12px;
}
.landing-workspace-heading > div:nth-child(2) {
  flex: 1;
  min-width: 0;
}
.landing-workspace-heading h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}
.landing-workspace-heading p,
.landing-notifications p {
  margin: 4px 0 0;
  color: var(--color-theme);
  font-size: 11px;
  line-height: 1.7;
}
.landing-notifications {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.landing-workspace-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}
.landing-component-links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 13px 24px;
  border-top: 1px solid var(--color-border);
  color: var(--color-theme);
  font-size: 10px;
}
.landing-component-links a:hover {
  color: var(--color-primary);
}
.landing-foundation {
  min-width: 0;
}
.landing-foundation-copy {
  margin-bottom: 22px;
}
.landing-foundation-copy h3 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.5px;
}
.landing-foundation-copy p {
  max-width: 42ch;
  margin: 0 0 16px;
  color: var(--color-theme);
  font-size: 13px;
  line-height: 1.8;
}
.landing-technology {
  margin: 16px 0 0;
  color: var(--color-theme);
  font-size: 10px;
}
.landing-guide-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.landing-guide-link {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 22px;
  min-width: 0;
}
.landing-guide-link > svg {
  flex-shrink: 0;
  margin-top: 2px;
}
.landing-guide-copy {
  flex: 1;
  min-width: 0;
}
.landing-guide-link h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}
.landing-guide-link p {
  margin: 7px 0 0;
  font-size: 11px;
  color: var(--color-theme);
  line-height: 1.8;
}
.landing-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
  font-size: 11px;
  color: var(--color-theme);
}
.landing-footer a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
@media (max-width: 1350px) {
  .landing-section-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .landing-section-link {
    grid-column: span 2;
  }
  .landing-section-link:nth-last-child(-n + 2) {
    grid-column: span 3;
  }
  .landing-section-link-top {
    margin-bottom: 18px;
  }
  .landing-guide-grid {
    grid-template-columns: 1fr;
  }
}
@media (min-width: 601px) and (max-width: 1100px) {
  .landing-section-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .landing-section-link,
  .landing-section-link:nth-last-child(-n + 2) {
    grid-column: auto;
  }
  .landing-section-link:last-child {
    grid-column: 1 / -1;
  }
}
@media (max-width: 1050px) {
  .landing-showcase-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
  .landing-workspace-form {
    padding: 26px;
  }
}
@media (max-width: 600px) {
  .landing-hero {
    padding: 45px 0 42px;
  }
  .landing-hero h1 {
    font-size: 42px;
    margin-top: 22px;
  }
  .landing-lead {
    font-size: 14px;
  }
  .landing-section-heading {
    align-items: flex-start;
    gap: 14px;
  }
  .landing-section-heading h2 {
    font-size: 21px;
  }
  .landing-package {
    display: none;
  }
  .landing-section-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .landing-section-link,
  .landing-section-link:nth-last-child(-n + 2) {
    grid-column: auto;
    padding: 18px;
  }
  .landing-section-link-top {
    float: left;
    margin: 2px 15px 0 0;
  }
  .landing-section-link-top span {
    display: none;
  }
  .landing-section-link p {
    margin-left: 35px;
  }
  .landing-showcase,
  .landing-guides {
    margin-top: 44px;
  }
  .landing-workspace-form {
    padding: 20px;
  }
  .landing-workspace-heading {
    flex-wrap: wrap;
  }
  .landing-workspace-heading > [data-slot="badge"] {
    display: none;
  }
  .landing-guide-link {
    padding: 18px;
  }
  .landing-footer {
    margin-top: 40px;
  }
}
</style>
