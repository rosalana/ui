<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiCommandDialog,
  UiCommandEmpty,
  UiCommandGroup,
  UiCommandInput,
  UiCommandItem,
  UiCommandList,
  UiCommandShortcut,
  UiIcon,
  defineShortcuts,
  useSonner,
} from "@rosalana/ui";

const sonner = useSonner();
const open = ref(false);

// ⌘K on macOS, Ctrl+K elsewhere.
defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => (open.value = !open.value),
  },
});

function go(page: string) {
  open.value = false;
  sonner.default(`Opening ${page}`);
}
</script>

<template>
  <div>
    <UiButton variant="outline" @click="open = true">
      <UiIcon name="lucide:search" />
      Search
      <UiCommandShortcut class="ml-4">⌘K</UiCommandShortcut>
    </UiButton>

    <UiCommandDialog v-model:open="open">
      <UiCommandInput placeholder="Jump to..." />
      <UiCommandList>
        <UiCommandEmpty>Nothing matches your search.</UiCommandEmpty>
        <UiCommandGroup heading="Pages">
          <UiCommandItem value="Dashboard" @select="go('Dashboard')">
            <UiIcon name="lucide:layout-dashboard" />
            Dashboard
          </UiCommandItem>
          <UiCommandItem value="Tournaments" @select="go('Tournaments')">
            <UiIcon name="lucide:trophy" />
            Tournaments
          </UiCommandItem>
          <UiCommandItem value="Teams" @select="go('Teams')">
            <UiIcon name="lucide:users" />
            Teams
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandGroup heading="Account">
          <UiCommandItem value="Profile" @select="go('Profile')">
            <UiIcon name="lucide:user" />
            Profile
          </UiCommandItem>
          <UiCommandItem value="Settings" @select="go('Settings')">
            <UiIcon name="lucide:settings" />
            Settings
          </UiCommandItem>
        </UiCommandGroup>
      </UiCommandList>
    </UiCommandDialog>
  </div>
</template>
