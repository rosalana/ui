<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";
import { UiIcon } from "../../index";

const alert = tv({
  base: [
    "relative w-full flex items-start gap-3 rounded-xl border p-4.5 text-sm",
    "bg-background text-foreground border border-border",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-black/5",
    "[&>svg]:size-4.5 [&>svg]:shrink-0",
    "transition-all duration-150",
  ],
  variants: {
    variant: {
      default: "[&>svg]:text-white bg-theme hover:brightness-105 border-theme text-white [&_[data-slot=alert-description]]:text-white",
      destructive: "[&>svg]:text-white bg-destructive hover:brightness-105 text-white [&_[data-slot=alert-description]]:text-white border-destructive shadow-destructive/40",
      success: "[&>svg]:text-success hover:bg-muted",
      warning: "[&>svg]:text-warning hover:bg-muted",
      info: "[&>svg]:text-info hover:bg-muted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type AlertVariants = VariantProps<typeof alert>;

interface Props extends PrimitiveProps {
  variant?: AlertVariants["variant"];
  class?: HTMLAttributes["class"];
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
  return props.icon;
});
</script>

<template>
  <Primitive
    data-slot="alert"
    :as="props.as ?? 'div'"
    :as-child="asChild"
    role="alert"
    :class="[alert({ variant, class: props.class })]"
  >
    <UiIcon v-if="icon" :name="icon" />

    <div>
      <slot />
    </div>
  </Primitive>
</template>
