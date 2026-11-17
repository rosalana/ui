<script setup lang="ts" generic="T extends ComboboxItem">
import type { AcceptableValue, ComboboxRootEmits, ComboboxRootProps } from "reka-ui";
import { ComboboxRoot, useForwardPropsEmits } from "reka-ui";
import { computed, onBeforeUnmount, provide, ref, useId } from "vue";
import { LayoutGroup } from "motion-v";
import { useLocale } from "../../../composables/useLocale";
import UiComboboxInput from "./ComboboxInput.vue";
import UiComboboxContent from "./ComboboxContent.vue";
import UiComboboxItem from "./ComboboxItem.vue";
import UiComboboxGroup from "./ComboboxGroup.vue";
import UiComboboxSeparator from "./ComboboxSeparator.vue";
import UiComboboxEmpty from "./ComboboxEmpty.vue";
import UiComboboxLoading from "./ComboboxLoading.vue";
import {
  COMBOBOX_CONTEXT,
  isComboboxGroup,
  type ComboboxFilter,
  type ComboboxGroup,
  type ComboboxItem,
  type ComboboxItems,
  type ComboboxSearch,
} from "./context";

// Inline rather than a named interface: the emitted declaration of a generic component would
// refer to that name, and a name local to <script setup> cannot be exported.
const props = withDefaults(
  defineProps<
    Omit<ComboboxRootProps, "ignoreFilter"> & {
      /**
       * The options, the one source of everything the combobox shows: the list, what the filter
       * matches and the label in the input. Options and groups of options can mix.
       *
       * With `search`, pass the current results, and on the first render the picked option too,
       * so its label is known before the first search.
       */
      items?: ComboboxItems<T>;
      /**
       * Client-side filtering of the options, see `ComboboxFilter`. `false` turns it off, for
       * when the app filters `items` itself. Ignored with `search`.
       */
      filter?: ComboboxFilter | false;
      /**
       * Server-side search. Called with the search and an `AbortSignal` whenever the user types
       * (debounced) and once the combobox opens. The app fetches the results and passes them as
       * `items`, shown as they are. A returned promise drives the loading state, and a newer
       * search aborts the older one, so a slow answer never overwrites a newer one.
       */
      search?: ComboboxSearch;
      /** How long to wait after the last keystroke before calling `search`, in ms. */
      debounce?: number;
      /** Shows the loading state, for an app that loads `items` by itself. */
      loading?: boolean;
      /** Placeholder of the input. */
      placeholder?: string;
      /** An Iconify icon in front of the input text, like `lucide:search`. */
      icon?: string;
      /** A button in the input that clears the picked value. */
      clearable?: boolean;
      /** The id of the input element. */
      id?: string;
    }
  >(),
  {
    filter: "contains",
    debounce: 300,
    openOnClick: true,
    open: undefined,
    // Booleans of reka-ui with a `true` default, Vue would cast a missing one to `false`
    resetSearchTermOnBlur: true,
    resetSearchTermOnSelect: true,
    highlightOnHover: true,
  },
);
const emit = defineEmits<ComboboxRootEmits>();

/**
 * What the slots get of the options left after filtering, in two plain shapes so a custom list
 * never has to tell options and groups apart:
 * - `groups`: always groups, the loose options in a group without a heading;
 * - `options`: every option, flat.
 */
type VisibleOptions = { groups: ComboboxGroup<T>[]; options: T[] };

/** Every part is a slot with a ready default, so a plain `<UiCombobox :items>` is complete. */
defineSlots<{
  /** Everything inside, replaces the input and the list. */
  default?(props: VisibleOptions & { open: boolean; modelValue: AcceptableValue | AcceptableValue[] }): any;
  /** The input, in place of `UiComboboxInput`. */
  input?(): any;
  /** Everything in the list: loading, empty and the options. */
  content?(props: VisibleOptions): any;
  /** The inside of each option, in place of its icon, label and shortcut. */
  item?(props: { item: T }): any;
  /** Text when nothing matches. */
  empty?(): any;
  /** Text while results load. */
  loading?(): any;
}>();

const delegated = computed(() => {
  // `id` belongs to the input alone, on the root too it would be a duplicate
  const { filter, search, debounce, loading, items, placeholder, icon, clearable, id, ...rest } = props;
  return rest;
});
const forwarded = useForwardPropsEmits(delegated, emit);

/* ---------------------------------------------------------------- filtering */

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

/** The search while the list is open, kept as it was while the list closes. */
const search = ref("");

/** A group as the combobox keeps it, with a key that stays the same while filtering. */
type KeyedGroup = ComboboxGroup<T> & { key: string };

/**
 * `items` as groups only: a group stays a group, a run of loose options becomes one group
 * without a heading. One shape for the list, the filter and the slots.
 */
