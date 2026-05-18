import { ref, type Ref } from "vue";

type Key = string | number;

export function useSelect<T>(
  items: Ref<T[]>,
  options?: {
    getKey?: (item: T) => Key;
  },
) {
  const selected: Ref<T[]> = ref([]);
  let lastSelectedIndex: number = -1;

  function select(item: T, mode: "click" | "shift" | "ctrl" = "click") {
    if (mode === "shift") {
      try {
        range(item);
      } catch (error) {
        toggle(item);
      }
    } else if (mode === "ctrl") {
      toggle(item, true);
    } else {
      toggle(item);
    }
    lastSelectedIndex = getIndex(items.value, item);
  }

  function toggle(item: T, multiselect: boolean = false) {
    if (multiselect) {
      const index = getIndex(selected.value, item);
      if (index !== -1) {
        selected.value.splice(index, 1);
      } else {
        selected.value.push(item);
      }
    } else {
      selected.value = [item];
    }
  }

  function range(item: T) {
    const currentIndex = getIndex(items.value, item);
    const referenceIndex = lastSelectedIndex !== -1 ? lastSelectedIndex : 0;
    if (currentIndex === -1) throw new Error("no index found");
    if (referenceIndex === -1) throw new Error("no reference index found");

    const start = Math.min(referenceIndex, currentIndex);
    const end = Math.max(referenceIndex, currentIndex);
    selected.value = items.value.slice(start, end + 1);
  }

  function setSelected(items: T[]) {
    selected.value = items;
  }

  function getIndex(arr: T[], item: T): number {
    let index = -1;
    const findKeyFn = options?.getKey;
    if (!findKeyFn) {
      index = arr.indexOf(item);
    } else {
      const key = findKeyFn(item);
      index = arr.findIndex((i) => findKeyFn(i) === key);
    }
    return index;
  }

  function selectAll() {
    selected.value = [...items.value];
    lastSelectedIndex = -1;
  }

  function clear() {
    selected.value = [];
    lastSelectedIndex = -1;
  }

  function isSelected(item: T): boolean {
    return getIndex(selected.value, item) !== -1;
  }

  return {
    selected,
    select,
    setSelected,
    selectAll,
    clear,
    isSelected,
  };
}
