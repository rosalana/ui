<script setup lang="ts">
import { ref } from "vue";
import {
  UiMenubar,
  UiMenubarCheckboxItem,
  UiMenubarContent,
  UiMenubarItem,
  UiMenubarLabel,
  UiMenubarMenu,
  UiMenubarRadioGroup,
  UiMenubarRadioItem,
  UiMenubarSeparator,
  UiMenubarSub,
  UiMenubarSubContent,
  UiMenubarSubTrigger,
  UiMenubarTrigger,
} from "@rosalana/ui";

const showScores = ref(true);
const showSeeds = ref(false);
const layout = ref("tree");
</script>

<template>
  <UiMenubar>
    <UiMenubarMenu>
      <UiMenubarTrigger>Export</UiMenubarTrigger>
      <UiMenubarContent>
        <UiMenubarSub>
          <UiMenubarSubTrigger>Download as</UiMenubarSubTrigger>
          <UiMenubarSubContent>
            <UiMenubarItem>PDF</UiMenubarItem>
            <UiMenubarItem>CSV</UiMenubarItem>
            <UiMenubarItem>Image</UiMenubarItem>
          </UiMenubarSubContent>
        </UiMenubarSub>
        <UiMenubarItem>Print bracket</UiMenubarItem>
      </UiMenubarContent>
    </UiMenubarMenu>
    <UiMenubarMenu>
      <UiMenubarTrigger>View</UiMenubarTrigger>
      <UiMenubarContent>
        <UiMenubarLabel>Show</UiMenubarLabel>
        <UiMenubarCheckboxItem v-model="showScores">Scores</UiMenubarCheckboxItem>
        <UiMenubarCheckboxItem v-model="showSeeds">Seeds</UiMenubarCheckboxItem>
        <UiMenubarSeparator />
        <UiMenubarLabel>Layout</UiMenubarLabel>
        <UiMenubarRadioGroup v-model="layout">
          <UiMenubarRadioItem value="tree">Tree</UiMenubarRadioItem>
          <UiMenubarRadioItem value="grid">Grid</UiMenubarRadioItem>
          <UiMenubarRadioItem value="list">List</UiMenubarRadioItem>
        </UiMenubarRadioGroup>
      </UiMenubarContent>
    </UiMenubarMenu>
  </UiMenubar>
</template>
