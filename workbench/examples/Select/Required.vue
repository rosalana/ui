<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiLabel,
  UiSelect,
  UiSelectContent,
  UiSelectItem,
  UiSelectTrigger,
  UiSelectValue,
} from "@rosalana/ui";

const team = ref<string>();
const locked = ref("owner");
</script>

<template>
  <form class="flex w-full max-w-xs flex-col gap-4" @submit.prevent>
    <div class="flex flex-col gap-1.5">
      <UiLabel for="join-team">Team</UiLabel>
      <UiSelect v-model="team" name="team" required>
        <UiSelectTrigger id="join-team">
          <UiSelectValue placeholder="Pick your team" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="north-owls">North Owls</UiSelectItem>
          <UiSelectItem value="river-foxes">River Foxes</UiSelectItem>
          <UiSelectItem value="iron-bears">Iron Bears</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="flex flex-col gap-1.5">
      <UiLabel for="join-role">Role</UiLabel>
      <UiSelect v-model="locked" disabled>
        <UiSelectTrigger id="join-role">
          <UiSelectValue />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="owner">Owner</UiSelectItem>
          <UiSelectItem value="member">Member</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
      <p class="text-xs text-theme">The first member of a team is always its owner.</p>
    </div>

    <UiButton type="submit" :disabled="!team" class="self-end">Join team</UiButton>
  </form>
</template>
