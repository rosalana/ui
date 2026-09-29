<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, shallowRef, useId, watch } from "vue";
import { useResizeObserver } from "@vueuse/core";
import { AnimatePresence, motion } from "motion-v";
import { Cropper } from "vue-advanced-cropper";
import { UiButton, UiIcon, UiSlider } from "../../index";
import UiDropFile from "../../Ui/DropFile/DropFile.vue";
import {
  FILTERS,
  FILTER_NAMES,
  PRESETS,
  applyAdjustments,
  isNeutral,
  neutralAdjustments,
  toCssFilter,
} from "./filters";
import type {
  UploadImageAdjustments,
  UploadImageAspectRatio,
  UploadImageEmits,
  UploadImageFilter,
  UploadImageProps,
} from "./types";

const props = withDefaults(defineProps<UploadImageProps>(), {
  aspectRatios: (): UploadImageAspectRatio[] => [
    { label: "Free" },
    { label: "1:1", value: 1 },
    { label: "4:3", value: 4 / 3 },
    { label: "16:9", value: 16 / 9 },
    { label: "3:4", value: 3 / 4 },
  ],
  radius: "lg",
  size: 1024,
  format: "image/webp",
  quality: 0.9,
  accept: "image/*",
  rotate: true,
  flip: true,
  zoom: true,
  filters: false,
  presets: true,
  disabled: false,
  skipEditor: false,
  title: "Click to upload or drag & drop an image.",
  icon: "lucide:image-up",
});

const emit = defineEmits<UploadImageEmits>();

const model = defineModel<File | null>({ default: null });

/** Whether the crop editor is open. Bind with `v-model:editing` to adapt the surrounding UI. */
const editing = defineModel<boolean>("editing", { default: false });

const uid = useId();
const spring = { type: "spring", stiffness: 400, damping: 25 } as const;

// --- View transitions --------------------------------------------------------
// Views (drop zone, preview, editor) cross-fade in place: the leaving one is popped
// out of the layout so the next renders right away, while the wrapper eases its height.

/** Critically damped, so the height settles without overshooting into the content below. */
const heightSpring = { type: "spring", stiffness: 400, damping: 40 } as const;
const viewExit = { opacity: 0, scale: 0.98, transition: { duration: 0.15 } } as const;

const dropFile = ref<InstanceType<typeof UiDropFile> | null>(null);
const viewportHeight = ref<number | "auto">("auto");
/** Clip only while the height animates, so shadows and focus rings stay visible at rest. */
const resizing = ref(false);

useResizeObserver(() => dropFile.value?.$el as HTMLElement | undefined, ([entry]) => {
  viewportHeight.value = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
});

// --- Shape -------------------------------------------------------------------

const RADII = { none: "0px", sm: "6px", md: "10px", lg: "14px", xl: "20px", full: "50%" } as const;

const radiusCss = computed(() =>
  typeof props.radius === "number" ? `${props.radius}px` : RADII[props.radius],
);

const pickedRatio = ref<number | undefined>(props.aspectRatio ?? props.aspectRatios[0]?.value);
const ratio = computed(() => props.aspectRatio ?? pickedRatio.value);

// --- Source image ------------------------------------------------------------

/** The original picked file, kept so the crop can be edited again. */
const source = shallowRef<File | null>(null);
const sourceUrl = ref<string | null>(null);
const saving = ref(false);

function setSource(file: File | null) {
  if (sourceUrl.value) URL.revokeObjectURL(sourceUrl.value);
  source.value = file;
  sourceUrl.value = file ? URL.createObjectURL(file) : null;
}

function pick(file: File) {
  if (props.maxSize && file.size > props.maxSize) {
    emit("rejected", file, "size");
    return;
  }

  setSource(file);
  Object.assign(adjustments, neutralAdjustments());

  if (props.skipEditor) autoCrop(file);
  else editing.value = true;
}

function openDialog() {
  dropFile.value?.open();
}

// --- Result preview ----------------------------------------------------------

const resultUrl = ref<string | null>(null);
const resultRatio = ref<number | undefined>();

