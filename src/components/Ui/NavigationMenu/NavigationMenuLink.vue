<script setup lang="ts">
import type { NavigationMenuLinkProps } from "reka-ui";
import { NavigationMenuLink, useForwardProps } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";

const navigationMenuLink = tv({
  base: [
    "block select-none",
    "rounded-lg p-3 text-sm font-normal",
    "disabled:pointer-events-none disabled:opacity-50",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "bg-transparent transition-all duration-200 ease-out text-foreground border border-transparent",
    "hover:bg-muted hover:border-border/40",
    "leading-none no-underline",
    "active:scale-[0.97] data-[active]:text-primary",
  ],
});

interface Props extends NavigationMenuLinkProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    v-bind="forwarded"
    :class="[navigationMenuLink({ class: props.class })]"
  >
    <slot />
  </NavigationMenuLink>
</template>
