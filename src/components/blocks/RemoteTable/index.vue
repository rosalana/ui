<script setup lang="ts" generic="T">
import { h, onMounted, ref, watch } from "vue";
import { tv } from "tailwind-variants";
import {
  useRemoteTable,
  ColumnRender,
  HeaderRender,
} from "../../../composables";
import type { RemoteTableState } from "../../../composables";
import type { RemoteTableEmits, RemoteTableProps } from "./types";
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
  pageSizeOptions: () => [10, 25, 50, 100],
  showSearch: true,
  columnToggle: true,
  paginate: true,
  page: 1,
  size: 10,
  search: "",
  sort: () => ({ id: null, order: "asc" }),
  loading: false,
});

const loading = ref(props.loading);

watch(
  () => props.loading,
  (newVal) => {
    loading.value = newVal;
  },
);

const emit = defineEmits<RemoteTableEmits<T>>();

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
    pageSize: props.size,
    search: props.search,
  },
  on: {
    sort: (sort) => {
      if (sort.id !== null) {
        sort.id = table.columns.getById(sort.id)?.key ?? null;
      }

      emit("update:sort", sort);
      emit("update");
    },
    search: (search) => {
      emit("update:search", search);
      emit("update");
    },
    page: (page) => {
      emit("update:page", page);
      emit("update");
    },
    pageSize: (pageSize) => {
      emit("update:size", pageSize);
      emit("update");
    },
    toggle: (column) => {
      emit("toggle", column);
      emit("update");
    },
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
  if (props.sort.id !== null) {
    table.state.sort = {
      id: table.columns.getByKey(props.sort.id)?.id ?? null,
      order: props.sort.order,
    };
  }

  if (props.rowActions || props.headerActions) {
    table.columns.add({
      key: "__actions_column__",
      header: () => {
        return props.headerActions
          ? h(Actions, {
              items:
                typeof props.headerActions === "function"
                  ? props.headerActions(loading)
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
    
    <slot name="header" />

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

    <slot name="above-table" />

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
          <template v-if="loading">
            <UiTableRow v-for="i in Number(props.size)" :key="`skeleton-${i}`">
              <UiTableCell
                v-for="column in table.columns.visible"
                :key="column.id"
              >
                <UiSkeleton class="h-4 w-full my-2" />
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

    <slot name="below-table" />

    <!-- Pagination -->
    <slot name="pagination" v-if="props.paginate">
      <RemoteTablePagination
        :table="table"
        :page-size-options="props.pageSizeOptions"
      />
    </slot>

    <slot name="footer" />
  </div>
</template>
