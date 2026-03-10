<script setup lang="ts">
import type { ContextMenuSeparatorProps } from "reka-ui";
import { ContextMenuSeparator, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const contextMenuSeparator = tv({
  base: "-mx-1 my-1 h-px bg-border",
});

interface Props extends ContextMenuSeparatorProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ContextMenuSeparator
    data-slot="context-menu-separator"
    v-bind="forwarded"
    :class="[contextMenuSeparator({ class: props.class })]"
  />
</template>
