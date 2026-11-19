<script setup lang="ts">
import { computed, ref } from "vue";
import { UiLabel, UiNumberField } from "@rosalana/ui";

const capacity = ref(24);
const seats = ref<number>();

const invalid = computed(() => seats.value === undefined || Number.isNaN(seats.value));
</script>

<template>
  <div class="grid w-full max-w-md gap-4 sm:grid-cols-2">
    <div class="flex flex-col gap-1.5">
      <UiLabel for="hall-capacity">Hall capacity</UiLabel>
      <UiNumberField id="hall-capacity" v-model="capacity" :min="1" />
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel for="reserved-seats">Reserved seats</UiLabel>
      <UiNumberField
        id="reserved-seats"
        v-model="seats"
        :min="0"
        placeholder="0"
        :variant="invalid ? 'destructive' : 'default'"
      />
      <p v-if="invalid" class="text-xs text-destructive">Enter how many seats are reserved.</p>
    </div>
  </div>
</template>
