<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui";
import { tv } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";
import { AnimatePresence, motion } from "motion-v";

const checkbox = tv({
  base: [
    "peer cursor-pointer size-4.5 shrink-0 rounded-md border border-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-black/15",
    "hover:shadow-primary hover:border-primary/30",
    "data-[state=checked]:shadow-primary data-[state=indeterminate]:shadow-primary",
    "data-[state=checked]:border-primary data-[state=indeterminate]:border-primary",
    "hover:data-[state=checked]:shadow-primary hover:data-[state=indeterminate]:shadow-primary",
    "transition-all duration-150",
    "active:scale-[0.90]",
  ],
});

interface Props extends CheckboxRootProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const emit = defineEmits<CheckboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <CheckboxRoot
    data-slot="checkbox"
    v-bind="forwarded"
    :class="[checkbox({ class: props.class })]"
  >
    <AnimatePresence mode="popLayout">
      <CheckboxIndicator as-child>
        <motion.span
          v-if="props.modelValue === 'indeterminate'"
          key="indeterminate"
          :initial="{ opacity: 0, scale: 0.5, rotate: -45 }"
          :animate="{ opacity: 1, scale: 1, rotate: 0 }"
          :exit="{ opacity: 0, scale: 0.5, rotate: 45 }"
          :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
          class="flex items-center justify-center text-current"
        >
          <UiIcon name="lucide:minus" class="size-3.5" />
        </motion.span>
        <motion.span
          v-else
          key="checked"
          :initial="{ opacity: 0, scale: 0.5, rotate: -45 }"
          :animate="{ opacity: 1, scale: 1, rotate: 0 }"
          :exit="{ opacity: 0, scale: 0.5, rotate: 45 }"
          :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
          class="flex items-center justify-center text-current"
        >
          <UiIcon name="lucide:check" class="size-3.5" />
        </motion.span>
      </CheckboxIndicator>
    </AnimatePresence>
  </CheckboxRoot>
</template>
