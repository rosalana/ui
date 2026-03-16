<script setup lang="ts">
import type { AlertDialogActionProps } from "reka-ui";
import { AlertDialogAction, useForwardProps } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";

const alertDialogAction = tv({
  base: [
    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    "rounded-lg",
    "transition-all duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    "active:scale-[0.97]",

    "bg-destructive text-white",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-destructive/40",
    "hover:shadow-destructive",
    "hover:brightness-105",
    "focus-visible:ring-destructive/30",

    "h-10 px-5 py-2 has-[>svg]:px-4",
  ],
});

interface Props extends AlertDialogActionProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AlertDialogAction
    data-slot="alert-dialog-action"
    v-bind="forwarded"
    :class="[alertDialogAction({ class: props.class })]"
  >
    <slot />
  </AlertDialogAction>
</template>
