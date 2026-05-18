<script setup lang="ts">
import { ref } from "vue";
import UiCalendar from "../../src/components/Ui/Calendar/Calendar.vue";
import type { DateValue } from "reka-ui";
import Section from "workbench/components/Section.vue";

const selected = ref<DateValue | undefined>(undefined);
</script>

<template>
  <Section title="Single Date">
    <div
      class="inline-block rounded-xl border border-border bg-background shadow-sm"
    >
      <UiCalendar v-model="selected" />
    </div>
    <p v-if="selected" class="mt-3 text-xs text-theme">
      Selected: {{ selected }}
    </p>
  </Section>
</template>
