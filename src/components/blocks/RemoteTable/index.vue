<script setup lang="ts" generic="T">
import { type Ref, h, onMounted } from "vue";
import { tv } from "tailwind-variants";
import {
  useRemoteTable,
  ColumnRender,
  HeaderRender,
} from "../../../composables";
import type { Column, RemoteTableState } from "../../../composables";
import type { RemoteTableProps } from "./types";
import Actions from "../Actions/index.vue";
import RemoteTableSearch from "./RemoteTableSearch.vue";
import RemoteTableColumnToggle from "./RemoteTableColumnToggle.vue";
import RemoteTablePagination from "./RemoteTablePagination.vue";
import {
  UiButton,
  UiIcon,
  UiScrollArea,
  UiSkeleton,
  UiTable,
  UiTableBody,
  UiTableCell,
  UiTableHead,
  UiTableHeader,
  UiTableRow,
} from "../../index";

const styles = tv({ base: "w-full" });

const props = withDefaults(defineProps<RemoteTableProps<T>>(), {
  page: 1,
  pageSize: 25,
  pageSizeOptions: () => [10, 25, 50, 100],
  showSearch: true,
  columnToggle: true,
  paginate: true,
});

const emit = defineEmits<{
  sort: [sort: RemoteTableState["sort"], loading: Ref<boolean>];
  search: [search: string, loading: Ref<boolean>];
  page: [page: number, loading: Ref<boolean>];
  pageSize: [pageSize: number, loading: Ref<boolean>];
  toggle: [column: Column<T>];
}>();

const table = useRemoteTable<T>({
  get data() {
    return props.data;
  },
  get total() {
    return props.total;
  },
  get columns() {
    return props.columns;
  },
  state: {
    page: props.page,
    pageSize: props.pageSize,
  },
  on: {
    sort: (sort, loading) => emit("sort", sort, loading),
    search: (search, loading) => emit("search", search, loading),
    page: (page, loading) => emit("page", page, loading),
    pageSize: (pageSize, loading) => emit("pageSize", pageSize, loading),
    toggle: (column) => emit("toggle", column),
  },
  options: {
    key: props.rowKey,
  },
});

defineExpose({ table });

const getSortIcon = (columnId: string): string => {
  if (table.state.sort.id !== columnId) return "lucide:arrows-up-down";
  return table.state.sort.order === "asc"
    ? "lucide:arrow-up"
    : "lucide:arrow-down";
};

onMounted(() => {
  if (props.rowActions || props.headerActions) {
    table.columns.add({
      key: "__actions_column__",
      header: () => {
        return props.headerActions
          ? h(Actions, {
              items:
                typeof props.headerActions === "function"
                  ? props.headerActions(table.loading)
                  : props.headerActions,
            })
          : " ";
      },
      render: (row: T) => {
        return props.rowActions !== undefined
          ? h(Actions, {
              items:
                typeof props.rowActions === "function"
                  ? props.rowActions(row)
                  : props.rowActions,
            })
          : " ";
      },
      filterable: false,
      index: Infinity,
      searchable: false,
      sortable: false,
      toggleable: false,
      relevant: false,
    });
  }
});
</script>

<template>
  <div data-slot="remote-table" :class="[styles(), props.class]">
    <!-- Toolbar -->
    <div class="flex justify-between items-center gap-4 py-4">
      <!-- Search -->
      <slot name="search" v-if="props.showSearch">
        <RemoteTableSearch :table="table" />
      </slot>

      <!-- Column toggle -->
      <slot name="column-toggle" v-if="props.columnToggle">
        <RemoteTableColumnToggle :table="table" />
      </slot>
    </div>

    <!-- Table -->
    <UiScrollArea orientation="horizontal">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead
              v-for="column in table.columns.visible"
              :key="column.id"
            >
              <template v-if="column.sortable">
                <UiButton
                  variant="clear"
                  size="sm"
                  class="-ml-3 h-8 data-[state=active]:text-primary"
                  :data-state="
                    table.state.sort.id === column.id ? 'active' : undefined
                  "
                  @click="table.sort(column)"
                >
                  <HeaderRender :column="column" :context="table.state" />
                  <UiIcon :name="getSortIcon(column.id)" class="ml-2 size-4" />
                </UiButton>
              </template>
              <template v-else>
                <HeaderRender :column="column" :context="table.state" />
              </template>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>

        <UiTableBody>
          <!-- Loading skeleton -->
          <template v-if="table.loading.value">
            <UiTableRow v-for="i in props.pageSize" :key="`skeleton-${i}`">
              <UiTableCell
                v-for="column in table.columns.visible"
                :key="column.id"
              >
                <UiSkeleton class="h-4 w-full" />
              </UiTableCell>
            </UiTableRow>
          </template>

          <!-- Empty state -->
          <UiTableRow v-else-if="!table.data.final.length">
            <UiTableCell
              :colspan="table.columns.visible.length"
              class="h-24 text-center text-theme"
            >
              <slot name="empty-state">No data to display.</slot>
            </UiTableCell>
          </UiTableRow>

          <!-- Data rows -->
          <UiTableRow
            v-else
            v-for="row in table.data.final"
            :key="table.getRowId(row)"
          >
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
      <RemoteTablePagination
        :table="table"
        :page-size-options="props.pageSizeOptions"
      />
    </slot>
  </div>
</template>
