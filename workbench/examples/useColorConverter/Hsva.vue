<script setup lang="ts">
import { ref } from "vue";
import { UiButton, useColorConverter } from "@rosalana/ui";

const { parseColor, rgbaToHsva, hsvaToRgba, rgbaToHex } = useColorConverter();

const start = parseColor("#ef4444")!;
const hex = ref(rgbaToHex(start));

// Rotate the hue through HSVA and come back to RGBA, the way a color picker does.
function shift() {
  const hsva = rgbaToHsva(parseColor(hex.value)!);
  hex.value = rgbaToHex(hsvaToRgba({ ...hsva, h: (hsva.h + 60) % 360 }));
}
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="size-14 rounded-2xl border" :style="{ backgroundColor: hex }" role="img" :aria-label="`Jersey color ${hex}`" />
    <div class="flex flex-col items-start gap-2">
      <code class="text-sm">{{ hex }}</code>
      <UiButton size="sm" variant="outline" @click="shift">Next jersey color</UiButton>
    </div>
  </div>
</template>
