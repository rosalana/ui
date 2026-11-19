<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiPinInput, UiPinInputInput } from "@rosalana/ui";

const pin = ref<number[]>([]);
const invite = ref<string[]>(["R", "O", "S", "A"]);
const wrong = ref<string[]>(["1", "2", "3", "4"]);
</script>

<template>
  <div class="grid w-full max-w-md gap-5 sm:grid-cols-2">
    <div class="flex flex-col gap-1.5">
      <UiLabel>Locker PIN (masked)</UiLabel>
      <UiPinInput v-model="pin" type="number" mask placeholder="•">
        <UiPinInputInput v-for="index in 4" :key="index" :index="index - 1" />
      </UiPinInput>
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel>Invite code (letters)</UiLabel>
      <UiPinInput v-model="invite">
        <UiPinInputInput v-for="index in 4" :key="index" :index="index - 1" class="uppercase" />
      </UiPinInput>
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel>Wrong code</UiLabel>
      <UiPinInput v-model="wrong">
        <UiPinInputInput
          v-for="index in 4"
          :key="index"
          :index="index - 1"
          aria-invalid="true"
        />
      </UiPinInput>
      <p class="text-xs text-destructive">This code has expired.</p>
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel>Disabled</UiLabel>
      <UiPinInput :model-value="['4', '2']" disabled>
        <UiPinInputInput v-for="index in 4" :key="index" :index="index - 1" />
      </UiPinInput>
    </div>
  </div>
</template>
