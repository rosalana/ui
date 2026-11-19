<script setup lang="ts">
import { UiIcon } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-end justify-center gap-6">
    <!-- size sets width and height: a number is pixels, a string is any CSS length -->
    <UiIcon name="lucide:star" :size="16" />
    <UiIcon name="lucide:star" :size="24" />
    <UiIcon name="lucide:star" size="2rem" />
    <!-- or leave size out and use Tailwind classes, color follows the text color -->
    <UiIcon name="lucide:star" class="size-10 text-amber-500" />
  </div>
</template>
