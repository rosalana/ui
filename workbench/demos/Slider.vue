<script setup lang="ts">
import { ref } from "vue";
import UiSlider from "../../src/components/Ui/Slider/Slider.vue";

const volume = ref([60]);
const range = ref([20, 80]);
const price = ref([150, 450]);
</script>

<template>
  <div class="space-y-10 max-w-md">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Basic</h2>
      <div class="space-y-6">
        <div class="space-y-2">
          <div class="flex justify-between text-xs text-theme">
            <span>Volume</span>
            <span>{{ volume[0] }}%</span>
          </div>
          <UiSlider v-model="volume" :min="0" :max="100" :step="1" />
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Range (Two Thumbs)</h2>
      <div class="space-y-2">
        <div class="flex justify-between text-xs text-theme">
          <span>Range</span>
          <span>{{ range[0] }} – {{ range[1] }}</span>
        </div>
        <UiSlider v-model="range" :min="0" :max="100" :step="1" />
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Price Filter</h2>
      <div class="p-5 rounded-xl border border-muted-200 dark:border-muted-800 space-y-4">
        <div class="flex justify-between">
          <span class="text-sm font-medium">Price Range</span>
          <span class="text-sm text-theme">${{ price[0] }} – ${{ price[1] }}</span>
        </div>
        <UiSlider v-model="price" :min="0" :max="1000" :step="10" />
        <div class="flex justify-between text-xs text-theme">
          <span>$0</span>
          <span>$1,000</span>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Steps</h2>
      <div class="space-y-4">
        <div class="space-y-2">
          <p class="text-xs text-theme">Step: 25</p>
          <UiSlider :default-value="[50]" :min="0" :max="100" :step="25" />
        </div>
        <div class="space-y-2">
          <p class="text-xs text-theme">Step: 10</p>
          <UiSlider :default-value="[40]" :min="0" :max="100" :step="10" />
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Disabled</h2>
      <UiSlider :default-value="[60]" disabled />
    </section>
  </div>
</template>
