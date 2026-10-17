<script setup lang="ts">
import type { ListboxItemEmits, ListboxItemProps } from "reka-ui";
import {
  ListboxItem,
  injectListboxRootContext,
  useForwardPropsEmits,
  useId,
} from "reka-ui";
import { computed, onMounted, onUnmounted, onUpdated, ref } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { motion } from "motion-v";
import { injectCommandContext, injectCommandGroupContext } from "./context";

const commandItem = tv({
  base: [
    "relative flex cursor-pointer select-none items-center gap-2",
    "rounded-lg px-2.5 py-2 text-sm outline-none",
    "transition-colors duration-150",
    "data-[highlighted]:text-accent-foreground",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
});

interface Props extends ListboxItemProps {
  class?: ClassValue;
  /** Extra words the search should match besides the item's text. */
  keywords?: string[];
}

const props = defineProps<Props>();
const emit = defineEmits<ListboxItemEmits>();
const forwarded = useForwardPropsEmits(props, emit);

const id = useId();
const command = injectCommandContext();
const group = injectCommandGroupContext();
const listbox = injectListboxRootContext();

const itemRef = ref<{ $el: HTMLElement } | null>(null);
const element = computed(() => itemRef.value?.$el);

const isMatch = computed(() => command.isMatch(id));
const isHighlighted = computed(
  () => !!element.value && listbox.highlightedElement.value === element.value
);

/**
 * The rendered text is the natural thing to search by, but it can only be read while the item
 * is shown, so the value and keywords are kept as a fallback.
 */
function register() {
  const text = [
    typeof props.value === "string" ? props.value : "",
    ...(props.keywords ?? []),
    element.value?.textContent ?? command.items.get(id) ?? "",
  ];

  command.items.set(id, text.join(" ").trim());
}

onMounted(() => {
  register();
  group?.items.add(id);
});

onUpdated(() => {
  if (element.value) register();
});

onUnmounted(() => {
  command.items.delete(id);
  group?.items.delete(id);
});
</script>

<template>
  <ListboxItem
    v-if="isMatch"
    ref="itemRef"
    data-slot="command-item"
    v-bind="forwarded"
    :class="[commandItem({ class: props.class })]"
    as-child
  >
    <motion.div
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.15 }"
    >
      <motion.div
        v-if="isHighlighted"
        :layout-id="command.highlightId"
        aria-hidden="true"
        class="absolute inset-0 -z-10 rounded-lg border border-border/40 bg-accent"
        :transition="{ type: 'spring', stiffness: 500, damping: 35 }"
      />
      <slot />
    </motion.div>
  </ListboxItem>
</template>
