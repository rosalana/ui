<script setup lang="ts" generic="T">
import type { TableEvents } from "../../../composables/useTable/types"
import type { DataTableProps } from "./types"
import { computed } from "vue"
import { useTable, HeaderRender, ColumnRender } from "../../../composables/useTable"
import { tv } from "tailwind-variants"

// Ui Components
import UiTable from "../../Ui/Table/Table.vue"
import UiTableHeader from "../../Ui/Table/TableHeader.vue"
import UiTableBody from "../../Ui/Table/TableBody.vue"
import UiTableRow from "../../Ui/Table/TableRow.vue"
import UiTableHead from "../../Ui/Table/TableHead.vue"
import UiTableCell from "../../Ui/Table/TableCell.vue"
import UiButton from "../../Ui/Button/Button.vue"
import UiInput from "../../Ui/Input/Input.vue"
import UiCheckbox from "../../Ui/Checkbox/Checkbox.vue"
import UiSelect from "../../Ui/Select/Select.vue"
import UiSelectTrigger from "../../Ui/Select/SelectTrigger.vue"
import UiSelectValue from "../../Ui/Select/SelectValue.vue"
import UiSelectContent from "../../Ui/Select/SelectContent.vue"
import UiSelectItem from "../../Ui/Select/SelectItem.vue"
import UiIcon from "../../Ui/Icon/Icon.vue"
import UiDropdownMenu from "../../Ui/DropdownMenu/DropdownMenu.vue"
import UiDropdownMenuTrigger from "../../Ui/DropdownMenu/DropdownMenuTrigger.vue"
import UiDropdownMenuContent from "../../Ui/DropdownMenu/DropdownMenuContent.vue"
import UiDropdownMenuCheckboxItem from "../../Ui/DropdownMenu/DropdownMenuCheckboxItem.vue"
import UiDropdownMenuLabel from "../../Ui/DropdownMenu/DropdownMenuLabel.vue"
import UiDropdownMenuSeparator from "../../Ui/DropdownMenu/DropdownMenuSeparator.vue"

const dataTable = tv({
  base: "w-full",
})

const props = withDefaults(defineProps<DataTableProps<T>>(), {
  page: 1,
  pageSize: 10,
  pageSizeOptions: () => [10, 20, 30, 50, 100],
  searchable: true,
  searchPlaceholder: "Search...",
  selectable: false,
  columnToggle: true,
  pagination: true,
  emptyMessage: "No results found.",
  debug: false,
})

const emit = defineEmits<{
  sort: [sort: TableEvents<T>["sort"]extends (arg: infer P) => void ? P : never]
  page: [page: number]
  pageSize: [pageSize: number]
  search: [search: string]
  select: [rows: T[]]
}>()

// Initialize useTable
const table = useTable<T>({
  data: props.data,
  columns: props.columns,
  state: {
    page: props.page,
    pageSize: props.pageSize,
  },
  options: {
    key: props.rowKey,
    debug: props.debug,
  },
  on: {
    sort: (sort) => emit("sort", sort),
    page: (page) => emit("page", page),
    pageSize: (pageSize) => emit("pageSize", pageSize),
    search: (search) => emit("search", search),
    select: (rows) => emit("select", rows as T[]),
  },
})

// Computed for visible columns (excluding generated)
const visibleColumns = computed(() => 
  table.columns.visible.filter(col => !col.generated)
)

// Computed for toggleable columns
const toggleableColumns = computed(() => 
  table.columns.toggleable.filter(col => !col.generated)
)

// Search model
const searchModel = computed({
  get: () => table.search,
  set: (value) => { table.search = value },
})

// Page size model
const pageSizeModel = computed({
  get: () => table.paginator.size,
  set: (value) => { table.paginator.size = value },
})

// Get sort icon for column
const getSortIcon = (columnId: string) => {
  if (table.state.sort.id !== columnId) return "lucide:arrow-up-down"
  return table.state.sort.order === "asc" ? "lucide:arrow-up" : "lucide:arrow-down"
}

// Expose table instance for external access
defineExpose({ table })
</script>

