<script setup lang="ts">
import { ref } from "vue";
import {
  UiLabel,
  UiNumberField,
  UiNumberFieldDecrement,
  UiNumberFieldIncrement,
  UiNumberFieldInput,
} from "@rosalana/ui";

const rounds = ref(5);
const locked = ref(16);
const guests = ref(2);
</script>

<template>
  <div class="grid w-full max-w-xl gap-4 sm:grid-cols-3">
    <div class="flex flex-col gap-1.5">
      <UiLabel for="rounds-disabled">Disabled</UiLabel>
      <UiNumberField id="rounds-disabled" v-model="rounds" disabled />
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel for="bracket-size">Read-only</UiLabel>
      <UiNumberField id="bracket-size" v-model="locked" readonly />
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel for="guests">Custom controls</UiLabel>
      <!-- animated off keeps the digits plain, the icons of the buttons are props -->
      <UiNumberField v-model="guests" :min="0" :max="10" :animated="false">
        <UiNumberFieldDecrement icon="lucide:user-minus" />
        <UiNumberFieldInput id="guests" />
        <UiNumberFieldIncrement icon="lucide:user-plus" />
      </UiNumberField>
    </div>
  </div>
</template>
