<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { useLocale } from "../../../composables/useLocale";
import { codeBlockGroupKey } from "./context";
import { highlight } from "./highlight";
import CodeBlockCopy from "./CodeBlockCopy.vue";

const frame = tv({
  variants: {
    // Inside a UiCodeBlockGroup the group draws the frame.
    grouped: {
      false: [
        "overflow-hidden rounded-xl border bg-background text-foreground",
        "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40",
      ],
    },
  },
});

const codeArea = tv({
  base: [
    "overflow-x-auto bg-muted/30 font-mono text-[13px] leading-6",
    "[&_pre]:min-w-max [&_pre]:bg-transparent! [&_pre]:p-4 [&_pre]:outline-none",
    // Token colors of the highlighter, from the app's palette
    "[--code-foreground:var(--color-foreground)] [--code-background:transparent]",
    "[--code-token-comment:var(--color-theme)] [--code-token-punctuation:var(--color-theme)]",
    "[--code-token-keyword:var(--color-primary-600)] dark:[--code-token-keyword:var(--color-primary-400)]",
    "[--code-token-link:var(--color-primary-600)] dark:[--code-token-link:var(--color-primary-400)]",
    "[--code-token-string:var(--color-success-700)] dark:[--code-token-string:var(--color-success-400)]",
    "[--code-token-string-expression:var(--color-success-700)] dark:[--code-token-string-expression:var(--color-success-400)]",
    "[--code-token-inserted:var(--color-success-700)] dark:[--code-token-inserted:var(--color-success-400)]",
    "[--code-token-function:var(--color-info-600)] dark:[--code-token-function:var(--color-info-400)]",
    "[--code-token-constant:var(--color-warning-700)] dark:[--code-token-constant:var(--color-warning-400)]",
    "[--code-token-parameter:var(--color-foreground)]",
  ],
  variants: {
    lineNumbers: {
      true: [
        "[&_code]:[counter-reset:line]",
        "[&_.line]:before:[counter-increment:line] [&_.line]:before:content-[counter(line)]",
        "[&_.line]:before:mr-5 [&_.line]:before:inline-block [&_.line]:before:w-5",
        "[&_.line]:before:text-right [&_.line]:before:text-theme/60 [&_.line]:before:select-none",
      ],
    },
  },
});

interface Props {
  code: string;
  /** Any language Shiki knows, e.g. `vue`, `ts`, `bash`, `php`. Unknown ones stay plain. */
  language?: string;
  /** Shown in the header, and as the label inside a group. */
  filename?: string;
  lineNumbers?: boolean;
  /** Item value inside a UiCodeBlockGroup. Defaults to the filename or `code`. */
  value?: string;
  /** Label inside a UiCodeBlockGroup. Defaults to the filename or "Code". */
  label?: string;
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  language: "ts",
  lineNumbers: false,
});

const { t } = useLocale();

const group = inject(codeBlockGroupKey, null);
const itemValue = computed(() => props.value ?? props.filename ?? "code");

if (group) {
  const unregister = group.register({
    value: itemValue.value,
    label: props.label ?? props.filename ?? t("codeBlock.code"),
    code: () => props.code,
  });
  onBeforeUnmount(unregister);
}

const shown = computed(() => !group || group.current.value === itemValue.value);

// Server and first render show the plain code in the same layout, highlighting follows in the browser.
const html = ref<string | null>(null);
const lines = computed(() => props.code.replace(/\n$/, "").split("\n"));

let run = 0;
async function render() {
  const current = ++run;
  const result = await highlight(props.code.replace(/\n$/, ""), props.language);
  if (current === run) html.value = result;
}

onMounted(() => {
  render();
  watch(() => [props.code, props.language], render);
});
</script>

<template>
  <div
    v-if="shown"
    data-slot="code-block"
    :class="frame({ grouped: !!group, class: props.class })"
  >
    <div
      v-if="!group"
      data-slot="code-block-header"
      class="flex h-10 items-center justify-between gap-2 border-b pr-1.5 pl-4"
    >
      <span class="truncate font-mono text-xs text-theme">
        {{ filename ?? language }}
      </span>
      <CodeBlockCopy :code="code" />
    </div>

    <div :class="codeArea({ lineNumbers })">
      <div v-if="html" v-html="html" />
      <pre v-else><code><template v-for="(line, i) in lines" :key="i"><span class="line">{{ line }}</span>{{ i < lines.length - 1 ? "\n" : "" }}</template></code></pre>
    </div>
  </div>
</template>