<template>
  <div
    data-slot="data-table"
    :class="[dataTable(), props.class]"
  >
    <!-- Toolbar -->
    <div class="flex items-center justify-between gap-4 py-4">
      <!-- Search -->
      <div v-if="searchable" class="flex-1 max-w-sm">
        <UiInput
          v-model="searchModel"
          :placeholder="searchPlaceholder"
          class="h-9"
        >
          <template #prefix>
            <UiIcon name="lucide:search" class="size-4 text-muted-foreground" />
          </template>
        </UiInput>
      </div>

      <div class="flex items-center gap-2">
        <!-- Custom toolbar slot -->
        <slot name="toolbar" :table="table" />

        <!-- Column visibility toggle -->
        <UiDropdownMenu v-if="columnToggle && toggleableColumns.length > 0">
          <UiDropdownMenuTrigger as-child>
            <UiButton variant="outline" size="sm">
              <UiIcon name="lucide:settings-2" class="size-4" />
              <span class="hidden sm:inline">Columns</span>
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="end" class="w-48">
            <UiDropdownMenuLabel>Toggle columns</UiDropdownMenuLabel>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuCheckboxItem
              v-for="column in toggleableColumns"
              :key="column.id"
              :checked="!column.hidden"
              @update:checked="table.toggle(column)"
            >
              <HeaderRender :column="column" :context="null" />
            </UiDropdownMenuCheckboxItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-md border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <!-- Selection column -->
            <UiTableHead v-if="selectable" class="w-12">
              <UiCheckbox
                :checked="table.select.isAllSelected() ? true : table.select.isIndeterminate() ? 'indeterminate' : false"
                @update:checked="table.select.toggleAll()"
              />
            </UiTableHead>

            <!-- Data columns -->
            <UiTableHead
              v-for="column in visibleColumns"
              :key="column.id"
            >
              <template v-if="column.sortable">
                <UiButton
                  variant="ghost"
                  size="sm"
                  class="-ml-3 h-8 data-[state=active]:bg-accent"
                  :data-state="table.state.sort.id === column.id ? 'active' : undefined"
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

            <!-- Actions column slot -->
            <UiTableHead v-if="$slots.actions" class="w-12">
              <span class="sr-only">Actions</span>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>

        <UiTableBody>
          <!-- Empty state -->
          <UiTableRow v-if="table.data.final.length === 0">
            <UiTableCell
              :colspan="visibleColumns.length + (selectable ? 1 : 0) + ($slots.actions ? 1 : 0)"
              class="h-24 text-center text-muted-foreground"
            >
              <slot name="empty">
                {{ emptyMessage }}
              </slot>
            </UiTableCell>
          </UiTableRow>

          <!-- Data rows -->
          <UiTableRow
            v-for="row in table.data.final"
            v-else
            :key="table.getValueByPath(row, rowKey || 'id')"
            :data-state="table.select.isSelected(row) ? 'selected' : undefined"
          >
            <!-- Selection cell -->
            <UiTableCell v-if="selectable" class="w-12">
              <UiCheckbox
                :checked="table.select.isSelected(row)"
                @update:checked="table.select.toggle(row)"
              />
            </UiTableCell>

            <!-- Data cells -->
            <UiTableCell
              v-for="column in visibleColumns"
              :key="column.id"
            >
              <slot :name="`cell-${column.key}`" :row="row" :column="column" :value="column.value(row)">
                <ColumnRender :column="column" :context="row" />
              </slot>
            </UiTableCell>

            <!-- Actions cell -->
            <UiTableCell v-if="$slots.actions" class="w-12">
              <slot name="actions" :row="row" :table="table" />
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>

    <!-- Pagination -->
    <div v-if="pagination" class="flex items-center justify-between gap-4 py-4">
      <!-- Selection info -->
      <div class="flex-1 text-sm text-muted-foreground">
        <template v-if="selectable && table.data.selected.length > 0">
          {{ table.data.selected.length }} of {{ table.data.filtered.length }} row(s) selected.
        </template>
        <template v-else>
          {{ table.data.filtered.length }} row(s) total.
        </template>
      </div>

      <div class="flex items-center gap-6">
        <!-- Page size selector -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground whitespace-nowrap">Rows per page</span>
          <UiSelect v-model="pageSizeModel">
            <UiSelectTrigger class="h-8 w-16">
              <UiSelectValue />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem
                v-for="size in pageSizeOptions"
                :key="size"
                :value="String(size)"
              >
                {{ size }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>

        <!-- Page info -->
        <div class="text-sm text-muted-foreground whitespace-nowrap">
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
  </div>
</template>
