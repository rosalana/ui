<script setup lang="ts">
import UiAvatar from "../../src/components/Ui/Avatar/Avatar.vue";
import UiAvatarImage from "../../src/components/Ui/Avatar/AvatarImage.vue";
import UiAvatarFallback from "../../src/components/Ui/Avatar/AvatarFallback.vue";
import UiAvatarLoading from "../../src/components/Ui/Avatar/AvatarLoading.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import { ref } from "vue";

const uploading = ref(false);
/** Changing the query string forces a fresh load, so the loading state is visible. */
const reloadKey = ref(Date.now());
import Section from "workbench/components/Section.vue";
</script>

<template>
  <Section title="With Image" class="flex flex-wrap gap-4 items-center">
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
  </Section>

  <Section title="Loading" class="flex flex-wrap gap-4 items-center">
    <UiAvatar size="lg">
      <UiAvatarImage :src="`https://github.com/shadcn.png?${reloadKey}`" alt="User" />
      <UiAvatarFallback>CN</UiAvatarFallback>
      <UiAvatarLoading />
    </UiAvatar>
    <UiAvatar size="lg">
      <UiAvatarImage src="https://github.com/radix-ui.png" alt="Radix" />
      <UiAvatarFallback>RX</UiAvatarFallback>
      <UiAvatarLoading :loading="uploading" />
    </UiAvatar>
    <UiButton size="sm" variant="outline" @click="reloadKey = Date.now()">Reload image</UiButton>
    <UiButton size="sm" variant="outline" @click="uploading = !uploading">
      {{ uploading ? "Stop upload" : "Simulate upload" }}
    </UiButton>
  </Section>

  <Section title="Fallback Only" class="flex flex-wrap gap-4 items-center">
    <UiAvatar>
      <UiAvatarFallback>AB</UiAvatarFallback>
    </UiAvatar>
    <UiAvatar>
      <UiAvatarFallback>JD</UiAvatarFallback>
    </UiAvatar>
    <UiAvatar>
      <UiAvatarFallback>MK</UiAvatarFallback>
    </UiAvatar>
  </Section>

  <Section title="Sizes" class="flex flex-wrap gap-4 items-end">
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
  </Section>
</template>
