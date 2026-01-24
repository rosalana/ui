<script setup lang="ts" generic="T">
import {
  UiButton,
  UiDropdownMenu,
  UiDropdownMenuCheckboxItem,
  UiDropdownMenuContent,
  UiDropdownMenuLabel,
  UiDropdownMenuSeparator,
  UiDropdownMenuTrigger,
  UiIcon,
} from "../../index";
import { HeaderRender, useTable } from "../../../composables";

const props = defineProps<{
  table: ReturnType<typeof useTable<T>>;
}>();
</script>
<template>
  <div>
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline" size="sm">
          <UiIcon name="lucide:settings-2" class="size-4" />
          <span class="hidden sm:inline">Columns</span>
        </UiButton>
      </UiDropdownMenuTrigger>

      <UiDropdownMenuContent align="end" class="w-48">
        <UiDropdownMenuLabel>Toggle Columns</UiDropdownMenuLabel>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuCheckboxItem
          v-if="table.columns.toggleable.length"
          v-for="column in table.columns.toggleable"
          :key="column.id"
          :model-value="!column.hidden"
          @update:model-value="table.toggle(column)"
        >
          <HeaderRender :column="column" :context="null" />
        </UiDropdownMenuCheckboxItem>
        <div v-else class="p-2 text-sm text-muted-foreground">
          All columns are fixed
        </div>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
</template>
