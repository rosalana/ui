<script setup lang="ts">
import { useForm } from "@inertiajs/vue3";
import {
  UiButton,
  UiPinInput,
  UiPinInputInput,
  UiPinInputSeparator,
} from "@rosalana/ui";
import { ref } from "vue";

const code = ref<number[]>([]);
const form = useForm({ code: "" });

function verify() {
  form.code = code.value.join("");
  form.post("/email/verify", {
    onError: () => (code.value = []),
  });
}
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="text-center">
      <p class="text-sm font-medium">Check your inbox</p>
      <p class="text-xs text-theme">Enter the 6-digit code we sent you. Pasting works too.</p>
    </div>
    <UiPinInput v-model="code" otp type="number" @complete="verify">
      <UiPinInputInput v-for="index in 3" :key="index" :index="index - 1" />
      <UiPinInputSeparator />
      <UiPinInputInput v-for="index in 3" :key="index + 3" :index="index + 2" />
    </UiPinInput>
    <UiButton :loading="form.processing" :disabled="code.length < 6" @click="verify">
      Verify email
    </UiButton>
  </div>
</template>
