<script setup lang="ts">
import { ref } from "vue";
import {
  UiLabel,
  UiSelect,
  UiSelectContent,
  UiSelectGroup,
  UiSelectItem,
  UiSelectLabel,
  UiSelectSeparator,
  UiSelectTrigger,
  UiSelectValue,
} from "@rosalana/ui";

const timezone = ref("europe-prague");
</script>

<template>
  <div class="flex w-full max-w-xs flex-col gap-1.5">
    <UiLabel for="match-timezone">Match time zone</UiLabel>
    <UiSelect v-model="timezone">
      <UiSelectTrigger id="match-timezone">
        <UiSelectValue placeholder="Pick a time zone" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectGroup>
          <UiSelectLabel>Europe</UiSelectLabel>
          <UiSelectItem value="europe-london">London (GMT)</UiSelectItem>
          <UiSelectItem value="europe-prague">Prague (CET)</UiSelectItem>
          <UiSelectItem value="europe-helsinki">Helsinki (EET)</UiSelectItem>
        </UiSelectGroup>
        <UiSelectSeparator />
        <UiSelectGroup>
          <UiSelectLabel>America</UiSelectLabel>
          <UiSelectItem value="america-new-york">New York (EST)</UiSelectItem>
          <UiSelectItem value="america-chicago">Chicago (CST)</UiSelectItem>
          <UiSelectItem value="america-los-angeles" disabled>
            Los Angeles (PST)
          </UiSelectItem>
        </UiSelectGroup>
      </UiSelectContent>
    </UiSelect>
  </div>
</template>
