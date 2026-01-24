<script setup lang="ts">
import type { MenubarCheckboxItemEmits, MenubarCheckboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { MenubarCheckboxItem, MenubarItemIndicator, useForwardPropsEmits } from "reka-ui"
import { tv } from "tailwind-variants"
import UiIcon from "../Icon/Icon.vue"

const menubarCheckboxItem = tv({
  base: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
})

interface Props extends MenubarCheckboxItemProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const emit = defineEmits<MenubarCheckboxItemEmits>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <MenubarCheckboxItem
    data-slot="menubar-checkbox-item"
    v-bind="forwarded"
    :class="[menubarCheckboxItem(), props.class]"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <MenubarItemIndicator>
        <UiIcon name="lucide:check" class="size-4" />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarCheckboxItem>
</template>
