<script setup lang="ts">
import type { ComboboxEmptyProps } from "reka-ui";
import { ComboboxEmpty, useForwardProps } from "reka-ui";
import { inject } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { motion } from "motion-v";
import { useLocale } from "../../../composables/useLocale";
import UiIcon from "../Icon/Icon.vue";
import { COMBOBOX_CONTEXT } from "./context";

const comboboxEmpty = tv({
  base: "flex flex-col items-center gap-2 py-6 text-center text-sm text-theme",
});

interface Props extends ComboboxEmptyProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);

const context = inject(COMBOBOX_CONTEXT)!;
const { t } = useLocale();
</script>

<template>
  <!-- Not while results load, "nothing found" would flash before them -->
  <ComboboxEmpty
    v-if="!context.loading.value"
    data-slot="combobox-empty"
    v-bind="forwarded"
    :class="comboboxEmpty({ class: props.class })"
    as-child
  >
    <motion.div
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
    >
      <UiIcon name="lucide:search-x" class="size-5" />
      <slot>{{ t("combobox.empty") }}</slot>
    </motion.div>
  </ComboboxEmpty>
</template>
