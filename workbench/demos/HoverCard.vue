<script setup lang="ts">
import UiHoverCard from "../../src/components/Ui/HoverCard/HoverCard.vue";
import UiHoverCardTrigger from "../../src/components/Ui/HoverCard/HoverCardTrigger.vue";
import UiHoverCardContent from "../../src/components/Ui/HoverCard/HoverCardContent.vue";
import UiAvatar from "../../src/components/Ui/Avatar/Avatar.vue";
import UiAvatarFallback from "../../src/components/Ui/Avatar/AvatarFallback.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";
</script>

<template>
  <div class="space-y-10 max-w-lg">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">User Profile</h2>
      <p class="text-sm text-theme mb-4">Hover over the username to see the profile card.</p>
      <p class="text-sm">
        Created by
        <UiHoverCard>
          <UiHoverCardTrigger as-child>
            <span class="text-primary font-medium cursor-pointer underline underline-offset-4">@johndoe</span>
          </UiHoverCardTrigger>
          <UiHoverCardContent class="w-72">
            <div class="flex gap-4">
              <UiAvatar>
                <UiAvatarFallback>JD</UiAvatarFallback>
              </UiAvatar>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold">John Doe</h4>
                <p class="text-xs text-theme">@johndoe</p>
                <p class="text-xs">Senior UI Engineer at Rosalana. Loves clean code and great design.</p>
                <div class="flex items-center gap-3 pt-1">
                  <span class="text-xs text-theme flex items-center gap-1">
                    <UiIcon name="lucide:users" class="size-3" /> 248 followers
                  </span>
                  <span class="text-xs text-theme flex items-center gap-1">
                    <UiIcon name="lucide:calendar" class="size-3" /> Joined Jan 2024
                  </span>
                </div>
              </div>
            </div>
          </UiHoverCardContent>
        </UiHoverCard>
        on May 16, 2026.
      </p>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Multiple Cards</h2>
      <div class="flex flex-wrap gap-3">
        <UiHoverCard v-for="user in [
          { name: 'Alice', role: 'Designer', color: 'bg-pink-500' },
          { name: 'Bob', role: 'Engineer', color: 'bg-blue-500' },
          { name: 'Carol', role: 'Product', color: 'bg-green-500' },
        ]" :key="user.name">
          <UiHoverCardTrigger as-child>
            <UiButton variant="outline" size="sm">
              <div :class="['size-4 rounded-full', user.color]" />
              {{ user.name }}
            </UiButton>
          </UiHoverCardTrigger>
          <UiHoverCardContent class="w-56">
            <div class="flex items-center gap-3">
              <div :class="['size-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0', user.color]">
                {{ user.name[0] }}
              </div>
              <div>
                <p class="text-sm font-semibold">{{ user.name }}</p>
                <p class="text-xs text-theme">{{ user.role }}</p>
                <p class="text-xs text-theme mt-1">Active 5m ago</p>
              </div>
            </div>
          </UiHoverCardContent>
        </UiHoverCard>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Link Preview</h2>
      <UiHoverCard>
        <UiHoverCardTrigger as-child>
          <a href="#" class="text-primary text-sm underline underline-offset-4 hover:text-primary/80 transition-colors">
            Rosalana UI Documentation
          </a>
        </UiHoverCardTrigger>
        <UiHoverCardContent class="w-80">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <UiIcon name="lucide:book-open" class="size-4 text-primary" />
              </div>
              <div>
                <p class="text-sm font-semibold">Rosalana UI Docs</p>
                <p class="text-xs text-theme">rosalana.dev/docs</p>
              </div>
            </div>
            <p class="text-xs text-theme">
              Complete documentation for the Rosalana UI component library — components, composables, theming, and guides.
            </p>
          </div>
        </UiHoverCardContent>
      </UiHoverCard>
    </section>
  </div>
</template>
