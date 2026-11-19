<script setup lang="ts">
import { ref } from "vue";
import {
  UiContextMenu,
  UiContextMenuCheckboxItem,
  UiContextMenuContent,
  UiContextMenuItem,
  UiContextMenuLabel,
  UiContextMenuRadioGroup,
  UiContextMenuRadioItem,
  UiContextMenuSeparator,
  UiContextMenuSub,
  UiContextMenuSubContent,
  UiContextMenuSubTrigger,
  UiContextMenuTrigger,
} from "@rosalana/ui";

const layout = ref("grid");
const showScores = ref(true);
const showSeeds = ref(false);
</script>

<template>
  <UiContextMenu>
    <UiContextMenuTrigger
      class="flex h-40 w-full max-w-sm items-center justify-center rounded-2xl border border-dashed text-sm text-theme"
    >
      Right-click the bracket
    </UiContextMenuTrigger>
    <UiContextMenuContent class="w-56">
      <UiContextMenuLabel>Bracket</UiContextMenuLabel>
      <UiContextMenuCheckboxItem v-model="showScores">Show scores</UiContextMenuCheckboxItem>
      <UiContextMenuCheckboxItem v-model="showSeeds">Show seeds</UiContextMenuCheckboxItem>
      <UiContextMenuSeparator />
      <UiContextMenuSub>
        <UiContextMenuSubTrigger>Layout</UiContextMenuSubTrigger>
        <UiContextMenuSubContent>
          <UiContextMenuRadioGroup v-model="layout">
            <UiContextMenuRadioItem value="grid">Grid</UiContextMenuRadioItem>
            <UiContextMenuRadioItem value="tree">Tree</UiContextMenuRadioItem>
            <UiContextMenuRadioItem value="list">List</UiContextMenuRadioItem>
          </UiContextMenuRadioGroup>
        </UiContextMenuSubContent>
      </UiContextMenuSub>
      <UiContextMenuSeparator />
      <UiContextMenuItem>Print bracket</UiContextMenuItem>
    </UiContextMenuContent>
  </UiContextMenu>
</template>
