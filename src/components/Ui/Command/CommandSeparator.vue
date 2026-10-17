<script setup lang="ts">
import type { SeparatorProps } from "reka-ui";
import { Separator, useForwardProps } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";
import { injectCommandContext } from "./context";

const commandSeparator = tv({
  base: "-mx-1.5 my-1.5 h-px bg-border",
});

interface Props extends SeparatorProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);

const { search } = injectCommandContext();
</script>

<template>
  <!-- Groups are filtered on their own, so separators would only leave gaps while searching -->
  <Separator
    v-if="!search"
    data-slot="command-separator"
    v-bind="forwarded"
    :class="[commandSeparator({ class: props.class })]"
  />
</template>
