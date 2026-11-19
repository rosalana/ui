<script setup lang="ts">
import { shallowRef } from "vue";
import { Time } from "@internationalized/date";
import { UiTimePicker } from "@rosalana/ui";

const placeholder = new Time(12, 0);
const hours24 = shallowRef<Time | null>(new Time(18, 45));
const hours12 = shallowRef<Time | null>(new Time(18, 45));
const lap = shallowRef<Time | null>(new Time(0, 12, 30));
</script>

<template>
  <div class="flex flex-wrap items-start justify-center gap-6">
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm font-medium">24 hours</p>
      <UiTimePicker v-model="hours24" :placeholder="placeholder" :hour-cycle="24" class="rounded-2xl border border-border" />
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm font-medium">12 hours</p>
      <UiTimePicker v-model="hours12" :placeholder="placeholder" :hour-cycle="12" class="rounded-2xl border border-border" />
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm font-medium">Seconds, 5 step</p>
      <UiTimePicker
        v-model="lap"
        :placeholder="placeholder"
        :hour-cycle="24"
        seconds
        :minute-step="5"
        class="rounded-2xl border border-border"
      />
    </div>
  </div>
</template>