const groups = computed<KeyedGroup[]>(() => {
  const result: KeyedGroup[] = [];
  let loose: KeyedGroup | null = null;

  (props.items ?? []).forEach((entry, index) => {
    if (isComboboxGroup(entry)) {
      loose = null;
      result.push({ ...entry, key: `group:${index}` });
      return;
    }
    if (!loose) result.push((loose = { items: [], key: `loose:${index}` }));
    loose.items.push(entry);
  });

  return result;
});

/**
 * The groups with the options left for the search, empty groups dropped. Filtering is plain
 * data: the list only renders what's here, so reka-ui's own count and "empty" follow by themselves.
 */
const visibleGroups = computed<KeyedGroup[]>(() => {
  const match = matches.value;
  const term = search.value.trim();
  if (!match || !term) return groups.value;

  const keep = (item: T) => [item.label, ...(item.keywords ?? [])].some((text) => match(text, term));
  return groups.value
    .map((group) => ({ ...group, items: group.items.filter(keep) }))
    .filter((group) => group.items.length > 0);
});

const visibleOptions = computed(() => visibleGroups.value.flatMap((group) => group.items));

/* ---------------------------------------------------------------- server-side search */

/** Waiting for the debounce. */
const pending = ref(false);
/** The `search` promise hasn't settled yet. */
const running = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;
let controller: AbortController | undefined;
/** The search whose results are shown (or on their way), `null` before the first one. */
let lastSearch: string | null = null;

function run(term: string) {
  if (!props.search || term === lastSearch) return;
  lastSearch = term;

  controller?.abort();
  const current = (controller = new AbortController());
  running.value = true;

  Promise.resolve()
    .then(() => props.search!(term, current.signal))
    .catch((error) => {
      if (!current.signal.aborted) console.error(error);
    })
    .finally(() => {
      if (controller === current) running.value = false;
    });
}

function setSearch(value: string) {
  search.value = value;
  if (!props.search) return;

  const term = value.trim();
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

const options = computed<T[]>(() => groups.value.flatMap((group) => group.items));

/**
 * Identity of a value. Objects go by the `by` key when there is one, so a fresh copy from the
 * server matches; otherwise by their content.
 */
function keyOf(value: unknown): PropertyKey {
  if (value === null || typeof value !== "object") {
    return typeof value === "symbol" ? value : `${typeof value}:${String(value)}`;
  }
  if (typeof props.by === "string") return keyOf((value as Record<string, unknown>)[props.by]);
  return `object:${JSON.stringify(value)}`;
}

/** Labels by value identity, so looking one up stays cheap with long lists. */
const labelIndex = computed(() => new Map(options.value.map((item) => [keyOf(item.value), item.label])));

function labelOf(value: unknown) {
  // A comparing function can't be turned into a key, so it's a walk through the options
  if (typeof props.by === "function") {
    const compare = props.by as (a: unknown, b: unknown) => boolean;
    return options.value.find((item) => compare(item.value, value))?.label;
  }
  return labelIndex.value.get(keyOf(value));
}

provide(COMBOBOX_CONTEXT, {
  search,
  loading: computed(() => !!props.loading || pending.value || running.value),
  setSearch,
  keyOf,
  labelOf,
  options,
});

// Scopes the highlight's layoutId, so it only slides between options of this combobox.
const layoutGroupId = useId();
</script>

<template>
  <!-- reka-ui's own filter only knows English, so it's always off and the root filters the data -->
  <ComboboxRoot
    data-slot="combobox"
    v-bind="forwarded"
    ignore-filter
    class="relative"
    @update:open="onOpenChange"
  >
    <template #default="{ open, modelValue }">
      <LayoutGroup :id="layoutGroupId">
        <slot :open="open" :model-value="modelValue" :groups="visibleGroups" :options="visibleOptions">
          <slot name="input">
            <UiComboboxInput :placeholder="placeholder" :icon="icon" :clearable="clearable" :id="id" />
          </slot>

          <UiComboboxContent>
            <slot name="content" :groups="visibleGroups" :options="visibleOptions">
              <UiComboboxLoading>
                <template v-if="$slots.loading" #default><slot name="loading" /></template>
              </UiComboboxLoading>
              <UiComboboxEmpty>
                <template v-if="$slots.empty" #default><slot name="empty" /></template>
              </UiComboboxEmpty>

              <template v-for="(group, index) in visibleGroups" :key="group.key">
                <UiComboboxSeparator v-if="index > 0" />
                <UiComboboxGroup :heading="group.heading">
                  <UiComboboxItem v-for="item in group.items" :key="keyOf(item.value)" :item="item">
                    <template v-if="$slots.item" #default><slot name="item" :item="item" /></template>
                  </UiComboboxItem>
                </UiComboboxGroup>
              </template>
            </slot>
          </UiComboboxContent>
        </slot>
      </LayoutGroup>
    </template>
  </ComboboxRoot>
</template>
