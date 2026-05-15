<script setup lang="ts">
import { ref } from 'vue'
import { UiColorPicker } from '../../src/components/index'

const hex     = ref('#3d84f5')
const rgb     = ref('')
const hsl     = ref('')
const oklch   = ref('')
const hex2    = ref('')
const hex3    = ref('')
</script>

<template>
  <div class="space-y-8 max-w-sm">

    <div class="space-y-2">
      <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">HEX format</p>
      <UiColorPicker v-model="hex" format="hex" />
      <p class="font-mono text-xs text-theme">{{ hex }}</p>
    </div>

    <div class="space-y-2">
      <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">RGB format</p>
      <UiColorPicker v-model="rgb" format="rgb" placeholder="Pick a color (rgb)" />
      <p class="font-mono text-xs text-theme">{{ rgb }}</p>
    </div>

    <div class="space-y-2">
      <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">HSL format</p>
      <UiColorPicker v-model="hsl" format="hsl" placeholder="Pick a color (hsl)" />
      <p class="font-mono text-xs text-theme">{{ hsl }}</p>
    </div>

    <div class="space-y-2">
      <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">OKLCH format</p>
      <UiColorPicker v-model="oklch" format="oklch" placeholder="Pick a color (oklch)" />
      <p class="font-mono text-xs text-theme">{{ oklch }}</p>
    </div>

    <div class="space-y-2">
      <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">With Palette</p>
      <UiColorPicker v-model="hex2" format="hex" placeholder="Pick a color (hex)" palette />
      <p class="font-mono text-xs text-theme">{{ hex2 }}</p>
    </div>

    <div class="space-y-2">
      <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Without Input</p>
      <UiColorPicker v-model="hex3" format="hex" placeholder="Pick a color (hex)" :input="false" />
      <p class="font-mono text-xs text-theme">{{ hex3 }}</p>
    </div>

  </div>
</template>
