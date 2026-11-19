<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { useVModel } from "@vueuse/core";
import UiToggleGroup from "../ToggleGroup/ToggleGroup.vue";
import UiToggleGroupItem from "../ToggleGroup/ToggleGroupItem.vue";
import { codeBlockGroupKey, type CodeBlockGroupItem } from "./context";
import CodeBlockCopy from "./CodeBlockCopy.vue";

const frame = tv({
  base: [
    "overflow-hidden rounded-xl border bg-background text-foreground",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40",
  ],
});

interface Props {
  /** Value of the shown item, e.g. `preview` or a filename. */
  modelValue?: string;
  /** Item shown first when uncontrolled. Defaults to the first item. */
  defaultValue?: string;
  class?: ClassValue;
}

const props = defineProps<Props>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const active = useVModel(props, "modelValue", emit, {
  passive: true,
  defaultValue: props.defaultValue,
});

const registered = ref<CodeBlockGroupItem[]>([]);
const items = computed(() => registered.value);

function register(item: CodeBlockGroupItem) {
  registered.value.push(item);
  return () => {
    registered.value = registered.value.filter((i) => i !== item);
  };
}

// Without a valid choice the first item is shown, the same on the server and in the browser.
const current = computed(() =>
  items.value.some((i) => i.value === active.value)
    ? active.value
    : items.value[0]?.value,
);

provide(codeBlockGroupKey, { current, items, register });

const activeCode = computed(() =>
  items.value.find((i) => i.value === current.value)?.code?.(),
);
</script>

<template>
  <div data-slot="code-block-group" :class="frame({ class: props.class })">
    <div
      data-slot="code-block-header"
      class="flex h-11 items-center justify-between gap-2 border-b px-1.5"
    >
      <!-- One item is always shown, so clicking the active one keeps it. -->
      <UiToggleGroup
        type="single"
        size="xs"
        variant="ghost"
        :model-value="current"
        @update:model-value="(value) => value && (active = value as string)"
      >
        <UiToggleGroupItem
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          class="px-2.5"
        >
          {{ item.label }}
        </UiToggleGroupItem>
      </UiToggleGroup>

      <CodeBlockCopy v-if="activeCode !== undefined" :code="activeCode" />
    </div>

    <slot />
  </div>
</template>
