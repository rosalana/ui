<script setup lang="ts" generic="T">
import { UiInput } from "../../index";
import { useTable } from "../../../composables";

const props = defineProps<{
  table: ReturnType<typeof useTable<T>>;
}>();
</script>
<template>
  <div class="relative">
    <UiInput
      v-model="props.table.search"
      placeholder="Search..."
      name="search"
      autocomplete="off"
      icon="lucide:search"
      show-clear
    />
  </div>
</template>
