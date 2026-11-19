<script setup lang="ts">
import { useForm } from "@inertiajs/vue3";
import { UiButton, UiInput, UiLabel } from "@rosalana/ui";

const form = useForm({ name: "Ada Lovelace" });
</script>

<template>
  <form
    class="flex w-full max-w-sm flex-col gap-4"
    @submit.prevent="form.put('/profile')"
  >
    <div class="flex flex-col gap-1.5">
      <UiLabel for="profile-name">Name</UiLabel>
      <UiInput id="profile-name" v-model="form.name" />
    </div>
    <UiButton type="submit" :loading="form.processing" class="self-end">
      Save profile
    </UiButton>
  </form>
</template>
