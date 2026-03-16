<script setup lang="ts">
import type { AlertDialogCancelProps } from "reka-ui";
import { AlertDialogCancel, useForwardProps } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";

const alertDialogCancel = tv({
  base: [
    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    "rounded-lg",
    "transition-all duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    "active:scale-[0.97]",

    "text-foreground border border-transparent",
    "hover:bg-muted hover:border-border/40",

    "h-10 px-5 py-2 has-[>svg]:px-4",
  ],
});

interface Props extends AlertDialogCancelProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AlertDialogCancel
    data-slot="alert-dialog-cancel"
    v-bind="forwarded"
    :class="[alertDialogCancel({ class: props.class })]"
  >
    <slot />
  </AlertDialogCancel>
</template>
