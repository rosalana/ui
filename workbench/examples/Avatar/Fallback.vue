<script setup lang="ts">
import { UiAvatar, UiAvatarFallback, UiAvatarImage, UiIcon } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4">
    <!-- The image can't load, so the fallback shows the initials of the name -->
    <UiAvatar size="lg">
      <UiAvatarImage src="/missing/grace.png" alt="Grace Hopper" />
      <UiAvatarFallback name="Grace Hopper" />
    </UiAvatar>

    <!-- A custom modifier turns the name into any text -->
    <UiAvatar size="lg">
      <UiAvatarFallback name="Margaret Hamilton" :modifier="(name) => name[0]" />
    </UiAvatar>

    <!-- Without a name it shows a question mark -->
    <UiAvatar size="lg">
      <UiAvatarFallback />
    </UiAvatar>

    <!-- Or anything in the slot -->
    <UiAvatar size="lg">
      <UiAvatarFallback>
        <UiIcon name="lucide:users" class="size-5" />
      </UiAvatarFallback>
    </UiAvatar>
  </div>
</template>
