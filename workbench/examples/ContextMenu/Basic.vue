<script setup lang="ts">
import {
  UiContextMenu,
  UiContextMenuContent,
  UiContextMenuItem,
  UiContextMenuSeparator,
  UiContextMenuShortcut,
  UiContextMenuTrigger,
  UiIcon,
} from "@rosalana/ui";
</script>

<template>
  <UiContextMenu>
    <UiContextMenuTrigger
      class="flex h-40 w-full max-w-sm items-center justify-center rounded-2xl border border-dashed text-sm text-theme"
    >
      Right-click a team card
    </UiContextMenuTrigger>
    <UiContextMenuContent class="w-56">
      <UiContextMenuItem>
        <UiIcon name="lucide:users" />
        Open roster
        <UiContextMenuShortcut>⌘O</UiContextMenuShortcut>
      </UiContextMenuItem>
      <UiContextMenuItem>
        <UiIcon name="lucide:pencil" />
        Rename team
        <UiContextMenuShortcut>F2</UiContextMenuShortcut>
      </UiContextMenuItem>
      <UiContextMenuItem disabled>
        <UiIcon name="lucide:archive" />
        Archive
      </UiContextMenuItem>
      <UiContextMenuSeparator />
      <UiContextMenuItem
        class="text-destructive focus:bg-destructive/10 focus:text-destructive"
      >
        <UiIcon name="lucide:trash-2" />
        Delete team
      </UiContextMenuItem>
    </UiContextMenuContent>
  </UiContextMenu>
</template>
