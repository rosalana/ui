<script setup lang="ts">
import { ref } from "vue";
import { UiButton, UiChip, UiIcon } from "@rosalana/ui";

const unread = ref(128);
</script>

<template>
  <div class="flex items-center justify-center gap-8">
    <!-- Hidden with a spring animation once the count reaches zero -->
    <UiChip :text="unread" :max="99" :show="unread > 0" variant="destructive">
      <UiButton variant="outline" size="icon" aria-label="Mark notifications as read" @click="unread = 0">
        <UiIcon name="lucide:bell" />
      </UiButton>
    </UiChip>
    <UiChip pulse variant="success">
      <UiButton variant="outline" size="icon" aria-label="Live matches">
        <UiIcon name="lucide:radio" />
      </UiButton>
    </UiChip>
  </div>
</template>
