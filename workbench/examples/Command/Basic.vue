<script setup lang="ts">
import { ref } from "vue";
import {
  UiCommand,
  UiCommandEmpty,
  UiCommandGroup,
  UiCommandInput,
  UiCommandItem,
  UiCommandList,
  UiCommandSeparator,
  UiCommandShortcut,
  UiIcon,
  useSonner,
} from "@rosalana/ui";

const sonner = useSonner();
const picked = ref<string>();

function run(value: unknown) {
  if (typeof value !== "string") return;
  picked.value = undefined;
  sonner.default(`Ran "${value}"`);
}
</script>

<template>
  <UiCommand class="w-full max-w-sm" :model-value="picked" @update:model-value="run">
    <UiCommandInput placeholder="Type a command or search..." />
    <UiCommandList>
      <UiCommandEmpty>No command found.</UiCommandEmpty>
      <UiCommandGroup heading="Tournaments">
        <UiCommandItem value="Create tournament">
          <UiIcon name="lucide:trophy" />
          Create tournament
          <UiCommandShortcut>⌘N</UiCommandShortcut>
        </UiCommandItem>
        <UiCommandItem value="Open schedule">
          <UiIcon name="lucide:calendar" />
          Open schedule
        </UiCommandItem>
        <UiCommandItem value="Export results" disabled>
          <UiIcon name="lucide:download" />
          Export results
        </UiCommandItem>
      </UiCommandGroup>
      <UiCommandSeparator />
      <UiCommandGroup heading="Teams">
        <UiCommandItem value="Invite a player">
          <UiIcon name="lucide:user-plus" />
          Invite a player
          <UiCommandShortcut>⌘I</UiCommandShortcut>
        </UiCommandItem>
        <UiCommandItem value="Manage teams">
          <UiIcon name="lucide:users" />
          Manage teams
        </UiCommandItem>
      </UiCommandGroup>
    </UiCommandList>
  </UiCommand>
</template>
