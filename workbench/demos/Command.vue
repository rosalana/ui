<script setup lang="ts">
import { ref, watch } from "vue";
import UiCommand from "../../src/components/Ui/Command/Command.vue";
import UiCommandInput from "../../src/components/Ui/Command/CommandInput.vue";
import UiCommandList from "../../src/components/Ui/Command/CommandList.vue";
import UiCommandEmpty from "../../src/components/Ui/Command/CommandEmpty.vue";
import UiCommandLoading from "../../src/components/Ui/Command/CommandLoading.vue";
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

// Remote search: the server filters, so the command's own filter is off.
const users = ["Anna Nováková", "Jan Svoboda", "Petr Dvořák", "Eva Černá", "Tomáš Procházka"];
const search = ref("");
const results = ref<string[]>([]);
const loading = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

watch(search, (term) => {
  clearTimeout(timer);
  results.value = [];
  if (!term) return (loading.value = false);

  loading.value = true;
  timer = setTimeout(() => {
    results.value = users.filter((u) => u.toLowerCase().includes(term.toLowerCase()));
    loading.value = false;
  }, 800);
});
</script>

<template>
  <Section title="Inline Command" class="w-96">
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
          <UiCommandItem value="export" disabled>
            <UiIcon name="lucide:download" />Export (disabled)
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
    <p v-if="selected" class="text-xs text-theme mt-2">
      Selected: <strong class="text-foreground">{{ selected }}</strong>
    </p>
  </Section>

  <Section title="Remote Search (ignore-filter + loading)" class="w-96">
    <UiCommand ignore-filter :loading="loading">
      <UiCommandInput v-model="search" placeholder="Search users..." />
      <UiCommandList>
        <UiCommandLoading>Searching...</UiCommandLoading>
        <UiCommandEmpty v-if="search">No users found.</UiCommandEmpty>
        <UiCommandGroup v-if="results.length" heading="Users">
          <UiCommandItem v-for="user in results" :key="user" :value="user">
            <UiIcon name="lucide:user" />{{ user }}
          </UiCommandItem>
        </UiCommandGroup>
      </UiCommandList>
    </UiCommand>
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
