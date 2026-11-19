<script setup lang="ts">
import { computed, ref, shallowRef } from "vue";
import { Time } from "@internationalized/date";
import { UiButton, UiTimePicker } from "@rosalana/ui";

const opens = shallowRef<Time | null>(new Time(8, 0));
const closes = shallowRef<Time | null>(new Time(6, 0));
const saved = ref(false);

const invalid = computed(() => !!opens.value && !!closes.value && closes.value.compare(opens.value) <= 0);
</script>

<template>
  <div class="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-border p-4">
    <div class="flex flex-wrap justify-center gap-6">
      <div class="flex flex-col items-center gap-1">
        <p class="text-sm font-medium">Gym opens</p>
        <UiTimePicker v-model="opens" :placeholder="new Time(8, 0)" :minute-step="15" @update:model-value="saved = false" />
      </div>
      <div class="flex flex-col items-center gap-1">
        <p class="text-sm font-medium">Gym closes</p>
        <UiTimePicker v-model="closes" :placeholder="new Time(20, 0)" :minute-step="15" @update:model-value="saved = false" />
      </div>
    </div>
    <p v-if="invalid" class="text-xs text-destructive">The gym has to close after it opens.</p>
    <UiButton :disabled="invalid" @click="saved = true">Save opening hours</UiButton>
    <p v-if="saved" class="text-sm text-theme">Opening hours saved.</p>
  </div>
</template>
