<script setup lang="ts">
import {
  UiButton,
  UiDropdownMenu,
  UiDropdownMenuContent,
  UiDropdownMenuGroup,
  UiDropdownMenuItem,
  UiDropdownMenuLabel,
  UiDropdownMenuSeparator,
  UiDropdownMenuShortcut,
  UiDropdownMenuTrigger,
  UiIcon,
} from "@rosalana/ui";
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="outline">Spring Open 2026</UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="w-56" align="start">
      <UiDropdownMenuLabel>Tournament</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuGroup>
        <UiDropdownMenuItem>
          <UiIcon name="lucide:pencil" />
          Edit details
          <UiDropdownMenuShortcut>⌘E</UiDropdownMenuShortcut>
        </UiDropdownMenuItem>
        <UiDropdownMenuItem>
          <UiIcon name="lucide:copy" />
          Duplicate
          <UiDropdownMenuShortcut>⌘D</UiDropdownMenuShortcut>
        </UiDropdownMenuItem>
        <UiDropdownMenuItem disabled>
          <UiIcon name="lucide:archive" />
          Archive
        </UiDropdownMenuItem>
      </UiDropdownMenuGroup>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem
        class="text-destructive focus:bg-destructive/10 focus:text-destructive"
      >
        <UiIcon name="lucide:trash-2" />
        Delete tournament
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
