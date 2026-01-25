<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue";
import { useForwardExpose } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";
import { UiButton, UiIcon } from "../../index";
import { AnimatePresence, motion } from "motion-v";

const input = tv({
  base: [
    "flex h-9 w-full rounded-xl border border-border bg-background text-foreground px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-theme focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40",
    "hover:shadow-muted dark:shadow-muted/20 dark:hover:shadow-muted/80",
    "transition-shadow duration-200 ease-out",
  ],
  variants: {
    variant: {
      default: "",
      error: "border-destructive focus-visible:ring-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type InputVariants = VariantProps<typeof input>;

interface Props {
  defaultValue?: string | number;
  modelValue?: string | number;
  type?: HTMLInputElement["type"];
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  autocomplete?: string;
  autofocus?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  pattern?: string;
  variant?: InputVariants["variant"];
  class?: HTMLAttributes["class"];
  showClear?: boolean;
  passwordToggle?: boolean;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  variant: "default",
  showClear: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { forwardRef } = useForwardExpose();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}

const passwordShow = ref(false);

const activeState = computed(() => {
  if (props.type === "password" && props.passwordToggle) {
    return {
      icon: passwordShow.value ? "lucide:eye-off" : "lucide:eye",
      color: "text-primary",
      clickable: true,
      action: () => {
        passwordShow.value = !passwordShow.value;
      },
    };
  }

  if (props.showClear && props.modelValue) {
    return {
      icon: "lucide:x",
      color: "text-destructive",
      clickable: true,
      action: () => {
        emit("update:modelValue", "");
      },
    };
  }

  if (props.icon) {
    return {
      icon: props.icon,
      color: "text-primary",
      clickable: false,
      action: () => {},
    };
  }

  return null;
});
</script>

<template>
  <div class="relative">
    <input
      :ref="forwardRef"
      data-slot="input"
      :type="
        type === 'password' && passwordToggle
          ? passwordShow
            ? 'text'
            : 'password'
          : type
      "
      :value="modelValue ?? defaultValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :name="name"
      :id="id"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :min="min"
      :max="max"
      :step="step"
      :pattern="pattern"
      :class="[input({ variant, class: props.class })]"
      @input="handleInput"
    />

    <div class="absolute top-0 right-0 h-full flex items-center pr-2">
      <AnimatePresence mode="popLayout">
        <motion.div
          v-if="activeState"
          :key="activeState.icon"
          :initial="{ opacity: 0, scale: 0.5, rotate: -45 }"
          :animate="{ opacity: 1, scale: 1, rotate: 0 }"
          :exit="{ opacity: 0, scale: 0.5, rotate: 45 }"
          :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
        >
          <UiButton
            variant="clear"
            size="icon-sm"
            class="size-7 p-0"
            :class="[
              activeState.color,
              !activeState.clickable && 'pointer-events-none cursor-default',
            ]"
            @click="activeState.action"
          >
            <UiIcon :name="activeState.icon" class="size-4" />
          </UiButton>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</template>
