import { section, type ComponentArticle } from "../schema";

export default {
  category: "Blocks",
  description: "Responsive application navigation with expandable sections.",
  guidance:
    "Uses Inertia links and marks the active page from the Inertia URL. Supply menu and use brand, search and actions slots. Leave desktop space for its fixed sidebar. Includes Collapsible, which is not yet implemented to Rosalana standards.",
  integration: true,
  sections: [
    section(
      "integration",
      "Inertia layout example",
      "Mount in your application layout after reviewing Collapsible. The preview runs the actual block in an isolated Inertia client with local route fixtures.",
      `<script setup lang="ts">
import { SideNav } from '@rosalana/ui';
const menu = [
  { title: 'Overview', href: '/' },
  { title: 'Workspace', defaultOpen: true, children: [
    { title: 'Projects', href: '/projects' },
    { title: 'Settings', href: '/settings' },
  ] },
];
</script>

<template>
  <SideNav :menu="menu">
    <template #brand>My workspace</template>
    <template #actions>Personal workspace</template>
  </SideNav>
  <main class="md:pl-64"><slot /></main>
</template>`,
      "vue",
    ),
  ],
} satisfies ComponentArticle;
