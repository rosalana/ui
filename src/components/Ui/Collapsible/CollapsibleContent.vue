<script setup lang="ts">
import type { CollapsibleContentProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { CollapsibleContent, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const collapsibleContent = tv({
  base: "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
});

interface Props extends CollapsibleContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <CollapsibleContent
    data-slot="collapsible-content"
    v-bind="forwarded"
    :class="[collapsibleContent({ class: props.class })]"
  >
    <slot />
  </CollapsibleContent>
</template>
