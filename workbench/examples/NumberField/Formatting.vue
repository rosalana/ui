<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiNumberField } from "@rosalana/ui";

const fee = ref(250);
const discount = ref(0.15);
const distance = ref(12.5);
</script>

<template>
  <div class="grid w-full max-w-xl gap-4 sm:grid-cols-3">
    <div class="flex flex-col gap-1.5">
      <UiLabel for="entry-fee">Entry fee</UiLabel>
      <UiNumberField
        id="entry-fee"
        v-model="fee"
        :min="0"
        :step="50"
        :format-options="{ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }"
      />
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel for="early-discount">Early bird discount</UiLabel>
      <UiNumberField
        id="early-discount"
        v-model="discount"
        :min="0"
        :max="1"
        :step="0.05"
        :format-options="{ style: 'percent' }"
      />
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel for="route-length">Route length</UiLabel>
      <UiNumberField
        id="route-length"
        v-model="distance"
        :min="0"
        :step="0.5"
        :format-options="{ style: 'unit', unit: 'kilometer' }"
      />
    </div>
  </div>
</template>
