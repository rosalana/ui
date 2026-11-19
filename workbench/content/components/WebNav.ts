import { section, type ComponentArticle } from "../schema";

export default {
  category: "Blocks",
  description: "Responsive website navigation with grouped links and slots.",
  guidance:
    "Requires an Inertia page. Supply menu entries with title, href and optional children. Its fixed header needs appropriate top spacing in the application layout. Includes primitives still awaiting review.",
  integration: true,
  sections: [
    section(
      "integration",
      "Inertia layout example",
      "Mount in your application layout after reviewing Collapsible, one of its primitive dependencies. The fixed header needs space above your page content. The preview uses an isolated Inertia client with local route fixtures.",
      `<script setup lang="ts">
import { WebNav } from '@rosalana/ui';
const menu = [
  { title: 'Projects', href: '/projects' },
  { title: 'Resources', children: [
    { title: 'Guides', href: '/guides', description: 'Learn the basics' },
  ] },
];
</script>

<template>
  <WebNav :menu="menu">
    <template #brand>My workspace</template>
  </WebNav>
  <main class="pt-24"><slot /></main>
</template>`,
      "vue",
    ),
  ],
} satisfies ComponentArticle;
