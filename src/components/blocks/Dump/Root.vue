<script setup lang="ts">
import { computed, provide, ref } from "vue";
import type { VType } from "./types";
import { COLOR } from "./types";
import Header from "./Header.vue";
import Renderer from "./Renderer.vue";

const props = withDefaults(
  defineProps<{
    /** The data to display in the dump. */
    dump: any;
    /** Optional title to display in the header. */
    title?: string;
    /** Number of levels to auto-collapse (0 for none, default: 3) */
    autoCollapse?: number | string;
  }>(),
  { autoCollapse: 3 },
);

const expandTick = ref(0);
const collapseTick = ref(0);
const filterQuery = ref("");
provide("dump:et", expandTick);
provide("dump:ct", collapseTick);
provide("dump:filter", filterQuery);

function resolveType(v: any): VType {
  if (v === null) return "null";
  if (v === undefined) return "undefined";
  const t = typeof v;
  if (t === "number")
    return isNaN(v) ? "nan" : !isFinite(v) ? "infinity" : "number";
  if (t === "string") return "string";
  if (t === "boolean") return "boolean";
  if (t === "function") return "function";
  if (t === "symbol") return "symbol";
  if (t === "bigint") return "bigint";
  if (t === "object") {
    if (v instanceof Date) return "date";
    if (v instanceof RegExp) return "regexp";
    return Array.isArray(v) ? "array" : "object";
  }
  return "string";
}

const type = computed(() => resolveType(props.dump));
const typeClass = computed(() => COLOR[type.value]);
const isExpandable = computed(
  () => type.value === "array" || type.value === "object",
);
const size = computed(() => {
  if (type.value === "array") return (props.dump as any[]).length;
  if (type.value === "object") return Object.keys(props.dump).length;
  return 0;
});

const showFilter = ref(false);
const rawView = ref(false);
const copied = ref(false);

const rawJson = computed(() => {
  try {
    return JSON.stringify(props.dump, null, 2);
  } catch {
    return String(props.dump);
  }
});

async function copy() {
  try {
    await navigator.clipboard.writeText(rawJson.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1800);
  } catch {}
}
</script>

<template>
  <div
    class="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-sm leading-relaxed text-zinc-100 shadow-2xl selection:bg-emerald-500 selection:text-white"
  >
    <Header
      :title="title"
      :type="type"
      :type-class="typeClass"
      :size="size"
      :is-expandable="isExpandable"
      :show-filter="showFilter"
      :raw-view="rawView"
      :copied="copied"
      @update:show-filter="showFilter = $event"
      @update:raw-view="rawView = $event"
      @expand-all="expandTick++"
      @collapse-all="collapseTick++"
      @copy="copy"
    />

    <div v-if="rawView" class="max-h-125 overflow-y-auto p-4">
      <pre class="whitespace-pre-wrap break-all text-xs text-zinc-300">{{
        rawJson
      }}</pre>
    </div>
    <div v-else class="p-3">
      <Renderer
        :dump="dump"
        :depth="0"
        :auto-collapse="Number(autoCollapse)"
        :_path="[]"
      />
    </div>
  </div>
</template>
