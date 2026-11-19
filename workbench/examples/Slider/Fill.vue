<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiSlider } from "@rosalana/ui";

const minimum = ref([30]);
const middle = ref([20, 70]);
const hue = ref([210]);
const plain = ref([40]);
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-3">
      <UiLabel>At least this many wins</UiLabel>
      <!-- the thumbs split the track into pieces, -1 is the last one: from the thumb to max -->
      <UiSlider v-model="minimum" :fill="[-1]" />
    </div>
    <div class="flex flex-col gap-3">
      <UiLabel>Skip the middle</UiLabel>
      <!-- fill 0 and 2 colors the outer pieces, the one between the thumbs stays empty -->
      <UiSlider v-model="middle" :fill="[0, 2]" />
    </div>
    <div class="flex flex-col gap-3">
      <UiLabel>Team color hue</UiLabel>
      <!-- transparent drops the track colors so your own background shows through -->
      <UiSlider
        v-model="hue"
        :max="360"
        transparent
        class="rounded-full bg-[linear-gradient(to_right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)] [&_[data-slot=slider-track]]:h-2"
        aria-label="Team color hue"
      />
    </div>
    <div class="flex flex-col gap-3">
      <UiLabel>Without fill</UiLabel>
      <UiSlider v-model="plain" :fill="false" />
    </div>
  </div>
</template>
