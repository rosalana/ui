<script setup lang="ts">
import {
  UiHoverCard,
  UiHoverCardContent,
  UiHoverCardTrigger,
} from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-6 py-8">
    <UiHoverCard :open-delay="0" :close-delay="0">
      <UiHoverCardTrigger as-child>
        <a href="#" class="text-sm font-medium underline underline-offset-4" @click.prevent>
          Night Owls
        </a>
      </UiHoverCardTrigger>
      <UiHoverCardContent side="top" class="space-y-1">
        <p class="text-sm font-semibold">Night Owls</p>
        <p class="text-xs text-theme">8 wins, 2 losses. Opens and closes instantly.</p>
      </UiHoverCardContent>
    </UiHoverCard>

    <UiHoverCard :open-delay="600" :close-delay="300">
      <UiHoverCardTrigger as-child>
        <a href="#" class="text-sm font-medium underline underline-offset-4" @click.prevent>
          Pixel Pirates
        </a>
      </UiHoverCardTrigger>
      <UiHoverCardContent side="right" align="start" class="space-y-1">
        <p class="text-sm font-semibold">Pixel Pirates</p>
        <p class="text-xs text-theme">
          6 wins, 4 losses. Waits 600 ms before it opens and stays 300 ms after you leave.
        </p>
      </UiHoverCardContent>
    </UiHoverCard>
  </div>
</template>
