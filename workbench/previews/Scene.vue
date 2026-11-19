<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { router } from "@inertiajs/vue3";
import {
  SideNav,
  WebNav,
  UiCard,
  UiCardHeader,
  UiCardTitle,
  UiCardDescription,
  UiCardContent,
  UiBadge,
  UiIcon,
  UiAvatar,
  UiAvatarFallback,
  useActiveRoute,
  useColorCSS,
  UiCodeBlock,
} from "@rosalana/ui";
const props = defineProps<{ block: string }>();
const { currentPath } = useActiveRoute();
const css = useColorCSS();
const menu = [
  { title: "Overview", href: "/" },
  {
    title: "Workspace",
    defaultOpen: true,
    children: [
      { title: "Projects", href: "/projects", description: "Work in progress" },
      {
        title: "Assets",
        href: "/assets",
        description: "Your creative library",
      },
    ],
  },
  { title: "Settings", href: "/settings" },
];
let cleanup: (() => void) | undefined;
onMounted(() => {
  // Keep link navigation inside the fixture: no server requests or external routes.
  function navigate(event: MouseEvent) {
    const link = (event.target as Element).closest<HTMLAnchorElement>(
      "a[href]",
    );
    if (!link || link.origin !== location.origin) return;
    event.preventDefault();
    event.stopPropagation();
    router.replace({ url: link.pathname });
  }
  document.addEventListener("click", navigate, true);
  const parentRoot = window.parent.document.documentElement;
  const syncTheme = () =>
    document.documentElement.classList.toggle(
      "dark",
      parentRoot.classList.contains("dark"),
    );
  syncTheme();
  const observer = new MutationObserver(syncTheme);
  observer.observe(parentRoot, {
    attributes: true,
    attributeFilter: ["class"],
  });
  cleanup = () => {
    document.removeEventListener("click", navigate, true);
    observer.disconnect();
  };
});
onUnmounted(() => cleanup?.());
</script>
<template>
  <div class="min-h-screen bg-background text-foreground">
    <SideNav v-if="props.block === 'SideNav'" :menu="menu">
      <template #brand>
        <span class="flex items-center gap-2 font-semibold">
          <UiIcon name="lucide:layers" />
          Studio
        </span>
      </template>
      <template #actions>
        <div class="flex items-center gap-3">
          <UiAvatar size="sm"><UiAvatarFallback>AT</UiAvatarFallback></UiAvatar>
          <span class="text-xs text-theme">Alex's workspace</span>
        </div>
      </template>
    </SideNav>
    <WebNav v-else-if="props.block === 'WebNav'" :menu="menu">
      <template #brand>
        <span class="flex items-center gap-2 font-semibold">
          <UiIcon name="lucide:layers" />
          Studio
        </span>
      </template>
    </WebNav>
    <main
      :class="[
        'p-6',
        props.block === 'SideNav'
          ? 'pt-20 md:pt-6 md:pl-70'
          : props.block === 'WebNav'
            ? 'pt-28'
            : '',
      ]"
    >
      <UiCard v-if="props.block !== 'ColorVars'">
        <UiCardHeader>
          <UiBadge variant="outline" size="sm" class="w-fit">
            Local Inertia preview
          </UiBadge>
          <UiCardTitle>
            {{
              currentPath === "/"
                ? "Workspace overview"
                : currentPath === "/projects"
                  ? "Your projects"
                  : currentPath === "/assets"
                    ? "Creative assets"
                    : "Workspace settings"
            }}
          </UiCardTitle>
          <UiCardDescription>
            Open a navigation group or follow a link. The active route updates
            locally.
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-xl bg-primary/10 p-4">
              <UiIcon name="lucide:folder" class="mb-3 text-primary" />
              <p class="text-sm font-medium">Projects</p>
              <p class="mt-1 text-xs text-theme">A shared place for ideas</p>
            </div>
            <div class="rounded-xl bg-muted/40 p-4">
              <UiIcon name="lucide:images" class="mb-3 text-theme" />
              <p class="text-sm font-medium">Assets</p>
              <p class="mt-1 text-xs text-theme">
                Everything you are working with
              </p>
            </div>
          </div>
          <p class="mt-5 text-xs text-theme" role="status">
            Current Inertia route: {{ currentPath }}
          </p>
        </UiCardContent>
      </UiCard>
      <div v-else class="space-y-5">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Theme variables in the Inertia head</UiCardTitle>
            <UiCardDescription>
              ColorVars is mounted after the Inertia App. It has no visible
              interface; these components use the CSS it supplies.
            </UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="flex flex-wrap gap-3">
            <UiBadge>Primary</UiBadge>
            <UiBadge variant="success">Success</UiBadge>
            <UiBadge variant="warning">Warning</UiBadge>
          </UiCardContent>
        </UiCard>
        <UiCodeBlock :code="css" language="css" />
      </div>
    </main>
  </div>
</template>
