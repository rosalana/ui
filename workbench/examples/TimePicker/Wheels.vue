<script setup lang="ts">
import { shallowRef } from "vue";
import { Time } from "@internationalized/date";
import { UiTimePicker } from "@rosalana/ui";

const placeholder = new Time(12, 0);
const compact = shallowRef<Time | null>(new Time(9, 0));
const bounded = shallowRef<Time | null>(new Time(9, 0));
const locked = shallowRef<Time | null>(new Time(20, 0));
</script>

<template>
  <div class="flex flex-wrap items-start justify-center gap-6">
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm font-medium">3 rows</p>
      <UiTimePicker v-model="compact" :placeholder="placeholder" :hour-cycle="24" :rows="3" class="rounded-2xl border border-border" />
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm font-medium">No loop</p>
      <UiTimePicker v-model="bounded" :placeholder="placeholder" :hour-cycle="24" :loop="false" class="rounded-2xl border border-border" />
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm font-medium text-theme">Disabled</p>
      <UiTimePicker v-model="locked" :placeholder="placeholder" :hour-cycle="24" disabled class="rounded-2xl border border-border" />
    </div>
  </div>
</template>
