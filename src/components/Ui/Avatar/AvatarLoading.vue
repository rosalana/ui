<script setup lang="ts">
import { injectAvatarRootContext } from "reka-ui";
import { AnimatePresence, motion } from "motion-v";
import { computed } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";
import { injectAvatarContext } from "./context";

const avatarLoading = tv({
  base: "absolute inset-0 z-10 flex select-none items-center justify-center rounded-full bg-muted border border-border text-theme",
});

interface Props {
  /**
   * Forces the loading state, e.g. while a new image uploads.
   * Left undefined, it shows while the avatar image is loading.
   * Place it after `UiAvatarImage`, so server rendering already knows about the image.
   */
  loading?: boolean;
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  loading: undefined,
});

const rootContext = injectAvatarRootContext();
const avatar = injectAvatarContext();

/**
 * The image reports "idle" until it mounts, which is all the server ever sees,
 * so "idle" counts as loading too whenever there is an image to wait for.
 */
const visible = computed(() => {
  if (props.loading !== undefined) return props.loading;

  const status = rootContext.imageLoadingStatus.value;
  if (status === "loading") return true;
  return status === "idle" && (avatar?.images.value ?? 0) > 0;
});
</script>

<template>
  <!-- Covers the fallback, so a slow image shows loading instead of flashing the initials -->
  <AnimatePresence>
    <motion.span
      v-if="visible"
      data-slot="avatar-loading"
      :class="avatarLoading({ class: props.class })"
      :exit="{ opacity: 0 }"
      :transition="{ duration: 0.2 }"
    >
      <slot>
        <UiIcon name="lucide:loader" class="size-[0.75em] animate-spin" />
      </slot>
    </motion.span>
  </AnimatePresence>
</template>
