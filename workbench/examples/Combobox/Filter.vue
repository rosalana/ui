<script setup lang="ts">
import { ref } from "vue";
import { UiCombobox, UiLabel, type ComboboxItem } from "@rosalana/ui";

const cities: ComboboxItem[] = [
  { value: "brno", label: "Brno" },
  { value: "bratislava", label: "Bratislava" },
  { value: "budapest", label: "Budapest" },
  { value: "berlin", label: "Berlin" },
  { value: "krakow", label: "Kraków" },
  { value: "olomouc", label: "Olomouc" },
  { value: "ostrava", label: "Ostrava" },
  { value: "vienna", label: "Vienna" },
];

const prefix = ref<string>();
const custom = ref<string>();

// A function gets the text of an option (label, then each keyword) and the trimmed search.
// Here every word typed has to start some word of the city.
function everyWordStarts(text: string, search: string) {
  const words = text.toLowerCase().split(" ");
  return search
    .toLowerCase()
    .split(" ")
    .every((part) => words.some((word) => word.startsWith(part)));
}
</script>

<template>
  <div class="grid w-full max-w-md gap-4 sm:grid-cols-2">
    <div class="flex flex-col gap-1.5">
      <UiLabel for="city-prefix">Starts with</UiLabel>
      <UiCombobox
        id="city-prefix"
        v-model="prefix"
        :items="cities"
        filter="startsWith"
        placeholder="Try &quot;b&quot;..."
      />
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel for="city-custom">Own function</UiLabel>
      <UiCombobox
        id="city-custom"
        v-model="custom"
        :items="cities"
        :filter="everyWordStarts"
        placeholder="Search cities..."
      />
    </div>
  </div>
</template>
