<script setup lang="ts">
import Section from "workbench/components/Section.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";

const icons = [
  "lucide:home",
  "lucide:settings",
  "lucide:user",
  "lucide:bell",
  "lucide:search",
  "lucide:heart",
  "lucide:star",
  "lucide:check",
  "lucide:x",
  "lucide:plus",
  "lucide:minus",
  "lucide:arrow-right",
  "lucide:trash-2",
  "lucide:edit",
  "lucide:download",
  "lucide:upload",
  "lucide:share-2",
  "lucide:copy",
  "lucide:mail",
  "lucide:phone",
  "lucide:calendar",
  "lucide:clock",
  "lucide:map-pin",
  "lucide:globe",
];

const mdiIcons = [
  "mdi:vuejs",
  "mdi:language-typescript",
  "mdi:github",
  "mdi:nodejs",
  "mdi:docker",
  "mdi:aws",
  "mdi:git",
  "mdi:linux",
];
</script>

<template>
  <Section title="Icon Sets">
    <div class="flex flex-wrap gap-4">
      <div
        v-for="icon in icons"
        :key="icon"
        class="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-muted-200 dark:border-muted-800 hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors min-w-[80px]"
      >
        <UiIcon :name="icon" class="size-5 text-foreground" />
        <span class="text-[10px] text-theme text-center leading-tight">{{
          icon.replace("lucide:", "")
        }}</span>
      </div>
    </div>
  </Section>

  <Section title="MDI Icons">
    <div class="flex flex-wrap gap-4">
      <div
        v-for="icon in mdiIcons"
        :key="icon"
        class="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-muted-200 dark:border-muted-800 hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors min-w-[80px]"
      >
        <UiIcon :name="icon" class="size-5 text-foreground" />
        <span class="text-[10px] text-theme text-center">{{
          icon.replace("mdi:", "")
        }}</span>
      </div>
    </div>
  </Section>

  <Section title="Sizes">
    <div class="flex items-end gap-4">
      <div class="flex flex-col items-center gap-2">
        <UiIcon name="lucide:star" class="size-3" />
        <span class="text-[10px] text-theme">size-3</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <UiIcon name="lucide:star" class="size-4" />
        <span class="text-[10px] text-theme">size-4</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <UiIcon name="lucide:star" class="size-5" />
        <span class="text-[10px] text-theme">size-5</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <UiIcon name="lucide:star" class="size-6" />
        <span class="text-[10px] text-theme">size-6</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <UiIcon name="lucide:star" class="size-8" />
        <span class="text-[10px] text-theme">size-8</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <UiIcon name="lucide:star" class="size-10" />
        <span class="text-[10px] text-theme">size-10</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <UiIcon name="lucide:star" class="size-12" />
        <span class="text-[10px] text-theme">size-12</span>
      </div>
    </div>
  </Section>

  <Section title="Colors">
    <div class="flex gap-4 flex-wrap">
      <UiIcon name="lucide:heart" class="size-6 text-primary" />
      <UiIcon name="lucide:heart" class="size-6 text-destructive" />
      <UiIcon name="lucide:heart" class="size-6 text-success" />
      <UiIcon name="lucide:heart" class="size-6 text-warning" />
      <UiIcon name="lucide:heart" class="size-6 text-info" />
      <UiIcon name="lucide:heart" class="size-6 text-secondary" />
      <UiIcon name="lucide:heart" class="size-6 text-theme" />
    </div>
  </Section>
</template>
