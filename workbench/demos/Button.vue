<script setup lang="ts">
import { ref } from "vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";

const loading = ref(false);
const triggerLoad = () => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
};
</script>

<template>
  <div class="space-y-10">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Variants</h2>
      <div class="flex flex-wrap gap-3">
        <UiButton variant="default">Default</UiButton>
        <UiButton variant="secondary">Secondary</UiButton>
        <UiButton variant="outline">Outline</UiButton>
        <UiButton variant="ghost">Ghost</UiButton>
        <UiButton variant="destructive">Destructive</UiButton>
        <UiButton variant="link">Link</UiButton>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Sizes</h2>
      <div class="flex flex-wrap items-center gap-3">
        <UiButton size="xs">Extra Small</UiButton>
        <UiButton size="sm">Small</UiButton>
        <UiButton size="default">Default</UiButton>
        <UiButton size="lg">Large</UiButton>
        <UiButton size="icon"><UiIcon name="lucide:plus" /></UiButton>
        <UiButton size="icon-sm"><UiIcon name="lucide:plus" /></UiButton>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">States</h2>
      <div class="flex flex-wrap gap-3">
        <UiButton :loading="loading" @click="triggerLoad">
          {{ loading ? "Loading..." : "Click to load" }}
        </UiButton>
        <UiButton disabled>Disabled</UiButton>
        <UiButton arrow>With Arrow</UiButton>
        <UiButton arrow-back>Back Arrow</UiButton>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">With Icons</h2>
      <div class="flex flex-wrap gap-3">
        <UiButton><UiIcon name="lucide:download" />Download</UiButton>
        <UiButton variant="outline"><UiIcon name="lucide:share-2" />Share</UiButton>
        <UiButton variant="secondary"><UiIcon name="lucide:settings" />Settings</UiButton>
        <UiButton variant="destructive"><UiIcon name="lucide:trash-2" />Delete</UiButton>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">With Tooltip</h2>
      <div class="flex flex-wrap gap-3">
        <UiButton tooltip="This button has a tooltip" size="icon">
          <UiIcon name="lucide:info" />
        </UiButton>
        <UiButton tooltip="Saved to clipboard" variant="outline">
          <UiIcon name="lucide:clipboard" />
          Copy
        </UiButton>
      </div>
    </section>
  </div>
</template>
