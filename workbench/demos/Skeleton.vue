<script setup lang="ts">
import UiSkeleton from "../../src/components/Ui/Skeleton/Skeleton.vue";
import UiAvatar from "../../src/components/Ui/Avatar/Avatar.vue";
import UiAvatarFallback from "../../src/components/Ui/Avatar/AvatarFallback.vue";
</script>

<template>
  <div class="space-y-10 max-w-lg">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Basic Shapes</h2>
      <div class="space-y-3">
        <UiSkeleton class="h-4 w-full" />
        <UiSkeleton class="h-4 w-3/4" />
        <UiSkeleton class="h-4 w-1/2" />
        <UiSkeleton class="h-10 w-32 rounded-xl" />
        <UiSkeleton class="size-12 rounded-full" />
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Card Skeleton</h2>
      <div class="rounded-xl border border-muted-200 dark:border-muted-800 p-5 space-y-4">
        <div class="flex items-center gap-3">
          <UiSkeleton class="size-10 rounded-full" />
          <div class="space-y-2 flex-1">
            <UiSkeleton class="h-4 w-1/3" />
            <UiSkeleton class="h-3 w-1/4" />
          </div>
        </div>
        <UiSkeleton class="h-3 w-full" />
        <UiSkeleton class="h-3 w-5/6" />
        <UiSkeleton class="h-3 w-4/5" />
        <div class="flex gap-2 pt-2">
          <UiSkeleton class="h-8 w-20 rounded-lg" />
          <UiSkeleton class="h-8 w-20 rounded-lg" />
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">List Skeleton</h2>
      <div class="space-y-3">
        <div v-for="i in 4" :key="i" class="flex items-center gap-3 p-3 rounded-xl border border-muted-200 dark:border-muted-800">
          <UiSkeleton class="size-8 rounded-lg" />
          <div class="space-y-1.5 flex-1">
            <UiSkeleton class="h-3.5" :class="i % 2 === 0 ? 'w-2/3' : 'w-1/2'" />
            <UiSkeleton class="h-3" :class="i % 3 === 0 ? 'w-1/3' : 'w-1/4'" />
          </div>
          <UiSkeleton class="h-6 w-16 rounded-full" />
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Table Skeleton</h2>
      <div class="rounded-xl border border-muted-200 dark:border-muted-800 overflow-hidden">
        <div class="flex gap-4 px-4 py-3 border-b border-muted-200 dark:border-muted-800 bg-muted-50 dark:bg-muted-900">
          <UiSkeleton class="h-3 w-24" v-for="c in 4" :key="c" />
        </div>
        <div v-for="r in 4" :key="r" class="flex gap-4 px-4 py-3 border-b border-muted-200 dark:border-muted-800 last:border-0">
          <UiSkeleton class="h-3 w-24" v-for="c in 4" :key="c" />
        </div>
      </div>
    </section>
  </div>
</template>
