<script setup lang="ts">
import { ref } from "vue";
import UiCalendar from "../../src/components/Ui/Calendar/Calendar.vue";
import type { DateValue } from "reka-ui";

const selected = ref<DateValue | undefined>(undefined);
</script>

<template>
  <div class="space-y-10">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Single Date</h2>
      <div class="inline-block rounded-xl border border-border bg-background shadow-sm">
        <UiCalendar v-model="selected" />
      </div>
      <p v-if="selected" class="mt-3 text-xs text-theme">
        Selected: {{ selected }}
      </p>
    </section>
  </div>
</template>
