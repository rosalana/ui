<script setup lang="ts">
import { computed, ref } from "vue";
import { UiInput, UiLabel, UiSmallAlert } from "@rosalana/ui";

const taken = ["night owls", "red foxes"];
const name = ref("Night Owls");
const isTaken = computed(() => taken.includes(name.value.trim().toLowerCase()));
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-2">
    <UiLabel for="team-name">Team name</UiLabel>
    <UiInput id="team-name" v-model="name" placeholder="Your team name" />
    <UiSmallAlert v-if="isTaken" variant="destructive">
      A team called "{{ name }}" already exists.
    </UiSmallAlert>
    <UiSmallAlert v-else-if="name.trim()" variant="success">
      "{{ name }}" is available.
    </UiSmallAlert>
  </div>
</template>
