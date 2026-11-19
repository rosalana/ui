<script setup lang="ts">
import { UiIcon } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <UiIcon name="lucide:trophy" class="size-6" />
    <UiIcon name="mdi:github" class="size-6" />
    <UiIcon name="logos:vue" class="size-6" />
    <UiIcon name="simple-icons:laravel" class="size-6 text-red-500" />
    <!-- mdi-home is read as mdi:home -->
    <UiIcon name="mdi-home" class="size-6" />
  </div>
</template>
