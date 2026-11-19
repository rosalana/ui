<script setup lang="ts">
import { computed, ref } from "vue";
import { UiButton, UiDateInput, UiLabel, type DateInputRange } from "@rosalana/ui";

const slot = ref<DateInputRange | null>({
  start: "2026-11-21T15:30",
  end: "2026-11-21T14:00",
});
const booked = ref(false);

const complete = computed(() => !!slot.value?.start && !!slot.value?.end);
// ISO strings of the same shape compare in order
const invalid = computed(() => complete.value && slot.value!.end! <= slot.value!.start!);
</script>

<template>
  <form
    class="flex w-full max-w-md flex-col gap-3 rounded-2xl border border-border p-4"
    @submit.prevent="booked = true"
  >
    <UiLabel for="slot">Pitch booking</UiLabel>
    <UiDateInput
      id="slot"
      v-model="slot"
      range
      time
      show-clear
      :variant="invalid ? 'destructive' : 'default'"
      @update:model-value="booked = false"
    />
    <p v-if="invalid" class="text-xs text-destructive">The booking has to end after it starts.</p>
    <UiButton type="submit" :disabled="!complete || invalid">Book the pitch</UiButton>
    <p v-if="booked" class="text-sm text-theme">The pitch is yours.</p>
  </form>
</template>
