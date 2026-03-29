<script setup lang="ts" generic="T">
import { type HTMLAttributes, type Ref, h, onMounted } from "vue";
import { tv } from "tailwind-variants";
import {
  useRemoteTable,
  ColumnRender,
  HeaderRender,
} from "../../../composables";
import type { Column, RemoteTableState } from "../../../composables";
import { ActionItem } from "../Actions/types";
import Actions from "../Actions/index.vue";
import {
  UiButton,
  UiDropdownMenu,
  UiDropdownMenuCheckboxItem,
  UiDropdownMenuContent,
  UiDropdownMenuLabel,
  UiDropdownMenuSeparator,
  UiDropdownMenuTrigger,
  UiIcon,
  UiInput,
  UiScrollArea,
  UiSelect,
  UiSelectContent,
  UiSelectItem,
  UiSelectTrigger,
  UiSkeleton,
  UiTable,
  UiTableBody,
  UiTableCell,
  UiTableHead,
  UiTableHeader,
  UiTableRow,
} from "../../index";

const styles = tv({ base: "w-full" });

const props = withDefaults(
  defineProps<{
    /** Current page rows from the server */
    data: T[];
    /** Total number of records across all pages */
    total: number;
    /** Column definitions — identical format to DataTable */
    columns: Column<T>[];
    /** Row key field for unique identification */
    rowKey?: string;
    /** Initial page */
    page?: number;
    /** Initial page size */
    pageSize?: number;
    /** Available page size options */
    pageSizeOptions?: number[];
    /** Show search input */
    showSearch?: boolean;
    /** Show column visibility toggle */
    columnToggle?: boolean;
    /** Show pagination controls */
    paginate?: boolean;
    /** Header actions */
    headerActions?: ActionItem[] | ((loading: Ref<boolean>) => ActionItem[]);
    /** Row actions */
    rowActions?: ActionItem[] | ((row: T) => ActionItem[]);
    /** Custom class */
    class?: HTMLAttributes["class"];
  }>(),
  {
    page: 1,
    pageSize: 15,
    pageSizeOptions: () => [10, 25, 50, 100],
    showSearch: true,
    columnToggle: true,
    paginate: true,
  },
);

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
    sort: (sort: RemoteTableState["sort"], loading: Ref<boolean>) =>
      emit("sort", sort, loading),
    search: (search: string, loading: Ref<boolean>) =>
      emit("search", search, loading),
    page: (page: number, loading: Ref<boolean>) => emit("page", page, loading),
    pageSize: (pageSize: number, loading: Ref<boolean>) =>
      emit("pageSize", pageSize, loading),
    toggle: (column: Column<T>) => emit("toggle", column),
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
      <div v-if="props.showSearch" class="relative">
        <UiInput
          v-model="table.search"
          placeholder="Search..."
          name="search"
          autocomplete="off"
          icon="lucide:search"
          show-clear
        />
      </div>

      <!-- Column toggle -->
      <div v-if="props.columnToggle">
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
            <div v-else class="p-2 text-sm text-theme">
              All columns are fixed
            </div>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>
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
      <div
        class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
      >
        <!-- Info + mobile rows-per-page -->
        <div class="flex items-center justify-between sm:flex-1">
          <p class="text-sm text-theme">
            <span class="font-medium text-foreground">{{
              table.data.total
            }}</span>
            rows total
          </p>

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

        <!-- Desktop rows-per-page + navigation -->
        <div
          class="flex items-center justify-center gap-4 sm:justify-end sm:gap-6"
        >
          <div class="hidden items-center gap-2 sm:flex">
            <span class="text-sm text-theme whitespace-nowrap"
              >Rows per page</span
            >
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

          <div class="flex items-center gap-2">
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
            </div>

            <div class="min-w-20 text-center text-sm text-theme tabular-nums">
              <span class="font-medium text-foreground">{{
                table.paginator.current
              }}</span>
              <span class="mx-1 opacity-40">/</span>
              {{ table.paginator.total || 1 }}
            </div>

            <div class="flex items-center gap-1">
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
      </div>
    </slot>
  </div>
</template>
