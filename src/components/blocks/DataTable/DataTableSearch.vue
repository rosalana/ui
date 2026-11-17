<script setup lang="ts" generic="T">
import { useLocale } from "../../../composables/useLocale";
import { UiInput } from "../../index";
import { TableInstance } from "../../../composables";

const props = defineProps<{
  table: TableInstance<T>;
}>();

const { t } = useLocale();
</script>
<template>
  <div class="relative">
    <UiInput
      v-model="props.table.search"
      :placeholder="t('table.search')"
      name="search"
      autocomplete="off"
      icon="lucide:search"
      show-clear
    />
  </div>
</template>
