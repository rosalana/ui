<script setup lang="ts">
import { useDropZone, useFileDialog } from "@vueuse/core";
import { motion } from "motion-v";
import { tv, type ClassValue } from "tailwind-variants";
import { toRef, useTemplateRef } from "vue";
import Icon from "../Icon/Icon.vue";

/** Matches dropped files against an `accept` attribute value. */
function isAccepted(file: File, accept: string): boolean {
  const rules = accept
    .split(",")
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean);

  if (!rules.length || rules.includes("*") || rules.includes("*/*")) return true;

  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  return rules.some((rule) => {
    if (rule.startsWith(".")) return name.endsWith(rule);
    if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1));
    return type === rule;
  });
}

const dropFile = tv({
  base: [
    "group relative flex w-full cursor-pointer items-center justify-center",
    "rounded-2xl border border-dashed border-border bg-background text-foreground",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40 dark:shadow-muted/20",
    "transition-[border-color,background-color,box-shadow] duration-200 ease-out",
    "hover:border-primary/60 hover:shadow-muted dark:hover:shadow-muted/60",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ],
  variants: {
    isOverDropZone: {
      true: "border-primary bg-primary/5 shadow-primary/30 hover:shadow-primary/40 dark:shadow-primary/20",
    },
    disabled: {
      true: "pointer-events-none cursor-not-allowed opacity-50",
    },
    clickable: {
      true: "",
      false: "cursor-default",
    },
  },
  compoundVariants: [
    {
      isOverDropZone: false,
      clickable: false,
      class: "hover:border-border hover:shadow-muted/40 dark:hover:shadow-muted/20",
    },
  ],
});

const props = withDefaults(
  defineProps<{
    title?: string;
    subtext?: string;
    icon?: string;
    onDrop?: Function;
    multiple?: boolean;
    accept?: string;
    disabled?: boolean;
    clickable?: boolean;
    class?: ClassValue;
  }>(),
  {
    title: "Click to upload or drag & drop files.",
    subtext: "All file types accepted",
    icon: "lucide:cloud-upload",
    multiple: true,
    accept: "*",
    disabled: false,
    clickable: true,
  },
);

const emits = defineEmits<{
  dropped: [files: File[]];
  rejected: [files: File[]];
}>();

function handleDrop(files: File[] | null) {
  if (!files?.length || props.disabled) return;

  const accepted = files.filter((file) => isAccepted(file, props.accept));
  const rejected = files.filter((file) => !isAccepted(file, props.accept));

  if (rejected.length) emits("rejected", rejected);
  if (!accepted.length) return;

  if (props.onDrop) props.onDrop(accepted);
  emits("dropped", accepted);
}

const { open, reset, onChange } = useFileDialog({
  multiple: toRef(props, "multiple"),
  accept: toRef(props, "accept"),
});

onChange((files: FileList | null) => {
  if (!files?.length) return;
  handleDrop(Array.from(files));
  reset();
});

function openDialog() {
  if (props.disabled) return;
  open();
}

function openDialogFromRoot() {
  if (!props.clickable) return;
  openDialog();
}

const dropZoneRef = useTemplateRef("dropZoneRef");

const dropZoneEl = () => dropZoneRef.value?.$el as HTMLElement | undefined;

const { isOverDropZone } = useDropZone(dropZoneEl, {
  onDrop: handleDrop,
  multiple: props.multiple,
});

const spring = { type: "spring", stiffness: 400, damping: 25 } as const;

defineExpose({ dropZoneRef, open: openDialog });
</script>

<template>
  <motion.div
    ref="dropZoneRef"
    data-slot="dropfile"
    :role="clickable ? 'button' : undefined"
    :tabindex="disabled || !clickable ? -1 : 0"
    :aria-disabled="disabled || undefined"
    :data-over="isOverDropZone || undefined"
    :class="dropFile({ isOverDropZone, disabled, clickable, class: props.class })"
    :animate="{ scale: isOverDropZone ? 1.015 : 1 }"
    :while-press="disabled || !clickable ? undefined : { scale: 0.99 }"
    :transition="spring"
    @click="openDialogFromRoot"
    @keydown.enter.prevent="openDialogFromRoot"
    @keydown.space.prevent="openDialogFromRoot"
  >
    <slot :is-over-drop-zone="isOverDropZone" :open="openDialog">
      <slot name="message" :is-over-drop-zone="isOverDropZone">
        <div
          data-slot="dropfile-message"
          class="flex flex-col items-center px-6 py-10 text-center"
        >
          <slot name="icon" :is-over-drop-zone="isOverDropZone">
            <motion.div
              v-if="icon"
              data-slot="dropfile-icon-wrapper"
              class="inline-flex items-center justify-center rounded-xl border p-2.5 transition-colors duration-200"
              :class="
                isOverDropZone
                  ? 'border-primary bg-primary text-primary-foreground shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-primary/40'
                  : 'border-border bg-background text-theme shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40 group-hover:text-primary dark:shadow-muted/20'
              "
              :animate="
                isOverDropZone
                  ? { y: -6, scale: 1.1, rotate: -4 }
                  : { y: 0, scale: 1, rotate: 0 }
              "
              :transition="spring"
            >
              <Icon data-slot="dropfile-icon" :name="icon" class="size-6" />
            </motion.div>
          </slot>
          <slot name="title" :is-over-drop-zone="isOverDropZone">
            <p
              v-if="title"
              data-slot="dropfile-title"
              class="mt-4 text-sm font-medium"
              v-html="title"
            />
          </slot>
          <slot name="subtext" :is-over-drop-zone="isOverDropZone">
            <p
              v-if="subtext"
              data-slot="dropfile-subtext"
              class="text-theme mt-1 text-xs"
              v-html="subtext"
            />
          </slot>
        </div>
      </slot>
    </slot>
  </motion.div>
</template>
