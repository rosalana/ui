<script setup lang="ts">
import {
  UiAvatar,
  UiAvatarFallback,
  UiButton,
  UiCard,
  UiCardContent,
  UiSkeleton,
  UiTag,
} from "@rosalana/ui";
</script>

<template>
  <div class="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
    <!-- Loading: the same layout as the loaded card, so nothing jumps -->
    <UiCard role="status" aria-label="Loading profile">
      <UiCardContent class="flex flex-col gap-4 pt-6">
        <div class="flex items-center gap-3">
          <UiSkeleton class="size-12 rounded-full" />
          <div class="flex flex-1 flex-col gap-2">
            <UiSkeleton class="h-4 w-32" />
            <UiSkeleton class="h-3 w-20" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <UiSkeleton class="h-3 w-full" />
          <UiSkeleton class="h-3 w-4/5" />
        </div>
        <div class="flex gap-2">
          <UiSkeleton class="h-6 w-16 rounded-full" />
          <UiSkeleton class="h-6 w-20 rounded-full" />
        </div>
        <UiSkeleton class="h-10 w-full rounded-xl" />
      </UiCardContent>
    </UiCard>

    <!-- Loaded -->
    <UiCard>
      <UiCardContent class="flex flex-col gap-4 pt-6">
        <div class="flex items-center gap-3">
          <UiAvatar size="lg"><UiAvatarFallback>AN</UiAvatarFallback></UiAvatar>
          <div>
            <p class="font-semibold">Anna Nováková</p>
            <p class="text-xs text-theme">Captain of Night Owls</p>
          </div>
        </div>
        <p class="text-sm text-theme">Plays midfield, organizes the Thursday training and every season opener.</p>
        <div class="flex gap-2">
          <UiTag color="emerald">Football</UiTag>
          <UiTag color="sky">Prague</UiTag>
        </div>
        <UiButton>Send message</UiButton>
      </UiCardContent>
    </UiCard>
  </div>
</template>
