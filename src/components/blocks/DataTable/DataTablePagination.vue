<script setup lang="ts" generic="T">
import {
  UiButton,
  UiIcon,
  UiSelect,
  UiSelectContent,
  UiSelectItem,
  UiSelectTrigger,
} from "../../index";
import { useTable } from "../../../composables";

const props = defineProps<{
  table: ReturnType<typeof useTable<T>>;
  pageSizeOptions: number[];
}>();
</script>
<template>
  <div class="flex items-center justify-between gap-4 py-4">
    <!-- Info -->
    <div class="flex-1 text-sm text-muted">
      <template v-if="table.data.selected.length > 0">
        {{ table.data.selected.length }} of {{ table.data.final.length }} row(s)
        selected.
      </template>
      <template v-else>
        {{ table.data.filtered.length }} row(s) total.
      </template>
    </div>

    <div class="flex items-center gap-6">
      <!-- Page size selector -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted whitespace-nowrap">Rows per page</span>
        <UiSelect v-model="table.paginator.size" name="paginator">
          <UiSelectTrigger class="h-8 w-16">
            {{ table.paginator.size }}
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem
              v-for="size in props.pageSizeOptions"
              :key="size"
              :value="String(size)"
            >
              {{ size }}
            </UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>

      <!-- Page info -->
      <div class="text-sm text-muted whitespace-nowrap">
        Page {{ table.paginator.current }} of {{ table.paginator.total || 1 }}
      </div>

      <!-- Pagination buttons -->
      <div class="flex items-center gap-1">
        <UiButton
          variant="outline"
          size="icon"
          class="size-8"
          :disabled="table.paginator.first"
          @click="table.paginator.current = 1"
        >
          <UiIcon name="lucide:chevrons-left" class="size-4" />
          <span class="sr-only">Go to first page</span>
        </UiButton>
        <UiButton
          variant="outline"
          size="icon"
          class="size-8"
          :disabled="table.paginator.first"
          @click="table.paginator.prev()"
        >
          <UiIcon name="lucide:chevron-left" class="size-4" />
          <span class="sr-only">Go to previous page</span>
        </UiButton>
        <UiButton
          variant="outline"
          size="icon"
          class="size-8"
          :disabled="table.paginator.last"
          @click="table.paginator.next()"
        >
          <UiIcon name="lucide:chevron-right" class="size-4" />
          <span class="sr-only">Go to next page</span>
        </UiButton>
        <UiButton
          variant="outline"
          size="icon"
          class="size-8"
          :disabled="table.paginator.last"
          @click="table.paginator.current = table.paginator.total"
        >
          <UiIcon name="lucide:chevrons-right" class="size-4" />
          <span class="sr-only">Go to last page</span>
        </UiButton>
      </div>
    </div>
  </div>
</template>
