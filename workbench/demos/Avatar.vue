<script setup lang="ts">
import UiAvatar from "../../src/components/Ui/Avatar/Avatar.vue";
import UiAvatarImage from "../../src/components/Ui/Avatar/AvatarImage.vue";
import UiAvatarFallback from "../../src/components/Ui/Avatar/AvatarFallback.vue";
</script>

<template>
  <div class="space-y-10">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">With Image</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <UiAvatar>
          <UiAvatarImage src="https://github.com/shadcn.png" alt="User" />
          <UiAvatarFallback>CN</UiAvatarFallback>
        </UiAvatar>
        <UiAvatar>
          <UiAvatarImage src="https://github.com/radix-ui.png" alt="Radix" />
          <UiAvatarFallback>RX</UiAvatarFallback>
        </UiAvatar>
        <UiAvatar>
          <UiAvatarImage src="broken-url" alt="Broken" />
          <UiAvatarFallback>MB</UiAvatarFallback>
        </UiAvatar>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Fallback Only</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <UiAvatar>
          <UiAvatarFallback>AB</UiAvatarFallback>
        </UiAvatar>
        <UiAvatar>
          <UiAvatarFallback>JD</UiAvatarFallback>
        </UiAvatar>
        <UiAvatar>
          <UiAvatarFallback>MK</UiAvatarFallback>
        </UiAvatar>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Sizes</h2>
      <div class="flex flex-wrap gap-4 items-end">
        <UiAvatar class="size-6 text-xs">
          <UiAvatarFallback>XS</UiAvatarFallback>
        </UiAvatar>
        <UiAvatar class="size-8 text-xs">
          <UiAvatarFallback>SM</UiAvatarFallback>
        </UiAvatar>
        <UiAvatar>
          <UiAvatarFallback>MD</UiAvatarFallback>
        </UiAvatar>
        <UiAvatar class="size-14 text-base">
          <UiAvatarFallback>LG</UiAvatarFallback>
        </UiAvatar>
        <UiAvatar class="size-20 text-xl">
          <UiAvatarFallback>XL</UiAvatarFallback>
        </UiAvatar>
      </div>
    </section>
  </div>
</template>
