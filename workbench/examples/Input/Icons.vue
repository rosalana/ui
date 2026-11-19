<script setup lang="ts">
import { ref } from "vue";
import { UiInput, UiLabel } from "@rosalana/ui";

const search = ref("Hawks");
const password = ref("summer-league");
</script>

<template>
  <div class="grid w-full max-w-sm gap-5">
    <div class="grid gap-2">
      <UiLabel for="search-teams">Search teams</UiLabel>
      <UiInput id="search-teams" v-model="search" icon="lucide:search" show-clear placeholder="Find a team" />
    </div>

    <div class="grid gap-2">
      <UiLabel for="account-password">Password</UiLabel>
      <UiInput id="account-password" v-model="password" type="password" password-toggle />
    </div>
  </div>
</template>
