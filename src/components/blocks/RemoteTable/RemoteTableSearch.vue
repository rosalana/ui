<script setup lang="ts" generic="T">
import { UiInput } from "../../index";
import { RemoteTableInstance } from "../../../composables";

const props = defineProps<{
  table: RemoteTableInstance<T>;
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
