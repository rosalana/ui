<script setup lang="ts">
import type { DropdownMenuRadioGroupEmits, DropdownMenuRadioGroupProps } from "reka-ui"
import { DropdownMenuRadioGroup, useForwardPropsEmits } from "reka-ui"

const props = defineProps<DropdownMenuRadioGroupProps>()
const emit = defineEmits<DropdownMenuRadioGroupEmits>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DropdownMenuRadioGroup data-slot="dropdown-menu-radio-group" v-bind="forwarded">
    <slot />
  </DropdownMenuRadioGroup>
</template>
