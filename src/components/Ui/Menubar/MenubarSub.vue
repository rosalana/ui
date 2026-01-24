<script setup lang="ts">
import type { MenubarSubEmits, MenubarSubProps } from "reka-ui";
import { MenubarSub, useForwardPropsEmits } from "reka-ui";

const props = defineProps<MenubarSubProps>();
const emit = defineEmits<MenubarSubEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <MenubarSub data-slot="menubar-sub" v-bind="forwarded">
    <slot />
  </MenubarSub>
</template>
