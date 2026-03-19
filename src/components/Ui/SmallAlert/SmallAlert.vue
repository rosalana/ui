<script setup lang="ts">
import { Primitive, PrimitiveProps } from "reka-ui";
import { tv, VariantProps } from "tailwind-variants";
import { computed } from "vue";
import { UiIcon } from "../..";

const smallAlert = tv({
  base: [
    "flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors duration-300",
  ],
  variants: {
    variant: {
      default: "bg-primary/10 text-primary-600 dark:text-primary-400",
      destructive:
        "bg-destructive/10 text-destructive-600 dark:text-destructive-400",
      success: "bg-success/10 text-success-600 dark:text-success-400",
      warning: "bg-warning/10 text-warning-600 dark:text-warning-400",
      info: "bg-info/10 text-info-600 dark:text-info-400",
      outline: "bg-background/10 border text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type SmallAlertVariants = VariantProps<typeof smallAlert>;

interface Props extends PrimitiveProps {
  variant?: SmallAlertVariants["variant"];
  class?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const icon = computed(() => {
  if (props.variant === "default") return props.icon ?? "lucide:star";
  if (props.variant === "destructive")
    return props.icon ?? "lucide:alert-circle";
  if (props.variant === "success") return props.icon ?? "lucide:check-circle";
  if (props.variant === "warning") return props.icon ?? "lucide:alert-triangle";
  if (props.variant === "info") return props.icon ?? "lucide:info";
  if (props.variant === "outline") return props.icon ?? "lucide:info";
  return props.icon;
});
</script>
<template>
  <Primitive
    data-slot="small-alert"
    :as="props.as ?? 'div'"
    :as-child="asChild"
    role="alert"
    :class="[smallAlert({ variant, class: props.class })]"
  >
    <UiIcon v-if="icon" :name="icon" class="size-3.5 shrink-0"/>
    <div class="flex-1">
      <slot />
    </div>
  </Primitive>
</template>