watch(
  model,
  (file) => {
    if (resultUrl.value) URL.revokeObjectURL(resultUrl.value);
    resultUrl.value = file ? URL.createObjectURL(file) : null;
  },
  { immediate: true },
);

const previewUrl = computed(() => resultUrl.value ?? props.src ?? null);

onBeforeUnmount(() => {
  if (resultUrl.value) URL.revokeObjectURL(resultUrl.value);
  if (sourceUrl.value) URL.revokeObjectURL(sourceUrl.value);
});

function remove() {
  model.value = null;
  setSource(null);
  resultRatio.value = undefined;
  emit("removed");
}

// --- Editor ------------------------------------------------------------------

const cropper = ref<InstanceType<typeof Cropper> | null>(null);

const stencilProps = computed(() => ({
  aspectRatio: ratio.value,
  previewClass: "rounded-(--upload-image-radius) shadow-[0_0_0_1px_rgba(255,255,255,0.7)]",
  handlersClasses: {
    default: "size-2.5! rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.35)] transition-transform duration-150",
    hover: "scale-150",
  },
  linesClasses: { default: "border-white/40!", hover: "border-white/80!" },
}));

const enabledFilters = computed<UploadImageFilter[]>(() =>
  props.filters === true ? FILTER_NAMES : props.filters || [],
);

const adjustments = reactive<UploadImageAdjustments>(neutralAdjustments());
const cssFilter = computed(() => toCssFilter(adjustments));

const activePreset = computed(() =>
  PRESETS.findIndex((preset) =>
    FILTER_NAMES.every(
      (name) => adjustments[name] === (preset.adjustments[name] ?? FILTERS[name].neutral),
    ),
  ),
);

function applyPreset(preset: (typeof PRESETS)[number]) {
  Object.assign(adjustments, neutralAdjustments(), preset.adjustments);
}

function formatAdjustment(name: UploadImageFilter): string {
  const value = adjustments[name];
  const neutral = FILTERS[name].neutral;
  const percent = Math.round((neutral === 1 ? value - 1 : value) * 100);
  return neutral === 1 && percent > 0 ? `+${percent}` : `${percent}`;
}

function cancel() {
  editing.value = false;
  if (!model.value) setSource(null);
}

/** Encodes the cropped canvas into the model file. */
async function commit(canvas: HTMLCanvasElement) {
  if (!source.value) return;

  applyAdjustments(canvas, adjustments);

  const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, props.format, props.quality),
    );
  if (!blob) return;

  const extension = props.format.split("/")[1].replace("jpeg", "jpg");
  const name = `${source.value.name.replace(/\.[^.]+$/, "")}.${extension}`;
  const file = new File([blob], name, { type: props.format });

  resultRatio.value = canvas.width / canvas.height;
  model.value = file;
  editing.value = false;
  emit("cropped", file);
}

async function save() {
  const result = cropper.value?.getResult();
  if (!result?.canvas) return;

  saving.value = true;

  try {
    await commit(result.canvas);
  } finally {
    saving.value = false;
  }
}

/**
 * Applies the default crop straight away, without opening the editor: the largest
 * centered area in the current aspect ratio, scaled down to `size`.
 */
