<script setup lang="ts">
import { ref } from "vue";
import UiSlider from "../../src/components/Ui/Slider/Slider.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import Section from "workbench/components/Section.vue";

const volume = ref([60]);
const range = ref([20, 80]);
const price = ref([150, 450]);
const preset = ref([30]);
const vertical = ref([40]);
const opacity = ref([70]);
const budget = ref([200, 600]);
const temperature = ref([18, 24]);

const formatTime = (value: number) => `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
const hours = ref([9 * 60, 17 * 60]);

const rating = ref([3]);
const quality = ref([50]);
const size = ref([2]);
const sizes = [
  { value: 0, label: "XS" },
  { value: 1, label: "S" },
  { value: 2, label: "M" },
  { value: 3, label: "L" },
  { value: 4, label: "XL" },
];
const team = ref([4, 12]);
</script>

<template>
  <Section title="Basic" class="max-w-md">
    <div class="space-y-6">
      <div class="space-y-2">
        <div class="flex justify-between text-xs text-theme">
          <span>Volume</span>
          <span>{{ volume[0] }}%</span>
        </div>
        <UiSlider v-model="volume" :min="0" :max="100" :step="1" />
      </div>
    </div>
  </Section>

  <Section title="Range" class="max-w-md">
    <div class="space-y-2">
      <div class="flex justify-between text-xs text-theme">
        <span>Range</span>
        <span>{{ range[0] }} – {{ range[1] }}</span>
      </div>
      <UiSlider v-model="range" :min="0" :max="100" :step="1" />
    </div>
  </Section>

  <Section title="Price Filter" class="max-w-md">
    <div
      class="p-5 rounded-xl border border-muted-200 dark:border-muted-800 space-y-4"
    >
      <div class="flex justify-between">
        <span class="text-sm font-medium">Price Range</span>
        <span class="text-sm text-theme"
          >${{ price[0] }} – ${{ price[1] }}</span
        >
      </div>
      <UiSlider v-model="price" :min="0" :max="1000" :step="10" />
      <div class="flex justify-between text-xs text-theme">
        <span>$0</span>
        <span>$1,000</span>
      </div>
    </div>
  </Section>

  <Section title="Steps" class="max-w-md">
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
  </Section>

  <Section title="Set from outside" class="max-w-md">
    <div class="space-y-3">
      <UiSlider v-model="preset" />
      <div class="flex gap-2">
        <UiButton v-for="value in [0, 25, 50, 75, 100]" :key="value" size="xs" variant="outline" @click="preset = [value]">
          {{ value }}
        </UiButton>
      </div>
    </div>
  </Section>

  <Section title="Tooltip" class="max-w-md">
    <div class="space-y-8">
      <div class="space-y-2">
        <p class="text-xs text-theme">On hover, drag and keyboard focus</p>
        <UiSlider v-model="volume" tooltip />
      </div>
      <div class="space-y-2">
        <p class="text-xs text-theme">Template: "{value} %"</p>
        <UiSlider v-model="opacity" tooltip="{value} %" />
      </div>
      <div class="space-y-2">
        <p class="text-xs text-theme">One per thumb, by order</p>
        <UiSlider v-model="budget" :max="1000" :step="10" :tooltip="['Min {value} Kč', 'Max {value} Kč']" />
      </div>
      <div class="space-y-2">
        <p class="text-xs text-theme">Function</p>
        <UiSlider v-model="hours" :max="24 * 60" :step="15" :tooltip="(value) => formatTime(value)" />
      </div>
    </div>
  </Section>

  <Section title="Tooltip always visible" class="max-w-md">
    <div class="space-y-12 pt-8">
      <UiSlider v-model="range" tooltip-always />
      <UiSlider v-model="temperature" :min="10" :max="30" :step="0.5" tooltip-always>
        <template #tooltip="{ value, index }">
          <span class="flex items-center gap-1">
            <span class="text-theme">{{ index === 0 ? "from" : "to" }}</span>
            {{ value }} °C
          </span>
        </template>
      </UiSlider>
      <div class="flex h-40 items-center gap-16">
        <UiSlider :default-value="[30, 60]" orientation="vertical" tooltip-always />
        <UiSlider :default-value="[50]" orientation="vertical" tooltip />
      </div>
    </div>
  </Section>

  <Section title="Marks" class="max-w-md">
    <div class="space-y-8">
      <div class="space-y-2">
        <p class="text-xs text-theme">On every step</p>
        <UiSlider v-model="rating" :min="1" :max="5" marks />
      </div>
      <div class="space-y-2">
        <p class="text-xs text-theme">Every 25, with labels</p>
        <UiSlider v-model="quality" :marks="25" mark-labels />
      </div>
      <div class="space-y-2">
        <p class="text-xs text-theme">Own labels</p>
        <UiSlider v-model="size" :max="4" :marks="sizes" />
      </div>
      <div class="space-y-2">
        <p class="text-xs text-theme">Range, a few chosen values</p>
        <UiSlider v-model="team" :min="1" :max="20" :marks="[1, 5, 10, 15, 20]" mark-labels tooltip />
      </div>
      <div class="space-y-2">
        <p class="text-xs text-theme">Steps too dense to draw (1 over 0–1000), nothing shows</p>
        <UiSlider :default-value="[300]" :max="1000" marks />
      </div>
      <div class="flex h-48 items-center gap-10">
        <UiSlider :default-value="[40]" orientation="vertical" :marks="20" mark-labels />
        <UiSlider :default-value="[1, 3]" orientation="vertical" :max="4" :marks="sizes" />
      </div>
    </div>
  </Section>

  <Section title="Fill" class="max-w-md">
    <div class="space-y-8">
      <div class="space-y-2">
        <p class="text-xs text-theme">No fill: :fill="false"</p>
        <UiSlider :default-value="[40]" :fill="false" :marks="20" />
      </div>
      <div class="space-y-2">
        <p class="text-xs text-theme">From the thumb to the end: :fill="[-1]"</p>
        <UiSlider :default-value="[40]" :fill="[-1]" />
      </div>
      <div class="space-y-2">
        <p class="text-xs text-theme">Outside the range: :fill="[0, -1]"</p>
        <UiSlider :default-value="[30, 70]" :fill="[0, -1]" :marks="10" />
      </div>
      <div class="space-y-2">
        <p class="text-xs text-theme">Three thumbs, every other piece: :fill="[0, 2]"</p>
        <UiSlider :default-value="[20, 50, 80]" :fill="[0, 2]" tooltip />
      </div>
      <div class="space-y-2">
        <p class="text-xs text-theme">Inverted, default fill</p>
        <UiSlider :default-value="[30]" inverted :marks="25" mark-labels />
      </div>
    </div>
  </Section>

  <Section title="Vertical" class="max-w-md">
    <div class="flex h-40 items-center gap-6">
      <UiSlider v-model="vertical" orientation="vertical" />
      <UiSlider :default-value="[20, 70]" orientation="vertical" :step="10" />
      <span class="text-xs text-theme">{{ vertical[0] }}</span>
    </div>
  </Section>

  <Section title="Disabled" class="max-w-md">
    <div class="space-y-4">
      <UiSlider :default-value="[60]" disabled />
      <UiSlider :default-value="[20, 70]" disabled />
    </div>
  </Section>
</template>
