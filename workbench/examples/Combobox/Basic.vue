<script setup lang="ts">
import { ref } from "vue";
import { UiCombobox, UiLabel, type ComboboxItem } from "@rosalana/ui";

const countries: ComboboxItem[] = [
  { value: "cz", label: "Czechia", shortcut: "CZ", keywords: ["cesko"] },
  { value: "sk", label: "Slovakia", shortcut: "SK", keywords: ["slovensko"] },
  { value: "de", label: "Germany", shortcut: "DE", keywords: ["deutschland"] },
  { value: "at", label: "Austria", shortcut: "AT", keywords: ["osterreich"] },
  { value: "pl", label: "Poland", shortcut: "PL", keywords: ["polska"] },
  { value: "hu", label: "Hungary", shortcut: "HU", disabled: true },
  { value: "gb", label: "United Kingdom", shortcut: "GB", keywords: ["uk", "england"] },
];

// Prefilled like a form opened for editing: the label shows before the list is opened.
const country = ref<string | undefined>("cz");
</script>

<template>
  <div class="flex w-full max-w-xs flex-col gap-1.5">
    <UiLabel for="team-country">Team country</UiLabel>
    <UiCombobox
      id="team-country"
      v-model="country"
      :items="countries"
      placeholder="Search countries..."
      clearable
    />
    <p class="text-xs text-theme">
      Try "deutschland" or "uk", options also match their keywords. Hungary is closed for
      registration.
    </p>
  </div>
</template>
