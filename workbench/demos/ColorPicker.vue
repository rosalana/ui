<script setup lang="ts">
import { ref } from "vue";
import { UiColorPicker } from "../../src/components/index";
import Section from "workbench/components/Section.vue";

const hex = ref("#3d84f5");
const rgb = ref("");
const hsl = ref("");
const oklch = ref("");
const hex2 = ref("");
const hex3 = ref("");
</script>

<template>
  <Section title="Hex format" class="w-64">
    <UiColorPicker
      v-model="hex"
      format="hex"
      placeholder="Pick a color (hex)"
    />
    <p class="font-mono text-xs text-theme">{{ hex }}</p>
  </Section>

  <Section title="RGB format" class="w-64">
    <UiColorPicker
      v-model="rgb"
      format="rgb"
      placeholder="Pick a color (rgb)"
    />
    <p class="font-mono text-xs text-theme">{{ rgb }}</p>
  </Section>

  <Section title="HSL format" class="w-64">
    <UiColorPicker
      v-model="hsl"
      format="hsl"
      placeholder="Pick a color (hsl)"
    />
    <p class="font-mono text-xs text-theme">{{ hsl }}</p>
  </Section>

  <Section title="OKLCH format" class="w-64">
    <UiColorPicker
      v-model="oklch"
      format="oklch"
      placeholder="Pick a color (oklch)"
    />
    <p class="font-mono text-xs text-theme">{{ oklch }}</p>
  </Section>

  <Section title="With Palette" class="w-64">
    <UiColorPicker
      v-model="hex2"
      format="hex"
      placeholder="Pick a color (hex)"
      palette
    />
    <p class="font-mono text-xs text-theme">{{ hex2 }}</p>
  </Section>

  <Section title="Without Input" class="w-64">
    <UiColorPicker
      v-model="hex3"
      format="hex"
      placeholder="Pick a color (hex)"
      :input="false"
    />
    <p class="font-mono text-xs text-theme">{{ hex3 }}</p>
  </Section>
</template>
