<script setup lang="ts">
import type { ContextMenuSeparatorProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { ContextMenuSeparator, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const contextMenuSeparator = tv({
  base: "-mx-1 my-1 h-px bg-border",
});

interface Props extends ContextMenuSeparatorProps {
  class?: HTMLAttributes["class"];
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
