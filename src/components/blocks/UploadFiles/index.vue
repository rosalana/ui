<script setup lang="ts">
import { computed, onBeforeUnmount, shallowReactive } from "vue";
import { AnimatePresence, motion } from "motion-v";
import { UiButton, UiIcon } from "../../index";
import UiDropFile from "../../Ui/DropFile/DropFile.vue";
import type {
  UploadFilesEmits,
  UploadFilesProps,
  UploadFilesRejection,
} from "./types";

const props = withDefaults(defineProps<UploadFilesProps>(), {
  multiple: true,
  accept: "*",
  disabled: false,
  preview: true,
});

const emit = defineEmits<UploadFilesEmits>();

const files = defineModel<File[]>({ default: () => [] });

const spring = { type: "spring", stiffness: 400, damping: 25 } as const;

const fileKey = (file: File) => `${file.name}:${file.size}:${file.lastModified}`;

const isFull = computed(
  () =>
    props.disabled ||
    (props.multiple && props.maxFiles !== undefined && files.value.length >= props.maxFiles),
);

const subtext = computed(() => {
  if (props.subtext) return props.subtext;

  const parts: string[] = [];
  if (props.accept && props.accept !== "*") parts.push(props.accept.split(",").join(", "));
  if (props.maxSize) parts.push(`up to ${formatSize(props.maxSize)}`);
  if (props.maxFiles && props.multiple) parts.push(`max ${props.maxFiles} files`);

  return parts.length ? parts.join(" · ") : "All file types accepted";
});

function add(incoming: File[]) {
  const rejections: UploadFilesRejection[] = [];
  const known = new Set(files.value.map(fileKey));
  const accepted: File[] = [];

  for (const file of incoming) {
    if (known.has(fileKey(file))) continue;

    if (props.maxSize && file.size > props.maxSize) {
      rejections.push({ file, reason: "size" });
      continue;
    }

    known.add(fileKey(file));
    accepted.push(file);
  }

  let next = props.multiple ? [...files.value, ...accepted] : accepted.slice(-1);

  if (props.multiple && props.maxFiles !== undefined && next.length > props.maxFiles) {
    next.slice(props.maxFiles).forEach((file) => rejections.push({ file, reason: "limit" }));
    next = next.slice(0, props.maxFiles);
  }

  if (!props.multiple && next.length) files.value.forEach(release);

  const added = next.filter((file) => !files.value.includes(file));

  if (rejections.length) emit("rejected", rejections);
  if (!added.length) return;

  files.value = next;
  emit("added", added);
}

function reject(rejected: File[]) {
  emit(
    "rejected",
    rejected.map((file) => ({ file, reason: "type" as const })),
  );
}

function remove(file: File) {
  release(file);
  files.value = files.value.filter((f) => f !== file);
  emit("removed", file);
}

function clear() {
  [...files.value].forEach(remove);
}

// Object URLs for image thumbnails, released as soon as the file leaves the list.
const previews = shallowReactive(new Map<File, string>());

function previewOf(file: File): string | undefined {
  if (!props.preview || !file.type.startsWith("image/")) return undefined;

  if (!previews.has(file)) previews.set(file, URL.createObjectURL(file));
  return previews.get(file);
}

function release(file: File) {
  const url = previews.get(file);
  if (!url) return;

  URL.revokeObjectURL(url);
  previews.delete(file);
}

onBeforeUnmount(() => previews.forEach((url) => URL.revokeObjectURL(url)));

function iconOf(file: File): string {
  const type = file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (type.startsWith("image/")) return "lucide:file-image";
  if (type.startsWith("video/")) return "lucide:file-video";
  if (type.startsWith("audio/")) return "lucide:file-audio";
  if (type === "application/pdf" || ext === "pdf") return "lucide:file-text";
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "lucide:file-archive";
  if (["csv", "xls", "xlsx", "ods"].includes(ext)) return "lucide:file-spreadsheet";
  if (["json", "js", "ts", "vue", "php", "html", "css", "xml"].includes(ext)) return "lucide:file-code";
  if (type.startsWith("text/")) return "lucide:file-text";
  return "lucide:file";
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unit = 0;

  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit++;
  }

  return `${size.toFixed(size < 10 ? 1 : 0)} ${units[unit]}`;
}

const totalSize = computed(() => files.value.reduce((sum, file) => sum + file.size, 0));
</script>

<template>
  <div data-slot="upload-files" class="flex w-full flex-col gap-3">
    <UiDropFile
      :title="title"
      :subtext="subtext"
      :icon="icon"
      :multiple="multiple"
      :accept="accept"
      :disabled="isFull"
      @dropped="add"
      @rejected="reject"
    />

    <AnimatePresence>
      <motion.div
        v-if="files.length"
        data-slot="upload-files-header"
        class="flex items-center justify-between px-1 text-xs"
        :initial="{ opacity: 0, y: -4 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: -4 }"
        :transition="spring"
      >
        <span class="text-theme">
          {{ files.length }} {{ files.length === 1 ? "file" : "files" }}
          · {{ formatSize(totalSize) }}
        </span>
        <UiButton
          v-if="files.length > 1 && !disabled"
          variant="ghost"
          size="xs"
          class="text-theme hover:text-destructive"
          @click="clear"
        >
          Clear all
        </UiButton>
      </motion.div>
    </AnimatePresence>

    <ul data-slot="upload-files-list" class="flex flex-col gap-2">
      <AnimatePresence :initial="false">
        <motion.li
          v-for="file in files"
          :key="fileKey(file)"
          layout
          data-slot="upload-files-item"
          class="group flex items-center gap-3 rounded-xl border border-border bg-background p-2 pr-2.5 shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40 dark:shadow-muted/20"
          :initial="{ opacity: 0, y: -8, scale: 0.97 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }"
          :transition="spring"
        >
          <div
            data-slot="upload-files-item-icon"
            class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/40 text-primary"
          >
            <img
              v-if="previewOf(file)"
              :src="previewOf(file)"
              :alt="file.name"
              class="size-full object-cover"
            />
            <UiIcon v-else :name="iconOf(file)" class="size-5" />
          </div>

          <div class="min-w-0 flex-1">
            <p
              data-slot="upload-files-item-name"
              class="truncate text-sm font-medium"
              :title="file.name"
            >
              {{ file.name }}
            </p>
            <p data-slot="upload-files-item-size" class="text-theme text-xs">
              {{ formatSize(file.size) }}
            </p>
          </div>

          <slot name="item-actions" :file="file" :remove="() => remove(file)" />

          <UiButton
            v-if="!disabled"
            variant="ghost"
            size="icon-sm"
            type="button"
            class="text-theme hover:text-destructive"
            :aria-label="`Remove ${file.name}`"
            @click="remove(file)"
          >
            <UiIcon name="lucide:x" />
          </UiButton>
        </motion.li>
      </AnimatePresence>
    </ul>
  </div>
</template>
