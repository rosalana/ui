<script setup lang="ts" generic="T">
import {
  UiButton,
  UiIcon,
  UiSelect,
  UiSelectContent,
  UiSelectItem,
  UiSelectTrigger,
} from "../../index";
import { TableInstance } from "../../../composables";

const props = defineProps<{
  table: TableInstance<T>;
  pageSizeOptions: number[];
}>();
</script>
<template>
  <div class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">

    <!-- Row 1 mobile: info + rows per page / Row desktop: just info -->
    <div class="flex items-center justify-between sm:flex-1">
      <!-- Info -->
      <p class="text-sm text-theme">
        <template v-if="table.data.selected.length > 0">
          <span class="font-medium text-foreground">{{ table.data.selected.length }}</span>
          of {{ table.data.final.length }} selected
        </template>
        <template v-else>
          <span class="font-medium text-foreground">{{ table.data.filtered.length }}</span>
          rows total
        </template>
      </p>

      <!-- Rows per page — visible on mobile inline, hidden on desktop (shown in row 2) -->
      <div class="flex items-center gap-2 sm:hidden">
        <span class="text-sm text-theme">Per page</span>
        <UiSelect v-model="table.paginator.size" name="paginator">
          <UiSelectTrigger class="h-8 w-16 text-sm">
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
    </div>

    <!-- Row 2 mobile: nav centered / Row desktop: right-aligned controls -->
    <div class="flex items-center justify-center gap-4 sm:justify-end sm:gap-6">

      <!-- Rows per page — hidden on mobile (shown above), visible on desktop -->
      <div class="hidden items-center gap-2 sm:flex">
        <span class="text-sm text-theme whitespace-nowrap">Rows per page</span>
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

      <!-- Navigation: [<<][<]  Page X of Y  [>][>>] -->
      <div class="flex items-center gap-2">
        <!-- First + Prev -->
        <div class="flex items-center gap-1">
          <UiButton
            variant="outline"
            size="icon"
            class="size-8 sm:size-8"
            :disabled="table.paginator.first"
            @click="table.paginator.current = 1"
          >
            <UiIcon name="lucide:chevrons-left" class="size-4" />
            <span class="sr-only">Go to first page</span>
          </UiButton>
          <UiButton
            variant="outline"
            size="icon"
            class="size-8 sm:size-8"
            :disabled="table.paginator.first"
            @click="table.paginator.prev()"
          >
            <UiIcon name="lucide:chevron-left" class="size-4" />
            <span class="sr-only">Go to previous page</span>
          </UiButton>
        </div>

        <!-- Page indicator -->
        <div class="min-w-[5rem] text-center text-sm text-theme tabular-nums">
          <span class="font-medium text-foreground">{{ table.paginator.current }}</span>
          <span class="mx-1 opacity-40">/</span>
          {{ table.paginator.total || 1 }}
        </div>

        <!-- Next + Last -->
        <div class="flex items-center gap-1">
          <UiButton
            variant="outline"
            size="icon"
            class="size-8 sm:size-8"
            :disabled="table.paginator.last"
            @click="table.paginator.next()"
          >
            <UiIcon name="lucide:chevron-right" class="size-4" />
            <span class="sr-only">Go to next page</span>
          </UiButton>
          <UiButton
            variant="outline"
            size="icon"
            class="size-8 sm:size-8"
            :disabled="table.paginator.last"
            @click="table.paginator.current = table.paginator.total"
          >
            <UiIcon name="lucide:chevrons-right" class="size-4" />
            <span class="sr-only">Go to last page</span>
          </UiButton>
        </div>
      </div>

    </div>
  </div>
</template>
