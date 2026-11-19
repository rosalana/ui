<script setup lang="ts">
import { shallowRef } from "vue";
import { Time } from "@internationalized/date";
import { UiTimePicker } from "@rosalana/ui";

const kickoff = shallowRef<Time | null>(new Time(14, 30));
</script>

<template>
  <UiTimePicker
    v-model="kickoff"
    :placeholder="new Time(12, 0)"
    class="rounded-2xl border border-border"
  />
</template>
