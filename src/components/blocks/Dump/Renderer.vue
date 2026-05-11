<script setup lang="ts">
import { computed, inject, ref, Ref, watch } from "vue";
import type { VType } from "./types";
import { COLOR } from "./types";
import Icon from "../../Ui/Icon/Icon.vue";

defineOptions({ name: "Renderer" });

const props = withDefaults(
  defineProps<{
    dump: any;
    depth?: number;
    label?: string | number | null;
    autoCollapse?: number;
    _path?: object[];
  }>(),
  {
    depth: 0,
    label: null,
    autoCollapse: 3,
    _path: () => [],
  },
);

// Circular reference detection
// An object is circular only if it appears in its own ancestor chain.
// Using a path array (not a WeakSet) so expand/collapse never causes false positives.

function isAncestor(v: object): boolean {
  return props._path.includes(v);
}

const childPath = computed((): object[] => {
  if (typeof props.dump !== "object" || props.dump === null) return props._path;
  return [...props._path, props.dump];
});

// Type resolution

function vtype(v: any): VType {
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
    if (isAncestor(v)) return "circular";
    if (v instanceof Date) return "date";
    if (v instanceof RegExp) return "regexp";
    return Array.isArray(v) ? "array" : "object";
  }
  return "string";
}

const type = computed(() => vtype(props.dump));
const isExpandable = computed(
  () => type.value === "array" || type.value === "object",
);
const tc = computed(() => COLOR[type.value]);

// Expand / collapse (injected from Root)

const expandTick = inject<Ref<number>>("dump:et", ref(0));
const collapseTick = inject<Ref<number>>("dump:ct", ref(0));
const filterQuery = inject<Ref<string>>("dump:filter", ref(""));

const open = ref(isExpandable.value && props.depth < (props.autoCollapse ?? 3));

watch(expandTick, (n, o) => {
  if (n !== o && isExpandable.value) open.value = true;
});
watch(collapseTick, (n, o) => {
  if (n !== o && isExpandable.value) open.value = false;
});

// Auto-expand when a filter query is active; reset to default when cleared
watch(filterQuery, (q) => {
  if (!isExpandable.value) return;
  open.value = q.trim() ? true : props.depth < (props.autoCollapse ?? 3);
});

// Entries

const entries = computed((): { key: string | number; value: any }[] => {
  if (!isExpandable.value || type.value === "circular") return [];
  if (type.value === "array")
    return (props.dump as any[]).map((v, i) => ({ key: i, value: v }));
  return Object.entries(props.dump as object).map(([k, v]) => ({
    key: k,
    value: v,
  }));
});

const size = computed(() => {
  if (type.value === "array") return (props.dump as any[]).length;
  if (type.value === "object") return Object.keys(props.dump).length;
  return 0;
});

const className = computed(() => {
  if (type.value !== "object" || !props.dump) return "";
  const n = Object.getPrototypeOf(props.dump)?.constructor?.name;
  return n && n !== "Object" ? n : "";
});

// Inline preview (when collapsed)

function previewVal(v: any): string {
  if (v === null) return "null";
  if (v === undefined) return "undef";
  const t = typeof v;
  if (t === "string") return `"${v.slice(0, 10)}${v.length > 10 ? "…" : ""}"`;
  if (t === "number") return isNaN(v) ? "NaN" : !isFinite(v) ? "∞" : String(v);
  if (t === "boolean") return String(v);
  if (Array.isArray(v)) return `[…${v.length}]`;
  if (t === "object") return `{…}`;
  return String(v).slice(0, 12);
}

const inlinePreview = computed(() => {
  if (open.value || !isExpandable.value || size.value === 0) return "";
  const s = entries.value.slice(0, 4);
  const more = size.value > 4 ? " …" : "";
  if (type.value === "array")
    return s.map((e) => previewVal(e.value)).join(", ") + more;
  return s.map((e) => `${e.key}: ${previewVal(e.value)}`).join(", ") + more;
});

// Highlight
// Returns text split into matched / unmatched segments so the template can
// render <mark> on matching substrings without v-html.

