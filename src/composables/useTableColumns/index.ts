import { defineComponent, reactive, ref } from "vue";
import type { Column, ResolvedColumn } from "./types";
import { TableErrors } from "../../helpers/table_errors";
import { tableDebug as debug } from "../../helpers/tableDebug";
export * from "./types";

export function useTableColumns<T = any>(rawColumns: Column<T>[]) {
  const columns = ref<ResolvedColumn<T>[]>([]);

  function hashColumn(column: Column): string {
    const str = JSON.stringify(column);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return `table-column-${Math.abs(hash)}`;
  }

  function getValueByPath(obj: any, path: string): any {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  }

  function resolve(
    column: Column<T>,
    overrides: Partial<ResolvedColumn<T>> = {},
  ): ResolvedColumn<T> {
    return reactive<ResolvedColumn<T>>({
      id: hashColumn(column),
      sortable: true,
      searchable: true,
      filterable: false,
      toggleable: true,
      hidden: false,
      relevant: !!(!column.hidden || column.relevant),
      generated: false,
      additional: false,
      value: (row: T) => getValueByPath(row, column.key),
      content: (row: T) =>
        column.render && column.render(row)
          ? column.render(row)
          : getValueByPath(row, column.key),
      ...column,
      ...overrides,
    });
  }

  columns.value = rawColumns.map((column) => resolve(column));

  return {
    get all(): ResolvedColumn<T>[] {
      return columns.value;
    },
    get visible(): ResolvedColumn<T>[] {
      return this.all.filter((col) => col.hidden !== true);
    },
    get hidden(): ResolvedColumn<T>[] {
      return this.all.filter((col) => col.hidden === true);
    },
    get toggleable(): ResolvedColumn<T>[] {
      return this.all.filter((col) => col.toggleable === true);
    },
    get filterable(): ResolvedColumn<T>[] {
      return this.all.filter((col) => col.filterable === true);
    },
    get relevant(): ResolvedColumn<T>[] {
      return this.all.filter(
        (col) => col.relevant === true || col.filterable === true,
      );
    },
    add(column: Column<T> & { index?: number }): ResolvedColumn<T> {
      const resolved = resolve(column, { additional: true });
      if (
        column.index !== undefined &&
        column.index >= 0 &&
        column.index < columns.value.length
      ) {
        columns.value.splice(column.index, 0, resolved);
      } else {
        columns.value.push(resolved);
      }
      return resolved;
    },
    remove(column: ResolvedColumn<T>): void {
      const index = columns.value.findIndex((col) => col.id === column.id);
      if (index !== -1) columns.value.splice(index, 1);
    },
    move(column: ResolvedColumn<T>, newIndex: number): void {
      const currentIndex = columns.value.findIndex(
        (col) => col.id === column.id,
      );
      if (currentIndex === -1) return;
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= columns.value.length) newIndex = columns.value.length - 1;
      columns.value.splice(currentIndex, 1);
      columns.value.splice(newIndex, 0, column);
    },
    moveToEnd(column: ResolvedColumn<T>): void {
      this.move(column, columns.value.length - 1);
    },
    moveToStart(column: ResolvedColumn<T>): void {
      this.move(column, 0);
    },
    moveAfter(column: ResolvedColumn<T>, target: ResolvedColumn<T>): void {
      const idx = columns.value.findIndex((c) => c.id === target.id);
      if (idx !== -1) this.move(column, idx + 1);
    },
    moveBefore(column: ResolvedColumn<T>, target: ResolvedColumn<T>): void {
      const idx = columns.value.findIndex((c) => c.id === target.id);
      if (idx !== -1) this.move(column, idx);
    },
    moveLeft(column: ResolvedColumn<T>): void {
      const idx = columns.value.findIndex((c) => c.id === column.id);
      if (idx > 0) this.move(column, idx - 1);
    },
    moveRight(column: ResolvedColumn<T>): void {
      const idx = columns.value.findIndex((c) => c.id === column.id);
      if (idx < columns.value.length - 1) this.move(column, idx + 1);
    },
    toggle(column: ResolvedColumn<T>): void {
      if (column.toggleable) {
        column.hidden = !column.hidden;
      }
    },
    getByKey(key: string): ResolvedColumn<T> | undefined {
      return columns.value.find((col) => col.key === key);
    },
    binded(key: string): ResolvedColumn<T> | undefined {
      return this.visible.find((col) => col.bindTo === key);
    },
    unbinded(): ResolvedColumn<T>[] {
      return this.visible.filter((col) => !col.bindTo);
    },
  };
}

export const HeaderRender = defineComponent({
  props: ["column", "context"],
  setup(props: { column: ResolvedColumn; context: any }) {
    return () => {
      if (!props.column) {
        if (debug.value) console.warn("[HeaderRender] No column provided");
        return;
      }

      let result;
      if (typeof props.column?.header === "function") {
        result = props.column.header(props.context);
      } else {
        result = props.column.header;
      }

      if (!result) {
        if (debug.value) {
          console.warn(
            ...TableErrors.render.invalidType.null,
            `${props.column.key} header`,
            result,
          );
        }
        return String(result);
      }

      return result;
    };
  },
});

export const ColumnRender = defineComponent({
  props: ["column", "context"],
  setup(props: { column: ResolvedColumn; context: any }) {
    return () => {
      if (!props.column) {
        if (debug.value) console.warn("[ColumnRender] No column provided");
        return;
      }

      const value = props.column?.value(props.context);
      const content = props.column?.content(props.context);

      if (!content) {
        if (debug.value) {
          console.warn(
            ...TableErrors.render.invalidType.null,
            `${props.column.key} reading`,
            value,
            props.context,
          );
        }
        return String(value);
      }

      if (typeof value === "object" && value === content) {
        if (debug.value) {
          console.warn(
            ...TableErrors.render.invalidType.object,
            `${props.column.key} reading`,
            value,
            props.context,
          );
        }
        return String(value);
      }

      return content;
    };
  },
});
