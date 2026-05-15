<script setup lang="ts">
import { ref, computed, defineAsyncComponent, watch } from "vue";
import { UiIcon } from "@rosalana/ui";

const modules = import.meta.glob("./demos/*.vue");

const demos = Object.keys(modules)
  .map((p) => ({ name: p.replace("./demos/", "").replace(".vue", ""), load: modules[p] }))
  .sort((a, b) => a.name.localeCompare(b.name));

const selected = ref(demos[0]?.name ?? "");
const search = ref("");

const filtered = computed(() =>
  search.value
    ? demos.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()))
    : demos
);

const currentDemo = computed(() => {
  const d = demos.find((d) => d.name === selected.value);
  return d ? defineAsyncComponent(d.load as any) : null;
});

const isDark = ref(localStorage.getItem("appearance") === "dark");
watch(
  isDark,
  (v) => {
    document.documentElement.classList.toggle("dark", v);
    localStorage.setItem("appearance", v ? "dark" : "light");
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-theme-background text-theme-foreground font-sans antialiased">
    <!-- Sidebar -->
    <aside class="w-60 shrink-0 flex flex-col border-r border-muted-200 dark:border-muted-800 bg-theme-background">
      <div class="px-4 pt-5 pb-4 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="size-6 rounded-md bg-primary shadow-[0_2px_8px_-2px] shadow-primary/60">
            </div>
            <span class="text-sm font-semibold tracking-tight">Rosalana UI</span>
          </div>
          <button
            @click="isDark = !isDark"
            class="size-7 rounded-lg flex items-center justify-center text-theme hover:bg-muted-100 dark:hover:bg-muted-900 transition-colors"
          >
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
          </button>
        </div>
        <input
          v-model="search"
          placeholder="Filter components..."
          class="w-full h-8 px-3 text-xs rounded-lg border border-muted-200 dark:border-muted-700 bg-muted-50 dark:bg-muted-900 text-foreground placeholder:text-theme focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
      </div>
      <nav class="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
        <button
          v-for="demo in filtered"
          :key="demo.name"
          @click="selected = demo.name"
          :class="[
            'w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all duration-150',
            selected === demo.name
              ? 'bg-primary text-primary-foreground shadow-[0_2px_8px_-3px] shadow-primary/50 font-medium'
              : 'text-theme hover:bg-muted-100 dark:hover:bg-muted-900 hover:text-foreground',
          ]"
        >
          {{ demo.name }}
        </button>
        <div v-if="filtered.length === 0" class="px-3 py-2 text-xs text-theme">
          No components found
        </div>
      </nav>
      <div class="px-4 py-3 border-t border-muted-200 dark:border-muted-800">
        <p class="text-[11px] text-theme">{{ demos.length }} components</p>
      </div>
    </aside>

    <!-- Main -->
    <main class="flex-1 overflow-auto">
      <div class="min-h-full p-10">
        <div v-if="currentDemo">
          <h1 class="text-2xl font-semibold tracking-tight mb-1">{{ selected }}</h1>
          <p class="text-sm text-theme mb-8">Component demo</p>
          <component :is="currentDemo" />
        </div>
        <div v-else class="flex items-center justify-center h-64 text-theme text-sm">
          Select a component from the sidebar
        </div>
      </div>
    </main>
  </div>
</template>
