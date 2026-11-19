<script setup lang="ts">
import {
  UiMenubar,
  UiMenubarContent,
  UiMenubarItem,
  UiMenubarMenu,
  UiMenubarSeparator,
  UiMenubarShortcut,
  UiMenubarTrigger,
} from "@rosalana/ui";
</script>

<template>
  <UiMenubar>
    <UiMenubarMenu>
      <UiMenubarTrigger>Tournament</UiMenubarTrigger>
      <UiMenubarContent>
        <UiMenubarItem>
          New tournament
          <UiMenubarShortcut>⌘N</UiMenubarShortcut>
        </UiMenubarItem>
        <UiMenubarItem>
          Duplicate
          <UiMenubarShortcut>⌘D</UiMenubarShortcut>
        </UiMenubarItem>
        <UiMenubarItem disabled>Archive</UiMenubarItem>
        <UiMenubarSeparator />
        <UiMenubarItem
          class="text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          Delete
        </UiMenubarItem>
      </UiMenubarContent>
    </UiMenubarMenu>
    <UiMenubarMenu>
      <UiMenubarTrigger>Teams</UiMenubarTrigger>
      <UiMenubarContent>
        <UiMenubarItem>Add team</UiMenubarItem>
        <UiMenubarItem>Import roster</UiMenubarItem>
      </UiMenubarContent>
    </UiMenubarMenu>
    <UiMenubarMenu>
      <UiMenubarTrigger>Help</UiMenubarTrigger>
      <UiMenubarContent>
        <UiMenubarItem>Rules</UiMenubarItem>
        <UiMenubarItem>Contact support</UiMenubarItem>
      </UiMenubarContent>
    </UiMenubarMenu>
  </UiMenubar>
</template>
