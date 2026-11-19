<script setup lang="ts">
import { ref } from "vue";
import { UploadImage, UiButton, UiInput, UiLabel } from "@rosalana/ui";

const name = ref("Falcons");
const logo = ref<File | null>(null);
const editing = ref(false);
</script>

<template>
  <form class="flex w-full max-w-sm flex-col gap-4" @submit.prevent>
    <UploadImage v-model="logo" v-model:editing="editing" :aspect-ratio="1" radius="full" />

    <!-- The rest of the form steps aside while the crop editor is open. -->
    <template v-if="!editing">
      <div class="flex flex-col gap-1.5">
        <UiLabel for="team-name">Team name</UiLabel>
        <UiInput id="team-name" v-model="name" />
      </div>
      <UiButton type="submit" class="self-end">Save team</UiButton>
    </template>
  </form>
</template>
