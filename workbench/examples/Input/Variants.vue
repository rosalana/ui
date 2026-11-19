<script setup lang="ts">
import { ref } from "vue";
import { UiInput, UiLabel } from "@rosalana/ui";

const name = ref("");
const email = ref("anna@kingsley");

const emailInvalid = () => !email.value.includes("@") || !email.value.split("@")[1]?.includes(".");
</script>

<template>
  <div class="grid w-full max-w-sm gap-5">
    <div class="grid gap-2">
      <UiLabel for="team-name">Team name</UiLabel>
      <UiInput id="team-name" v-model="name" placeholder="Kingsley Hawks" />
    </div>

    <div class="grid gap-2">
      <UiLabel for="contact-email">Contact email</UiLabel>
      <UiInput
        id="contact-email"
        v-model="email"
        type="email"
        :variant="emailInvalid() ? 'destructive' : 'default'"
        :aria-invalid="emailInvalid()"
        aria-describedby="contact-email-error"
      />
      <p v-if="emailInvalid()" id="contact-email-error" class="text-sm text-destructive">
        Enter a valid email address, e.g. anna@kingsley.org.
      </p>
    </div>
  </div>
</template>
