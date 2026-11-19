<script setup lang="ts">
import { TextEffect } from "@rosalana/ui";

const texts = ["Create together.", "Build with care.", "Feel at home."];
</script>

<template>
  <div class="space-y-4 text-center">
    <TextEffect.Loop :texts="texts" :effect="TextEffect.Blur" :interval="3000" class="text-3xl font-semibold" />
    <TextEffect.Loop
      :texts="['Falcons win 3:1', 'Wolves draw 2:2', 'Ravens lose 0:1']"
      :effect="TextEffect.Scramble"
      :interval="2500"
      :delay="1000"
      whole
      class="font-mono text-sm text-theme"
    />
  </div>
</template>
