<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { AnimatePresence, motion } from "motion-v";
import { useLocale } from "../../../composables/useLocale";
import UiButton from "../Button/Button.vue";
import UiIcon from "../Icon/Icon.vue";

const props = defineProps<{ code: string }>();
const { t } = useLocale();

const copied = ref(false);
let timeout: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  await navigator.clipboard?.writeText(props.code);
  copied.value = true;
  clearTimeout(timeout);
  timeout = setTimeout(() => (copied.value = false), 2000);
}

onBeforeUnmount(() => clearTimeout(timeout));
</script>

<template>
  <UiButton
    data-slot="code-block-copy"
    variant="ghost"
    size="icon-sm"
    class="size-7 text-theme hover:text-foreground"
    :aria-label="copied ? t('codeBlock.copied') : t('codeBlock.copy')"
    @click="copy"
  >
    <AnimatePresence mode="popLayout" :initial="false">
      <motion.span
        :key="copied ? 'check' : 'copy'"
        class="inline-flex"
        :initial="{ opacity: 0, scale: 0.5 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.5 }"
        :transition="{ type: 'spring', stiffness: 500, damping: 25 }"
      >
        <UiIcon
          :name="copied ? 'lucide:check' : 'lucide:copy'"
          :class="['size-3.5', copied && 'text-success-600 dark:text-success-400']"
        />
      </motion.span>
    </AnimatePresence>
  </UiButton>
</template>
