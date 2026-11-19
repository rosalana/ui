<script setup lang="ts">
import { ref } from "vue";
import { UiAlert, UiAlertDescription, UiAlertTitle, UiButton } from "@rosalana/ui";

const visible = ref(true);
const resending = ref(false);

function resend() {
  // Simulated request, in your app send the verification e-mail here
  resending.value = true;
  setTimeout(() => {
    resending.value = false;
    visible.value = false;
  }, 1200);
}
</script>

<template>
  <div class="w-full max-w-xl">
    <UiAlert v-if="visible" variant="warning" icon="lucide:mail-warning">
      <UiAlertTitle>Verify your e-mail</UiAlertTitle>
      <UiAlertDescription class="mb-3">
        We sent a link to anna@nightowls.cz. Confirm it to join tournaments.
      </UiAlertDescription>
      <UiButton size="sm" variant="outline" :loading="resending" @click="resend">
        Resend e-mail
      </UiButton>
    </UiAlert>
    <p v-else class="text-sm text-theme">A new verification e-mail is on its way.</p>
  </div>
</template>
