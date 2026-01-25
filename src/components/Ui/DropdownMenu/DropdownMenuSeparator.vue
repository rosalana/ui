<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { DropdownMenuSeparator, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const dropdownMenuSeparator = tv({
  base: "-mx-1.5 my-1.5 h-px bg-border",
});

interface Props extends DropdownMenuSeparatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DropdownMenuSeparator
    data-slot="dropdown-menu-separator"
    v-bind="forwarded"
    :class="[dropdownMenuSeparator({ class: props.class })]"
  />
</template>
