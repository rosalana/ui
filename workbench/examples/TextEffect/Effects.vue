<script setup lang="ts">
import { TextEffect } from "@rosalana/ui";

const effects = [
  { name: "Typing", component: TextEffect.Typing },
  { name: "Fade", component: TextEffect.Fade },
  { name: "Blur", component: TextEffect.Blur },
  { name: "Slide", component: TextEffect.Slide },
  { name: "Pop", component: TextEffect.Pop },
  { name: "Flip", component: TextEffect.Flip },
  { name: "Bounce", component: TextEffect.Bounce },
  { name: "Rise", component: TextEffect.Rise },
  { name: "Wave", component: TextEffect.Wave },
  { name: "Scramble", component: TextEffect.Scramble },
];
</script>

<template>
  <div class="grid w-full gap-x-8 gap-y-6 sm:grid-cols-2">
    <div v-for="effect in effects" :key="effect.name">
      <p class="mb-1 text-xs font-medium uppercase tracking-wide text-theme">{{ effect.name }}</p>
      <component :is="effect.component" text="Make room for ideas." class="text-xl" />
    </div>
  </div>
</template>
