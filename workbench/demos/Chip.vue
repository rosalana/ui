<script setup lang="ts">
import { ref } from "vue";
import Section from "workbench/components/Section.vue";
import UiChip from "../../src/components/Ui/Chip/Chip.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";
import UiAvatar from "../../src/components/Ui/Avatar/Avatar.vue";
import UiAvatarImage from "../../src/components/Ui/Avatar/AvatarImage.vue";
import UiAvatarFallback from "../../src/components/Ui/Avatar/AvatarFallback.vue";

const variants = ["default", "secondary", "neutral", "destructive", "success", "warning", "info"] as const;
const colors = ["violet", "pink", "teal", "lime", "orange", "sky"] as const;
const sizes = ["sm", "default", "lg"] as const;
const positions = ["top-right", "bottom-right", "top-left", "bottom-left"] as const;

const show = ref(true);
const unread = ref(3);
</script>

<template>
  <Section title="Variants" class="flex flex-wrap gap-6 items-center">
    <UiChip v-for="variant in variants" :key="variant" :variant="variant">
      <UiButton variant="outline" size="icon" :aria-label="variant">
        <UiIcon name="lucide:inbox" />
      </UiButton>
    </UiChip>
  </Section>

  <Section title="Custom color (any Tailwind color)" class="flex flex-wrap gap-6 items-center">
    <UiChip v-for="color in colors" :key="color" :color="color" :text="color === 'violet' ? 2 : undefined">
      <UiButton variant="outline" size="icon" :aria-label="color">
        <UiIcon name="lucide:inbox" />
      </UiButton>
    </UiChip>
  </Section>

  <Section title="Sizes" class="flex flex-wrap gap-6 items-center">
    <UiChip v-for="size in sizes" :key="size" :size="size" variant="neutral">
      <UiButton variant="outline" size="icon"><UiIcon name="lucide:inbox" /></UiButton>
    </UiChip>
    <UiChip v-for="size in sizes" :key="`t-${size}`" :size="size" text="5">
      <UiButton variant="outline" size="icon"><UiIcon name="lucide:bell" /></UiButton>
    </UiChip>
  </Section>

  <Section title="Positions" class="flex flex-wrap gap-6 items-center">
    <UiChip v-for="position in positions" :key="position" :position="position" variant="success">
      <UiButton variant="outline" size="icon"><UiIcon name="lucide:mail" /></UiButton>
    </UiChip>
  </Section>

  <Section title="Inset (round elements)" class="flex flex-wrap gap-6 items-center">
    <UiChip variant="success" position="bottom-right">
      <UiAvatar>
        <UiAvatarImage src="https://github.com/shadcn.png" alt="User" />
        <UiAvatarFallback>CN</UiAvatarFallback>
      </UiAvatar>
    </UiChip>
    <UiChip v-for="position in positions" :key="position" variant="success" :position="position" inset>
      <UiAvatar>
        <UiAvatarImage src="https://github.com/shadcn.png" alt="User" />
        <UiAvatarFallback>CN</UiAvatarFallback>
      </UiAvatar>
    </UiChip>
  </Section>

  <Section title="Text, max & content slot" class="flex flex-wrap gap-6 items-center">
    <UiChip :text="unread" variant="destructive">
      <UiButton variant="outline" size="icon"><UiIcon name="lucide:bell" /></UiButton>
    </UiChip>
    <UiChip :text="128" :max="99" variant="destructive">
      <UiButton variant="outline" size="icon"><UiIcon name="lucide:message-circle" /></UiButton>
    </UiChip>
    <UiChip text="New" variant="info" size="lg">
      <UiButton variant="outline">Changelog</UiButton>
    </UiChip>
    <UiChip variant="warning" size="lg">
      <template #content><UiIcon name="lucide:zap" class="size-2.5" /></template>
      <UiButton variant="outline" size="icon"><UiIcon name="lucide:cpu" /></UiButton>
    </UiChip>
  </Section>

  <Section title="Show / hide" class="flex flex-wrap gap-6 items-center">
    <UiChip :show="show" variant="neutral">
      <UiButton variant="outline" size="icon"><UiIcon name="lucide:inbox" /></UiButton>
    </UiChip>
    <UiChip :show="unread > 0" :text="unread" variant="destructive">
      <UiButton variant="outline" size="icon"><UiIcon name="lucide:bell" /></UiButton>
    </UiChip>
    <UiButton variant="ghost" size="sm" @click="show = !show">Toggle dot</UiButton>
    <UiButton variant="ghost" size="sm" @click="unread++">+1</UiButton>
    <UiButton variant="ghost" size="sm" @click="unread = 0">Mark all read</UiButton>
  </Section>

  <Section title="Pulse" class="flex flex-wrap gap-6 items-center">
    <UiChip pulse variant="destructive">
      <UiButton variant="outline" size="icon"><UiIcon name="lucide:radio" /></UiButton>
    </UiChip>
    <UiChip pulse variant="success" position="bottom-right" inset>
      <UiAvatar>
        <UiAvatarImage src="https://github.com/radix-ui.png" alt="Radix" />
        <UiAvatarFallback>RX</UiAvatarFallback>
      </UiAvatar>
    </UiChip>
  </Section>

</template>
