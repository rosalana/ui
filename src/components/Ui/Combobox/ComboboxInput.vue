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
import { computed, inject, nextTick, watch, type Ref } from "vue";
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

interface Props extends ComboboxInputProps {
  class?: ClassValue;
  placeholder?: string;
  /** An Iconify icon in front of the text, like `lucide:search`. */
  icon?: string;
  /** A button that clears the picked value. */
  clearable?: boolean;
}

const props = defineProps<Props>();

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

/**
 * What the input shows for the picked value: the app's `displayValue`, else the label of the
 * picked item. A value whose item hasn't been shown yet falls back to the value itself.
 */
function display(value: AcceptableValue) {
  if (props.displayValue) return props.displayValue(value);
  if (value === undefined || value === null || Array.isArray(value)) return "";
  return context.labelOf(value) ?? (typeof value === "object" ? "" : String(value));
}

// Only while open: closing clears reka-ui's search, which must neither show every item during
// the exit animation nor send a request. Filtering hides items without reka-ui noticing, so the
// first one left gets highlighted here.
watch([root.filterSearch, root.open], ([search, open]) => {
  if (!open) return;
  context.search.value = search;
  context.setSearch(search);
  nextTick(() => listbox.highlightFirstItem());
});

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
