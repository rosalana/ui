<script setup lang="ts">
import type { AcceptableValue, ComboboxInputProps } from "reka-ui";
import {
  ComboboxAnchor,
  ComboboxInput,
  ComboboxTrigger,
  injectComboboxRootContext,
  injectListboxRootContext,
  useForwardProps,
} from "reka-ui";
import { computed, inject, nextTick, shallowRef, watch, type Ref } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { AnimatePresence, motion } from "motion-v";
import { useLocale } from "../../../composables/useLocale";
import UiIcon from "../Icon/Icon.vue";
import UiButton from "../Button/Button.vue";
import { COMBOBOX_CONTEXT } from "./context";

const comboboxAnchor = tv({
  base: [
    "flex h-9 w-full items-center gap-2 rounded-xl border border-border bg-background px-3 text-sm text-foreground",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40",
    "hover:shadow-muted dark:shadow-muted/20 dark:hover:shadow-muted/80",
    "transition-shadow duration-200 ease-out",
    "focus-within:ring-1 focus-within:ring-ring",
    "has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50",
  ],
});

const comboboxInput = tv({
  base: [
    "h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-theme",
    "disabled:cursor-not-allowed",
  ],
});

interface Props extends Omit<ComboboxInputProps, "modelValue"> {
  class?: ClassValue;
  placeholder?: string;
  /** An Iconify icon in front of the text, like `lucide:search`. */
  icon?: string;
  /** A button that clears the picked value. */
  clearable?: boolean;
}

const props = defineProps<Props>();

/** The text in the input: the search while typing, the picked value's label otherwise. */
const text = defineModel<string>({ default: "" });

// Attributes like `id` or `name` belong to the input, not the wrapper.
defineOptions({ inheritAttrs: false });

const delegated = computed(() => {
  const { class: _, placeholder, icon, clearable, displayValue, ...rest } = props;
  return rest;
});
const forwarded = useForwardProps(delegated);

const { t } = useLocale();
const context = inject(COMBOBOX_CONTEXT)!;
const root = injectComboboxRootContext();
const listbox = injectListboxRootContext();

function selectedValues(): unknown[] {
  const value = root.modelValue.value;
  if (Array.isArray(value)) return value;
  return value === undefined || value === null ? [] : [value];
}

/**
 * Labels of what's picked right now, held on after the item leaves `items` (a new server search
 * replaced the results). Only the current selection, so it never grows with the searches.
 */
const pickedLabels = shallowRef(new Map<PropertyKey, string>());

watch(
  [root.modelValue, context.options],
  () => {
    const next = new Map<PropertyKey, string>();
    for (const value of selectedValues()) {
      const key = context.keyOf(value);
      const label = context.labelOf(value) ?? pickedLabels.value.get(key);
      if (label !== undefined) next.set(key, label);
    }
    pickedLabels.value = next;
  },
  { immediate: true, deep: true },
);

/**
 * What the input shows for the picked value, all from data, never from rendered items: the
 * app's `displayValue`, else the label from `items`, else the value itself when it's plain.
 */
function display(value: AcceptableValue) {
  if (props.displayValue) return props.displayValue(value);
  if (value === undefined || value === null || Array.isArray(value)) return "";
  return (
    context.labelOf(value) ??
    pickedLabels.value.get(context.keyOf(value)) ??
    (typeof value === "object" ? "" : String(value))
  );
}

/**
 * reka-ui writes the label only when the value changes or the input loses focus. A label that
 * arrives later (items loaded after the value was set) goes in here, unless the user is typing.
 */
const pickedText = computed(() => display(root.modelValue.value));
watch(pickedText, (label) => {
  if (!root.open.value) text.value = label;
});

// Only while open: closing clears reka-ui's search, which must neither show every item during
// the exit animation nor send a request. Filtering hides items without reka-ui noticing, so the
// first one left gets highlighted here.
watch([root.filterSearch, root.open], ([search, open]) => {
  if (!open) return;
  context.setSearch(search);
  nextTick(() => listbox.highlightFirstItem());
});

/**
 * New results replace the old ones without the list ever going empty (they stay while loading),
 * so reka-ui doesn't move the highlight. Once the highlighted item is gone, the first one takes it.
 */
watch(
  () => [...root.allItems.value.keys()],
  () => {
    if (!root.open.value) return;
    nextTick(() => {
      if (!root.highlightedElement.value?.isConnected) listbox.highlightFirstItem();
    });
  },
);

const hasValue = computed(() => {
  const value = root.modelValue.value;
  return Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null && value !== "";
});

function clear() {
  // Writing the root's model emits `update:modelValue`, the same as picking an item
  (root.modelValue as Ref<unknown>).value = root.multiple.value ? [] : undefined;
  root.inputElement.value?.focus();
}
</script>

<template>
  <ComboboxAnchor
    data-slot="combobox-anchor"
    :class="comboboxAnchor({ class: props.class })"
  >
    <UiIcon v-if="icon" :name="icon" class="size-4 shrink-0 text-theme" />

    <ComboboxInput
      data-slot="combobox-input"
      v-bind="{ ...$attrs, ...forwarded }"
      v-model="text"
      :display-value="display"
      :placeholder="placeholder ?? t('combobox.placeholder')"
      :class="comboboxInput()"
    />

    <AnimatePresence>
      <motion.div
        v-if="clearable && hasValue && !root.disabled.value"
        :initial="{ opacity: 0, scale: 0.5, rotate: -45 }"
        :animate="{ opacity: 1, scale: 1, rotate: 0 }"
        :exit="{ opacity: 0, scale: 0.5, rotate: 45 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
        class="-mr-1 flex"
      >
        <UiButton
          variant="clear"
          size="icon-sm"
          tabindex="-1"
          type="button"
          class="size-6 text-theme hover:text-destructive"
          @click="clear"
        >
          <UiIcon name="lucide:x" class="size-3.5" />
          <span class="sr-only">{{ t("combobox.clear") }}</span>
        </UiButton>
      </motion.div>
    </AnimatePresence>

    <ComboboxTrigger
      data-slot="combobox-trigger"
      class="-mr-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-lg text-theme outline-none hover:text-foreground disabled:cursor-not-allowed"
    >
      <AnimatePresence mode="wait" :initial="false">
        <motion.span
          v-if="context.loading.value"
          key="loading"
          class="flex"
          :initial="{ opacity: 0, scale: 0.5 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.5 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
        >
          <UiIcon name="lucide:loader" class="size-4 animate-spin" />
          <span class="sr-only">{{ t("combobox.loading") }}</span>
        </motion.span>
        <motion.span
          v-else
          key="chevron"
          class="flex"
          :initial="{ opacity: 0, scale: 0.5 }"
          :animate="{ opacity: 1, scale: 1, rotate: root.open.value ? 180 : 0 }"
          :exit="{ opacity: 0, scale: 0.5 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
        >
          <UiIcon name="lucide:chevron-down" class="size-4" />
          <span class="sr-only">{{ t("combobox.toggle") }}</span>
        </motion.span>
      </AnimatePresence>
    </ComboboxTrigger>
  </ComboboxAnchor>
</template>
