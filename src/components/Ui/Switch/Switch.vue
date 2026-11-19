<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from "reka-ui";
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";
import { motion } from "motion-v";

const switchRoot = tv({
  base: [
    "peer cursor-pointer inline-flex items-center h-5 w-9 shrink-0 rounded-full border border-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-black/15",
    "hover:shadow-primary hover:border-primary/30",
    "data-[state=checked]:shadow-primary data-[state=checked]:border-primary",
    "hover:data-[state=checked]:shadow-primary",
    "transition-all duration-150",
    "active:scale-[0.90]",
  ],
});

const switchThumb = tv({
  base: [
    "pointer-events-none block size-4 rounded-full",
    "bg-background ring-0 shadow-lg",
    "flex items-center justify-center",
    "transition-all duration-150 ease-in-out",
    "data-[state=unchecked]:bg-border data-[state=checked]:text-primary data-[state=unchecked]:text-background",
    "data-[state=unchecked]:[&>div]:bg-background data-[state=checked]:[&>div]:bg-primary",
    "data-[state=checked]:[&>div]:h-2 data-[state=checked]:[&>div]:w-1",
  ],
});

interface Props extends SwitchRootProps {
  class?: ClassValue;
}

// `modelValue: undefined`, or Vue would cast a missing value to `false` and the switch
// would no longer toggle on its own.
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
});
const emit = defineEmits<SwitchRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <SwitchRoot
    v-slot="{ modelValue }"
    data-slot="switch"
    v-bind="forwarded"
    :class="[switchRoot({ class: props.class })]"
  >
    <SwitchThumb :class="switchThumb()" as-child>
      <motion.div
        :animate="
          modelValue === (props.trueValue ?? true)
            ? { transform: 'translateX(16px)' }
            : { transform: 'translateX(2px)' }
        "
        :transition="{
          duration: 0.15,
          stiffness: 500,
          damping: 25,
          type: 'spring',
        }"
      >
        <div
          class="size-1.5 shrink-0 rounded-full transition-colors duration-150 ease-in-out"
        />
      </motion.div>
    </SwitchThumb>
  </SwitchRoot>
</template>
