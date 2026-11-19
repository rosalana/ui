<script setup lang="ts" generic="T">
import { useLocale } from "../../../composables/useLocale";
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
import { HeaderRender, TableInstance } from "../../../composables";

const props = defineProps<{
  table: TableInstance<T>;
}>();

const { t } = useLocale();
</script>
<template>
  <div>
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline" size="sm">
          <UiIcon name="lucide:settings-2" class="size-4" />
          <span class="hidden sm:inline">{{ t('table.columns') }}</span>
        </UiButton>
      </UiDropdownMenuTrigger>

      <UiDropdownMenuContent align="end" class="w-48">
        <UiDropdownMenuLabel>{{ t('table.toggleColumns') }}</UiDropdownMenuLabel>
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
        <div v-else class="p-2 text-sm text-theme">
          {{ t('table.allColumnsFixed') }}
        </div>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
</template>
