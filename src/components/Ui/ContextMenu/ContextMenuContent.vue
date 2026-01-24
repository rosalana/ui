<script setup lang="ts">
import type { ContextMenuContentProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import {
  ContextMenuContent,
  ContextMenuPortal,
  useForwardProps,
} from "reka-ui";
import { tv } from "tailwind-variants";

const contextMenuContent = tv({
  base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-background p-1 text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
});

interface Props extends ContextMenuContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      data-slot="context-menu-content"
      v-bind="forwarded"
      :class="[contextMenuContent({ class: props.class })]"
    >
      <slot />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>
