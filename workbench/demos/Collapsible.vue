<script setup lang="ts">
import { ref } from "vue";
import UiCollapsible from "../../src/components/Ui/Collapsible/Collapsible.vue";
import UiCollapsibleTrigger from "../../src/components/Ui/Collapsible/CollapsibleTrigger.vue";
import UiCollapsibleContent from "../../src/components/Ui/Collapsible/CollapsibleContent.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";

const open1 = ref(false);
const open2 = ref(true);
</script>

<template>
  <div class="space-y-10 max-w-md">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Basic</h2>
      <UiCollapsible v-model:open="open1">
        <div class="flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-background">
          <p class="text-sm font-medium">Repository files</p>
          <UiCollapsibleTrigger as-child>
            <UiButton variant="ghost" size="icon-sm">
              <UiIcon :name="open1 ? 'lucide:chevron-up' : 'lucide:chevron-down'" />
            </UiButton>
          </UiCollapsibleTrigger>
        </div>
        <UiCollapsibleContent>
          <div class="mt-2 space-y-1">
            <div v-for="file in ['components/', 'composables/', 'plugin/', 'index.ts']" :key="file"
              class="px-4 py-2 text-sm text-theme rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2">
              <UiIcon :name="file.endsWith('/') ? 'lucide:folder' : 'lucide:file'" class="size-3.5 text-theme" />
              {{ file }}
            </div>
          </div>
        </UiCollapsibleContent>
      </UiCollapsible>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Open by Default</h2>
      <UiCollapsible v-model:open="open2">
        <UiCollapsibleTrigger as-child>
          <button class="flex w-full items-center justify-between py-2 text-sm font-medium hover:text-foreground text-theme transition-colors">
            Advanced settings
            <UiIcon :name="open2 ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="size-4" />
          </button>
        </UiCollapsibleTrigger>
        <UiCollapsibleContent>
          <div class="py-3 space-y-2 text-sm text-theme border-t border-border mt-1">
            <p>• Enable experimental features</p>
            <p>• Debug mode</p>
            <p>• Custom CSS overrides</p>
          </div>
        </UiCollapsibleContent>
      </UiCollapsible>
    </section>
  </div>
</template>
