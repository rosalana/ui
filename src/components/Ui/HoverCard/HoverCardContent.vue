<script setup lang="ts">
import type { HoverCardContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { HoverCardContent, HoverCardPortal, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const hoverCardContent = tv({
  base: "z-50 w-64 rounded-md border bg-background p-4 text-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
})

interface Props extends HoverCardContentProps {
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  sideOffset: 4,
  align: "center",
})

const forwarded = useForwardProps(props)
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      data-slot="hover-card-content"
      v-bind="forwarded"
      :class="[hoverCardContent(), props.class]"
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>
