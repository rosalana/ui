import { section, type Article } from "../schema";
export default {
  title: "Installation",
  description:
    "Set up Rosalana UI in a Vue 3 application with Tailwind CSS v4.",
  sections: [
    section(
      "dependencies",
      "Install the package",
      "Rosalana UI requires Vue 3.5 and Inertia Vue 2.1 or 3. Use your existing Inertia installation in a Laravel application.",
      "npm install @rosalana/ui vue @inertiajs/vue3\nnpm install -D tailwindcss @tailwindcss/vite",
      "bash",
    ),
    section(
      "tailwind",
      "Configure Tailwind",
      "Add the Tailwind Vite plugin alongside your Vue and Laravel plugins. Keep the configuration your application already needs.",
      `import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
});`,
    ),
    section(
      "styles",
      "Import the stylesheet",
      "Import the library theme once in your application CSS. Explicitly scan the package components so Tailwind generates the classes used by the library. Adjust the source path relative to your CSS file.",
      `@import "tailwindcss";
@import "@rosalana/ui/tailwind.css";
@source "../../node_modules/@rosalana/ui/src/components";`,
      "css",
    ),
    section(
      "plugin",
      "Register the plugin",
      "Register before mounting. The plugin provides context, semantic colors, local icon collections and the virtual layer used by confirmations and notifications.",
      `import { createApp } from 'vue';
import { createRosalanaApp } from '@rosalana/ui';
import App from './App.vue';
import './app.css';

createApp(App)
  .use(createRosalanaApp, {
    name: 'My application',
    locale: 'en',
    colors: { primary: { color: 'blue' } },
  })
  .mount('#app');`,
    ),
    section(
      "first-component",
      "Use a component",
      "Import components explicitly. Rosalana UI is a package dependency; components stay in the library rather than being copied into your app.",
      `<script setup lang="ts">
import { UiButton } from '@rosalana/ui';
</script>

<template>
  <UiButton arrow>Create project</UiButton>
</template>`,
      "vue",
    ),
  ],
} satisfies Article;
