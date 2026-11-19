<script setup lang="ts">
import {
  UiAvatar,
  UiAvatarFallback,
  UiHoverCard,
  UiHoverCardContent,
  UiHoverCardTrigger,
} from "@rosalana/ui";
</script>

<template>
  <p class="max-w-sm text-sm">
    The bracket was drawn by
    <UiHoverCard>
      <UiHoverCardTrigger as-child>
        <a href="#" class="font-medium text-primary underline-offset-4 hover:underline" @click.prevent>
          @marta
        </a>
      </UiHoverCardTrigger>
      <UiHoverCardContent class="flex gap-3">
        <UiAvatar>
          <UiAvatarFallback>MK</UiAvatarFallback>
        </UiAvatar>
        <div class="space-y-1">
          <p class="text-sm font-semibold">Marta Kovářová</p>
          <p class="text-xs text-theme">Organizer of Spring Cup. Runs 14 tournaments.</p>
          <p class="text-xs text-theme">Joined in March 2024</p>
        </div>
      </UiHoverCardContent>
    </UiHoverCard>
    before the first round.
  </p>
</template>
