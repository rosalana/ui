<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from "reka-ui";
import { ComboboxRoot, useForwardPropsEmits } from "reka-ui";
import { computed, onBeforeUnmount, provide, reactive, ref, useId } from "vue";
import { LayoutGroup } from "motion-v";
import { useLocale } from "../../../composables/useLocale";
import {
  COMBOBOX_CONTEXT,
  type ComboboxFilter,
  type ComboboxSearch,
} from "./context";

interface Props extends Omit<ComboboxRootProps, "ignoreFilter"> {
  /**
   * Client-side filtering of the items, see `ComboboxFilter`. `false` turns it off, for when the
   * app filters the items itself. Ignored with `search`.
   */
  filter?: ComboboxFilter | false;
  /**
   * Server-side search. Called with the search and an `AbortSignal` whenever the user types
   * (debounced) and once the combobox opens. The app fetches and renders the results as items;
   * the combobox then shows them as they are, without filtering. A returned promise drives the
   * loading state, and a newer search aborts the older one, so a slow answer never overwrites a newer one.
   */
  search?: ComboboxSearch;
  /** How long to wait after the last keystroke before calling `search`, in ms. */
  debounce?: number;
  /** Shows the loading state, for an app that loads the items by itself. */
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  filter: "contains",
  debounce: 300,
  openOnClick: true,
  open: undefined,
  // Booleans of reka-ui with a `true` default, Vue would cast a missing one to `false`
  resetSearchTermOnBlur: true,
  resetSearchTermOnSelect: true,
  highlightOnHover: true,
});
const emit = defineEmits<ComboboxRootEmits>();

const delegated = computed(() => {
  const { filter, search, debounce, loading, ...rest } = props;
  return rest;
});
const forwarded = useForwardPropsEmits(delegated, emit);

const { locale } = useLocale();

/** Compares in the app locale, ignoring case and accents, the same way reka-ui does in English. */
const collator = computed(
  () => new Intl.Collator(locale.value, { usage: "search", sensitivity: "base" }),
);

function startsWith(text: string, search: string) {
  const value = text.normalize("NFC");
  const part = search.normalize("NFC");
  return collator.value.compare(value.slice(0, part.length), part) === 0;
}

function contains(text: string, search: string) {
  const value = text.normalize("NFC");
  const part = search.normalize("NFC");
  for (let start = 0; start + part.length <= value.length; start++) {
    if (collator.value.compare(value.slice(start, start + part.length), part) === 0) return true;
  }
  return false;
}

const matches = computed(() => {
  if (props.search || props.filter === false) return null;
  if (props.filter === "startsWith") return startsWith;
  if (props.filter === "contains") return contains;
  return props.filter;
});

/* ---------------------------------------------------------------- server-side search */

/** Waiting for the debounce. */
const pending = ref(false);
/** The `search` promise hasn't settled yet. */
const running = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;
let controller: AbortController | undefined;
/** The search whose results are shown (or on their way), `null` before the first one. */
let lastSearch: string | null = null;

function run(search: string) {
  if (!props.search || search === lastSearch) return;
  lastSearch = search;

  controller?.abort();
  const current = (controller = new AbortController());
  running.value = true;

  Promise.resolve()
    .then(() => props.search!(search, current.signal))
    .catch((error) => {
      if (!current.signal.aborted) console.error(error);
    })
    .finally(() => {
      if (controller === current) running.value = false;
    });
}

function setSearch(search: string) {
  if (!props.search) return;
  const term = search.trim();
  clearTimeout(timer);

  // Typed back to what's already shown
  if (term === lastSearch) {
    pending.value = false;
    return;
  }

  pending.value = true;
  timer = setTimeout(() => {
    pending.value = false;
    run(term);
  }, props.debounce);
}

/** Opening lists the results for an empty search right away, so there's something to pick from. */
function onOpenChange(open: boolean) {
  if (!open || !props.search) return;
  clearTimeout(timer);
  pending.value = false;
  run("");
}

onBeforeUnmount(() => {
  clearTimeout(timer);
  controller?.abort();
});

/* ---------------------------------------------------------------- labels */

/** Objects are matched by `by` when it names a key, so a fresh copy from the server still finds its label. */
function labelKey(value: unknown) {
  if (value && typeof value === "object" && typeof props.by === "string") {
    return (value as Record<string, unknown>)[props.by];
  }
  return value;
}

const labels = reactive(new Map<unknown, string>());

provide(COMBOBOX_CONTEXT, {
  search: ref(""),
  matches,
  loading: computed(() => !!props.loading || pending.value || running.value),
  setSearch,
  rememberLabel: (value, label) => labels.set(labelKey(value), label),
  labelOf: (value) => labels.get(labelKey(value)),
});

// Scopes the highlight's layoutId, so it only slides between items of this combobox.
const layoutGroupId = useId();
</script>

<template>
  <!-- reka-ui's own filter only knows English, so it's always off and the items filter themselves -->
  <ComboboxRoot
    data-slot="combobox"
    v-bind="forwarded"
    ignore-filter
    class="relative"
    @update:open="onOpenChange"
  >
    <template #default="slotProps">
      <LayoutGroup :id="layoutGroupId">
        <slot v-bind="slotProps" />
      </LayoutGroup>
    </template>
  </ComboboxRoot>
</template>