async function autoCrop(file: File) {
  saving.value = true;

  try {
    const image = await createImageBitmap(file);
    const target = ratio.value ?? image.width / image.height;

    let width = image.width;
    let height = width / target;
    if (height > image.height) {
      height = image.height;
      width = height * target;
    }

    const scale = Math.min(1, props.size / Math.max(width, height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    canvas
      .getContext("2d")
      ?.drawImage(
        image,
        (image.width - width) / 2,
        (image.height - height) / 2,
        width,
        height,
        0,
        0,
        canvas.width,
        canvas.height,
      );
    image.close();

    await commit(canvas);
  } catch {
    setSource(null);
    emit("rejected", file, "type");
  } finally {
    saving.value = false;
  }
}

const previewRatio = computed(() => resultRatio.value ?? props.aspectRatio ?? 1);

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function edit() {
  if (source.value) editing.value = true;
}

// The editor can't open without a picked image, keep a bound `editing` honest.
watch(editing, (value) => {
  if (value && !source.value) editing.value = false;
});

defineExpose({
  /** Opens the native file picker. */
  open: openDialog,
  /** Reopens the crop editor for the last picked image. */
  edit,
  /** Closes the editor without applying the crop. */
  cancel,
  /** Applies the crop and closes the editor. */
  apply: save,
  remove,
  editing,
  saving,
});

const surface =
  "rounded-2xl bg-background shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40 dark:shadow-muted/20";
const previewCard = `${surface} border border-border`;
</script>

<template>
  <motion.div
    data-slot="upload-image"
    class="w-full min-w-0"
    :class="{ 'overflow-hidden': resizing }"
    :style="{ '--upload-image-radius': radiusCss, '--upload-image-filter': cssFilter }"
    :initial="false"
    :animate="{ height: viewportHeight }"
    :transition="heightSpring"
    @animation-start="resizing = true"
    @animation-complete="resizing = false"
  >
    <UiDropFile
      v-slot="{ isOverDropZone }"
      ref="dropFile"
      :accept="accept"
      :multiple="false"
      :disabled="disabled"
      :clickable="!editing && !previewUrl"
      :class="
        editing || previewUrl
          ? 'block cursor-default rounded-none border-0! bg-transparent! shadow-none! hover:border-transparent! hover:shadow-none! dark:hover:shadow-none! focus-visible:ring-0 focus-visible:ring-offset-0'
          : undefined
      "
      @dropped="(files: File[]) => files[0] && pick(files[0])"
      @rejected="(files: File[]) => files[0] && emit('rejected', files[0], 'type')"
    >
      <AnimatePresence mode="popLayout" :initial="false">
        <!-- Editor -->
        <motion.div
          v-if="editing && sourceUrl"
          key="editor"
          data-slot="upload-image-editor"
          :class="[surface, 'flex w-full flex-col gap-3 p-3']"
          :initial="{ opacity: 0, scale: 0.97 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="viewExit"
          :transition="spring"
          @click.stop
          @keydown.esc.prevent="cancel"
        >
          <div
            data-slot="upload-image-cropper"
            class="relative h-80 overflow-hidden rounded-xl bg-muted-950 [&_img]:[filter:var(--upload-image-filter)]"
          >
            <!-- Absolutely positioned so the cropper's pixel sizes never feed back into the layout -->
            <Cropper
              ref="cropper"
              class="absolute! inset-0"
              :src="sourceUrl"
              :stencil-props="stencilProps"
              :canvas="{ maxWidth: size, maxHeight: size }"
              image-restriction="stencil"
              background-class="bg-muted-950!"
              foreground-class="opacity-60!"
            />
          </div>

          <!-- Toolbar -->
          <div
            v-if="aspectRatio === undefined || rotate || flip || zoom"
            data-slot="upload-image-toolbar"
            class="flex flex-wrap items-center justify-between gap-2"
          >
            <div
              v-if="aspectRatio === undefined && aspectRatios.length"
              data-slot="upload-image-ratios"
              class="inline-flex rounded-xl border border-border bg-muted/40 p-0.5"
            >
              <button
                v-for="option in aspectRatios"
                :key="option.label"
                type="button"
                class="relative h-7 cursor-pointer rounded-lg px-2.5 text-xs font-medium transition-colors duration-150"
                :class="pickedRatio === option.value ? 'text-foreground' : 'text-theme hover:text-foreground'"
                @click="pickedRatio = option.value"
              >
                <motion.span
                  v-if="pickedRatio === option.value"
                  :layout-id="`upload-image-ratio-${uid}`"
                  class="absolute inset-0 rounded-lg border border-border bg-background shadow-[0_2px_6px_-2px] shadow-muted"
                  :transition="spring"
                />
                <span class="relative">{{ option.label }}</span>
              </button>
            </div>
            <span v-else />

            <div class="flex items-center gap-0.5">
              <template v-if="rotate">
                <UiButton variant="ghost" size="icon-sm" tooltip="Rotate left" @click="cropper?.rotate(-90)">
                  <UiIcon name="lucide:rotate-ccw" />
                </UiButton>
                <UiButton variant="ghost" size="icon-sm" tooltip="Rotate right" @click="cropper?.rotate(90)">
                  <UiIcon name="lucide:rotate-cw" />
                </UiButton>
              </template>
              <template v-if="flip">
                <UiButton variant="ghost" size="icon-sm" tooltip="Flip horizontally" @click="cropper?.flip(true, false)">
                  <UiIcon name="lucide:flip-horizontal-2" />
                </UiButton>
                <UiButton variant="ghost" size="icon-sm" tooltip="Flip vertically" @click="cropper?.flip(false, true)">
                  <UiIcon name="lucide:flip-vertical-2" />
                </UiButton>
              </template>
              <template v-if="zoom">
                <UiButton variant="ghost" size="icon-sm" tooltip="Zoom out" @click="cropper?.zoom(0.8)">
                  <UiIcon name="lucide:zoom-out" />
                </UiButton>
                <UiButton variant="ghost" size="icon-sm" tooltip="Zoom in" @click="cropper?.zoom(1.25)">
                  <UiIcon name="lucide:zoom-in" />
                </UiButton>
              </template>
              <UiButton variant="ghost" size="icon-sm" tooltip="Reset" @click="cropper?.reset()">
                <UiIcon name="lucide:undo-2" />
              </UiButton>
            </div>
          </div>

          <!-- Filters -->
          <div
            v-if="enabledFilters.length"
            data-slot="upload-image-filters"
            class="flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-3"
          >
            <div class="flex items-center justify-between">
              <span class="flex items-center gap-1.5 text-xs font-medium">
                <UiIcon name="lucide:wand-sparkles" class="text-primary size-3.5" />
                Adjustments
              </span>
              <AnimatePresence>
                <motion.div
                  v-if="!isNeutral(adjustments)"
                  :initial="{ opacity: 0, scale: 0.9 }"
                  :animate="{ opacity: 1, scale: 1 }"
                  :exit="{ opacity: 0, scale: 0.9 }"
                  :transition="spring"
                >
                  <UiButton
                    variant="ghost"
                    size="xs"
                    class="text-theme"
                    @click="Object.assign(adjustments, neutralAdjustments())"
                  >
                    Reset
                  </UiButton>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              v-if="presets"
              data-slot="upload-image-presets"
              class="-mx-1 flex gap-2 overflow-x-auto px-1 pt-1 pb-1"
            >
              <button
                v-for="(preset, index) in PRESETS"
                :key="preset.label"
                type="button"
                class="group flex shrink-0 cursor-pointer flex-col items-center gap-1 outline-none active:scale-[0.97] transition-transform"
                @click="applyPreset(preset)"
              >
                <span
                  class="size-12 overflow-hidden rounded-lg ring-2 ring-offset-2 ring-offset-background transition-shadow duration-150"
                  :class="activePreset === index ? 'ring-primary' : 'ring-transparent group-hover:ring-border group-focus-visible:ring-ring/40'"
                >
                  <img
                    :src="sourceUrl"
                    alt=""
                    class="size-full object-cover"
                    :style="{ filter: toCssFilter({ ...neutralAdjustments(), ...preset.adjustments }) }"
                  />
                </span>
                <span
                  class="text-[11px]"
                  :class="activePreset === index ? 'text-foreground font-medium' : 'text-theme'"
                >
                  {{ preset.label }}
                </span>
              </button>
            </div>

            <div class="grid gap-x-5 gap-y-3 sm:grid-cols-2">
              <div
                v-for="name in enabledFilters"
                :key="name"
                class="flex flex-col gap-2"
                @dblclick="adjustments[name] = FILTERS[name].neutral"
              >
                <div class="flex items-center justify-between text-xs">
                  <span class="text-theme flex items-center gap-1.5">
                    <UiIcon :name="FILTERS[name].icon" class="size-3.5" />
                    {{ FILTERS[name].label }}
                  </span>
                  <span class="tabular-nums">{{ formatAdjustment(name) }}</span>
                </div>
                <UiSlider
                  :model-value="[adjustments[name]]"
                  :min="FILTERS[name].min"
                  :max="FILTERS[name].max"
                  :step="FILTERS[name].step"
                  :aria-label="FILTERS[name].label"
                  @update:model-value="(value) => value && (adjustments[name] = value[0])"
                />
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-2">
            <UiButton variant="ghost" size="sm" :disabled="saving" @click="cancel">
              Cancel
            </UiButton>
            <UiButton size="sm" :loading="saving" @click="save">
              <UiIcon name="lucide:check" />
              Apply
            </UiButton>
          </div>
        </motion.div>

        <!-- Current image -->
        <motion.div
          v-else-if="previewUrl"
          key="preview"
          data-slot="upload-image-preview"
          :class="[previewCard, 'flex w-full items-center gap-4 p-3']"
          :initial="{ opacity: 0, scale: 0.97 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="viewExit"
          :transition="spring"
          @click.stop
        >
          <motion.button
            type="button"
            data-slot="upload-image-thumbnail"
            class="group/thumbnail relative h-20 max-w-40 shrink-0 cursor-pointer overflow-hidden rounded-(--upload-image-radius) border border-border outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed"
            :style="{ aspectRatio: previewRatio }"
            :disabled="disabled"
            :while-hover="disabled ? undefined : { scale: 1.04 }"
            :while-press="disabled ? undefined : { scale: 0.97 }"
            :transition="spring"
            aria-label="Change image"
            @click="openDialog()"
          >
            <img :src="previewUrl" alt="" class="size-full object-cover" />
            <span
              class="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity duration-200 group-hover/thumbnail:opacity-100 group-focus-visible/thumbnail:opacity-100"
            >
              <UiIcon name="lucide:image-up" class="size-5" />
            </span>
          </motion.button>

          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">
              {{ model?.name ?? "Current image" }}
            </p>
            <p class="text-theme text-xs">
              <template v-if="model">{{ formatSize(model.size) }}</template>
              <template v-else>Click the image to replace it</template>
            </p>
          </div>

          <div v-if="!disabled" class="flex items-center gap-0.5">
            <UiButton
              v-if="source"
              variant="ghost"
              size="icon-sm"
              tooltip="Edit crop"
              @click="edit"
            >
              <UiIcon name="lucide:crop" />
            </UiButton>
            <UiButton variant="ghost" size="icon-sm" tooltip="Replace" @click="openDialog()">
              <UiIcon name="lucide:refresh-cw" />
            </UiButton>
            <UiButton
              variant="ghost"
              size="icon-sm"
              tooltip="Remove"
              class="hover:text-destructive"
              @click="remove"
            >
              <UiIcon name="lucide:trash-2" />
            </UiButton>
          </div>
        </motion.div>

        <!-- Empty -->
        <motion.div
          v-else
          key="drop"
          :initial="{ opacity: 0, scale: 0.97 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="viewExit"
          :transition="spring"
        >
          <div class="flex flex-col items-center px-6 py-10 text-center">
            <motion.div
              v-if="icon"
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
              <UiIcon :name="icon" class="size-6" />
            </motion.div>
            <p v-if="title" class="mt-4 text-sm font-medium" v-html="title" />
            <p
              class="text-theme mt-1 text-xs"
              v-html="
                subtext ??
                (maxSize ? `Images up to ${formatSize(maxSize)}` : 'PNG, JPG, WEBP or GIF')
              "
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          v-if="isOverDropZone && !disabled && (editing || previewUrl)"
          data-slot="upload-image-drop-overlay"
          class="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-1.5 rounded-2xl text-sm font-medium"
          :class="
            editing
              ? 'bg-linear-to-b from-background/70 via-background/70 via-75% to-transparent'
              : 'border border-dashed border-primary bg-background/90'
          "
          :initial="{ opacity: 0, scale: 0.98 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }"
          :transition="spring"
        >
          <UiIcon name="lucide:image-up" class="text-primary size-5" />
          Drop to replace
        </motion.div>
      </AnimatePresence>
    </UiDropFile>
  </motion.div>
</template>
