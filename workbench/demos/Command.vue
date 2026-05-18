<script setup lang="ts">
import { ref } from "vue";
import UiCommand from "../../src/components/Ui/Command/Command.vue";
import UiCommandInput from "../../src/components/Ui/Command/CommandInput.vue";
import UiCommandList from "../../src/components/Ui/Command/CommandList.vue";
import UiCommandEmpty from "../../src/components/Ui/Command/CommandEmpty.vue";
import UiCommandGroup from "../../src/components/Ui/Command/CommandGroup.vue";
import UiCommandItem from "../../src/components/Ui/Command/CommandItem.vue";
import UiCommandSeparator from "../../src/components/Ui/Command/CommandSeparator.vue";
import UiCommandShortcut from "../../src/components/Ui/Command/CommandShortcut.vue";
import UiCommandDialog from "../../src/components/Ui/Command/CommandDialog.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";
import Section from "workbench/components/Section.vue";

const dialogOpen = ref(false);
const selected = ref<string | null>(null);
</script>

<template>
  <Section title="Inline Command" class="w-96">
    <div
      class="rounded-xl border border-muted-200 dark:border-muted-800 overflow-hidden shadow-sm"
    >
      <UiCommand @update:model-value="(v) => (selected = v as string)">
        <UiCommandInput placeholder="Search commands..." />
        <UiCommandList>
          <UiCommandEmpty>No results found.</UiCommandEmpty>
          <UiCommandGroup heading="Navigation">
            <UiCommandItem value="home">
              <UiIcon name="lucide:home" />Home
              <UiCommandShortcut>⌘H</UiCommandShortcut>
            </UiCommandItem>
            <UiCommandItem value="dashboard">
              <UiIcon name="lucide:layout-dashboard" />Dashboard
              <UiCommandShortcut>⌘D</UiCommandShortcut>
            </UiCommandItem>
            <UiCommandItem value="settings">
              <UiIcon name="lucide:settings" />Settings
              <UiCommandShortcut>⌘,</UiCommandShortcut>
            </UiCommandItem>
          </UiCommandGroup>
          <UiCommandSeparator />
          <UiCommandGroup heading="Actions">
            <UiCommandItem value="new-file">
              <UiIcon name="lucide:file-plus" />New File
              <UiCommandShortcut>⌘N</UiCommandShortcut>
            </UiCommandItem>
            <UiCommandItem value="search">
              <UiIcon name="lucide:search" />Search
              <UiCommandShortcut>⌘F</UiCommandShortcut>
            </UiCommandItem>
            <UiCommandItem value="share">
              <UiIcon name="lucide:share-2" />Share
            </UiCommandItem>
          </UiCommandGroup>
          <UiCommandSeparator />
          <UiCommandGroup heading="Help">
            <UiCommandItem value="docs">
              <UiIcon name="lucide:book-open" />Documentation
            </UiCommandItem>
            <UiCommandItem value="support">
              <UiIcon name="lucide:life-buoy" />Support
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </div>
    <p v-if="selected" class="text-xs text-theme mt-2">
      Selected: <strong class="text-foreground">{{ selected }}</strong>
    </p>
  </Section>

  <Section title="Command Dialog (Palette)" class="w-96">
    <UiButton @click="dialogOpen = true">
      <UiIcon name="lucide:command" />
      Open Command Palette
      <UiCommandShortcut class="ml-2 text-primary-foreground/70"
        >⌘K</UiCommandShortcut
      >
    </UiButton>

    <UiCommandDialog v-model:open="dialogOpen">
      <UiCommandInput placeholder="Type a command or search..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <UiCommandGroup heading="Suggestions">
          <UiCommandItem value="calendar" @select="dialogOpen = false">
            <UiIcon name="lucide:calendar" />Calendar
          </UiCommandItem>
          <UiCommandItem value="search-emoji" @select="dialogOpen = false">
            <UiIcon name="lucide:smile" />Search Emoji
          </UiCommandItem>
          <UiCommandItem value="calculator" @select="dialogOpen = false">
            <UiIcon name="lucide:calculator" />Calculator
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Settings">
          <UiCommandItem value="profile" @select="dialogOpen = false">
            <UiIcon name="lucide:user" />Profile
            <UiCommandShortcut>⌘P</UiCommandShortcut>
          </UiCommandItem>
          <UiCommandItem value="billing" @select="dialogOpen = false">
            <UiIcon name="lucide:credit-card" />Billing
            <UiCommandShortcut>⌘B</UiCommandShortcut>
          </UiCommandItem>
          <UiCommandItem value="logout" @select="dialogOpen = false">
            <UiIcon name="lucide:log-out" />Log out
            <UiCommandShortcut>⌘Q</UiCommandShortcut>
          </UiCommandItem>
        </UiCommandGroup>
      </UiCommandList>
    </UiCommandDialog>
  </Section>
</template>
