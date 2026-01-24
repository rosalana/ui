<script setup lang="ts" generic="T">
import { tv } from "tailwind-variants";
import { ColumnRender, HeaderRender, useTable } from "../../../composables";
import { TableEvents } from "../../../composables/useTable/types";
import { DataTableProps } from "./types";
import DataTableColumnToggle from "./DataTableColumnToggle.vue";
import DataTableSearch from "./DataTableSearch.vue";
import {
  UiButton,
  UiCheckbox,
  UiIcon,
  UiScrollArea,
  UiSelect,
  UiSelectContent,
  UiSelectItem,
  UiSelectTrigger,
  UiSelectValue,
  UiTable,
  UiTableBody,
  UiTableCell,
  UiTableHead,
  UiTableHeader,
  UiTableRow,
} from "../../index";
import DataTablePagination from "./DataTablePagination.vue";

const styles = tv({
  base: "w-full",
});

const props = withDefaults(defineProps<DataTableProps<T>>(), {
  page: 1,
  pageSize: 10,
  pageSizeOptions: () => [10, 25, 50, 100],
  showSearch: true,
  selectable: false,
  columnToggle: true,
  paginate: true,
  showFilters: false,
});

const emit = defineEmits<{
  sort: [
    sort: TableEvents<T>["sort"] extends (arg: infer P) => void ? P : never,
  ];
  page: [page: number];
  pageSize: [pageSize: number];
  search: [search: string];
  select: [rows: T[]];
}>();

const table = useTable<T>({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  state: {
    pageSize: props.pageSize,
    page: props.page,
  },
  on: {
    sort: (sort) => emit("sort", sort),
    page: (page) => emit("page", page),
    pageSize: (pageSize) => emit("pageSize", pageSize),
    search: (search) => emit("search", search),
    select: (rows) => emit("select", rows as T[]),
  },
  options: {
    key: props.rowKey,
    debug: props.debug,
  },
});

defineExpose({ table });

const getSortIcon = (columnId: string) => {
  if (table.state.sort.id !== columnId) return "lucide:arrows-up-down";
  return table.state.sort.order === "asc"
    ? "lucide:arrow-up"
    : "lucide:arrow-down";
};
</script>
<template>
  <div data-slot="data-table" :class="[styles(), props.class]">
    <!-- Toolbar -->
    <div class="flex justify-between items-center gap-4 p-4">
      <!-- search -->
      <slot name="search" v-if="props.showSearch">
        <DataTableSearch :table="table" />
      </slot>

      <!-- column toggle -->
      <slot name="column-toggle" v-if="props.columnToggle">
        <DataTableColumnToggle :table="table" />
      </slot>
    </div>

    <!-- Table -->
    <UiScrollArea orientation="horizontal">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <!-- Selection column add it to table instance directly -->
            <UiTableHead v-if="props.selectable" class="w-12">
              <UiCheckbox
                :model-value="
                  table.select.isAllSelected()
                    ? true
                    : table.select.isIndeterminate()
                      ? 'indeterminate'
                      : false
                "
                @update:model-value="table.select.toggleAll()"
              />
            </UiTableHead>

            <!-- Data columns -->
            <UiTableHead
              v-for="column in table.columns.visible"
              :key="column.id"
            >
              <template v-if="column.sortable">
                <UiButton
                  variant="ghost"
                  size="sm"
                  class="-ml-3 h-8 hover:bg-transparent dark:hover:bg-transparent data-[state=active]:text-primary"
                  :data-state="
                    table.state.sort.id === column.id ? 'active' : undefined
                  "
                  @click="table.sort(column)"
                >
                  <HeaderRender :column="column" :context="null" />
                  <UiIcon :name="getSortIcon(column.id)" class="ml-2 size-4" />
                </UiButton>
              </template>
              <template v-else>
                <HeaderRender :column="column" :context="null" />
              </template>
            </UiTableHead>

            <!-- Actions -->
          </UiTableRow>
        </UiTableHeader>

        <UiTableBody>
          <!-- Empty state -->
          <UiTableRow v-if="!table.data.final.length">
            <UiTableCell
              :colspan="
                table.columns.visible.length + (props.selectable ? 1 : 0)
              "
              class="h-24 text-center text-muted"
            >
              <slot name="empty-state"> No data to display. </slot>
            </UiTableCell>
          </UiTableRow>

          <!-- Data Rows -->
          <UiTableRow
            v-else
            v-for="row in table.data.final"
            :key="table.getRowId(row)"
            :data-state="table.select.isSelected(row) ? 'selected' : undefined"
          >
            <!-- Selection cell -->
            <UiTableCell v-if="props.selectable" class="w-12">
              <UiCheckbox
                :model-value="table.select.isSelected(row)"
                @update:model-value="table.select.toggle(row)"
              />
            </UiTableCell>

            <!-- Data cells -->
            <UiTableCell
              v-for="column in table.columns.visible"
              :key="column.id"
            >
              <ColumnRender :column="column" :context="row" />
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </UiScrollArea>

    <!-- Pagination -->
    <slot name="pagination" v-if="props.paginate">
      <DataTablePagination
        :table="table"
        :page-size-options="props.pageSizeOptions"
      />
    </slot>
  </div>
</template>