function highlight(text: string): { t: string; m: boolean }[] {
  const q = filterQuery.value.trim();
  if (!q) return [{ t: text, m: false }];
  const lower = text.toLowerCase();
  const qLower = q.toLowerCase();
  const idx = lower.indexOf(qLower);
  if (idx === -1) return [{ t: text, m: false }];
  const segs: { t: string; m: boolean }[] = [];
  if (idx > 0) segs.push({ t: text.slice(0, idx), m: false });
  segs.push({ t: text.slice(idx, idx + q.length), m: true });
  if (idx + q.length < text.length)
    segs.push({ t: text.slice(idx + q.length), m: false });
  return segs;
}

// String handling

const MAX_STR = 400;
const strExpanded = ref(false);
const strDisplay = computed(() => {
  if (type.value !== "string") return "";
  const s = props.dump as string;
  return !strExpanded.value && s.length > MAX_STR ? s.slice(0, MAX_STR) : s;
});

// Function signature

const fnSig = computed(() => {
  if (type.value !== "function") return "";
  const src = (props.dump as Function).toString();
  const sig = src
    .replace(/\{[\s\S]*$/, "")
    .trim()
    .replace(/\s+/g, " ");
  return sig.slice(0, 100) + (sig.length > 100 ? "…" : "");
});

// Node copy

const nodeCopied = ref(false);

async function copy() {
  try {
    let text: string;
    try {
      text = JSON.stringify(props.dump, null, 2);
    } catch {
      text = String(props.dump);
    }
    await navigator.clipboard.writeText(text);
    nodeCopied.value = true;
    setTimeout(() => (nodeCopied.value = false), 1800);
  } catch {}
}

// Label

const labelText = computed(() => {
  if (props.label === null) return null;
  const l = String(props.label);
  return /[^a-zA-Z0-9_$]/.test(l) ? `"${l}"` : l;
});

const labelClass = computed(() =>
  typeof props.label === "number" ? "text-zinc-500" : "text-rose-300",
);

const hovered = ref(false);
</script>

<template>
  <div
    class="group min-w-0"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Row: label + value -->
    <div class="flex min-w-0 flex-wrap items-baseline gap-x-1">
      <!-- Label (key from parent) -->
      <span v-if="labelText !== null" class="shrink-0" :class="labelClass">
        <template
          v-for="seg in highlight(String(labelText))"
          :key="seg.t + seg.m"
        >
          <mark
            v-if="seg.m"
            class="rounded bg-amber-400/30 not-italic text-amber-200"
            >{{ seg.t }}</mark
          >
          <span v-else>{{ seg.t }}</span>
        </template>
        <span class="text-zinc-500">:</span>
      </span>

      <!-- ── EXPANDABLE (object / array) ── -->
      <template v-if="isExpandable">
        <!-- Empty -->
        <template v-if="size === 0">
          <span :class="tc" class="font-medium">{{
            type === "array" ? "Array" : className || "Object"
          }}</span>
          <span class="text-zinc-400">{{
            type === "array" ? "[ ]" : "{ }"
          }}</span>
          <span class="text-xs text-zinc-500">empty</span>
        </template>

        <!-- Non-empty: toggle button -->
        <template v-else>
          <button
            @click="open = !open"
            class="flex items-baseline gap-1 transition-opacity hover:opacity-80"
          >
            <Icon
              :name="open ? 'lucide:chevron-down' : 'lucide:chevron-right'"
              class="relative top-px h-3 w-3 shrink-0 text-zinc-400"
            />
            <span :class="tc" class="font-medium">
              {{ type === "array" ? "Array" : className || "Object" }}
            </span>
            <span class="text-zinc-400">{{
              type === "array" ? "[" : "{"
            }}</span>
            <span
              v-if="!open"
              class="max-w-[40ch] truncate text-xs text-zinc-400"
              >{{ inlinePreview }}</span
            >
            <span class="text-zinc-400">{{
              type === "array" ? "]" : "}"
            }}</span>
          </button>
          <span class="text-xs text-zinc-500">({{ size }})</span>
        </template>

        <!-- Hover copy button -->
        <button
          v-if="hovered && size > 0"
          @click.stop="copy"
          class="ml-0.5 inline-flex shrink-0 items-center rounded p-0.5 leading-none transition-colors"
          :class="
            nodeCopied
              ? 'text-emerald-400'
              : 'text-zinc-500 hover:text-zinc-300'
          "
        >
          <Icon
            :name="nodeCopied ? 'lucide:check' : 'lucide:copy'"
            class="h-3 w-3"
          />
        </button>
      </template>

      <!-- ── STRING ── -->
      <template v-else-if="type === 'string'">
        <span class="text-zinc-400">"</span>
        <span class="break-all" :class="tc">
          <template v-for="seg in highlight(strDisplay)" :key="seg.t + seg.m">
            <mark
              v-if="seg.m"
              class="rounded bg-amber-400/30 not-italic text-amber-200"
              >{{ seg.t }}</mark
            >
            <span v-else>{{ seg.t }}</span>
          </template>
        </span>
        <span class="text-zinc-400">"</span>
        <button
          v-if="(dump as string).length > MAX_STR"
          @click="strExpanded = !strExpanded"
          class="ml-1 text-xs text-zinc-400 hover:text-zinc-200"
        >
          {{
            strExpanded ? "▴ less" : `▾ +${(dump as string).length - MAX_STR}`
          }}
        </button>
        <span
          v-if="(dump as string).length > 0"
          class="ml-1 text-xs text-zinc-500"
          >({{ (dump as string).length }})</span
        >
      </template>

      <!-- ── NUMBER ── -->
      <span v-else-if="type === 'number'" :class="tc">{{ dump }}</span>

      <!-- ── BOOLEAN ── -->
      <span v-else-if="type === 'boolean'" :class="tc" class="font-medium">
        {{ dump }}
      </span>

      <!-- ── NULL ── -->
      <span v-else-if="type === 'null'" class="italic" :class="tc">null</span>

      <!-- ── UNDEFINED ── -->
      <span v-else-if="type === 'undefined'" class="italic" :class="tc"
        >undefined</span
      >

      <!-- ── NaN ── -->
      <span v-else-if="type === 'nan'" class="font-medium" :class="tc"
        >NaN</span
      >

      <!-- ── INFINITY ── -->
      <span v-else-if="type === 'infinity'" :class="tc">
        {{ dump > 0 ? "+Infinity" : "-Infinity" }}
      </span>

      <!-- ── DATE ── -->
      <span v-else-if="type === 'date'" :class="tc">
        <span class="text-zinc-400">Date(</span>{{ (dump as Date).toISOString()
        }}<span class="text-zinc-400">)</span>
      </span>

      <!-- ── REGEXP ── -->
      <span v-else-if="type === 'regexp'" :class="tc">{{
        dump.toString()
      }}</span>

      <!-- ── FUNCTION ── -->
      <span v-else-if="type === 'function'" :class="tc">
        <span class="italic text-zinc-400">ƒ </span>{{ fnSig }}
      </span>

      <!-- ── SYMBOL ── -->
      <span v-else-if="type === 'symbol'" :class="tc">{{
        dump.toString()
      }}</span>

      <!-- ── BIGINT ── -->
      <span v-else-if="type === 'bigint'" :class="tc"
        >{{ dump.toString() }}<span class="text-teal-600">n</span></span
      >

      <!-- ── CIRCULAR ── -->
      <span v-else-if="type === 'circular'" class="font-medium" :class="tc">
        [Circular Reference]
      </span>
    </div>

    <!-- Expanded children -->
    <div
      v-if="isExpandable && open && size > 0"
      class="ml-3.5 mt-0.5 border-l border-zinc-800 pl-3"
    >
      <div v-for="entry in entries" :key="entry.key" class="py-px">
        <Renderer
          :dump="entry.value"
          :depth="depth + 1"
          :label="entry.key"
          :auto-collapse="autoCollapse"
          :_path="childPath"
        />
      </div>
    </div>
  </div>
</template>
