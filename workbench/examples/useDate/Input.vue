<script setup lang="ts">
import { ref } from "vue";
import { UiInput, UiLabel, useDate } from "@rosalana/ui";

const date = useDate();

// The value from the server, in UTC
const startsAt = ref("2026-12-12T17:00:00.000Z");

// The input holds clock time in the app's zone; the server gets UTC back.
const local = ref(date.toZoned(startsAt.value));

function update(value: string | number) {
  local.value = String(value);
  if (local.value) startsAt.value = date.toUtc(local.value);
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-3">
    <div class="flex flex-col gap-1.5">
      <UiLabel for="starts-at">Kick-off ({{ date.timeZone.value }})</UiLabel>
      <UiInput
        id="starts-at"
        type="datetime-local"
        :model-value="local"
        @update:model-value="update"
      />
    </div>
    <p class="text-xs text-theme">Sent to the server: {{ startsAt }}</p>
  </div>
</template>
