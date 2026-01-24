<script setup lang="ts">
import type { PinInputRootEmits, PinInputRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { PinInputRoot, useForwardPropsEmits } from "reka-ui"
import { tv } from "tailwind-variants"

const pinInput = tv({
  base: "flex items-center gap-2",
})

interface Props extends PinInputRootProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const emit = defineEmits<PinInputRootEmits>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <PinInputRoot
    data-slot="pin-input"
    v-bind="forwarded"
    :class="[pinInput(), props.class]"
  >
    <slot />
  </PinInputRoot>
</template>
