<script setup lang="ts">
import { computed, inject } from "vue";
import { injectComboboxRootContext } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";
import { motion } from "motion-v";
import { useLocale } from "../../../composables/useLocale";
import UiIcon from "../Icon/Icon.vue";
import { COMBOBOX_CONTEXT } from "./context";

const comboboxLoading = tv({
  base: "flex flex-col items-center gap-2 py-6 text-center text-sm text-theme",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();

const context = inject(COMBOBOX_CONTEXT)!;
const { allItems } = injectComboboxRootContext();
const { t } = useLocale();

/** Only with nothing to show yet. Older results stay listed while new ones load, the input spins meanwhile. */
const visible = computed(() => context.loading.value && allItems.value.size === 0);
</script>

<template>
  <motion.div
    v-if="visible"
    data-slot="combobox-loading"
    role="status"
    :class="comboboxLoading({ class: props.class })"
    :initial="{ opacity: 0, scale: 0.95 }"
    :animate="{ opacity: 1, scale: 1 }"
    :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
  >
    <UiIcon name="lucide:loader" class="size-5 animate-spin" />
    <slot>{{ t("combobox.loading") }}</slot>
  </motion.div>
</template>
