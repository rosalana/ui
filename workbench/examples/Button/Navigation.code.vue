<script setup lang="ts">
import { UiButton } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiButton variant="outline" arrow-back href="/cart">Back</UiButton>
    <UiButton arrow href="/checkout/shipping">Continue</UiButton>
    <UiButton variant="ghost" :href="{ method: 'post', url: '/logout' }">
      Log out
    </UiButton>
  </div>
</template>
