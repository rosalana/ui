<template>
  <RekaCheckboxIndicator
    data-slot="checkbox-indicator"
    :class="styles({ class: props.class })"
    v-bind="forwarded"
  >
    <slot>
      <UiIcon
        :name="(state ?? modelValue) === 'indeterminate' ? indeterminateIcon : icon"
        :class="[(state ?? modelValue) === 'indeterminate' ? 'size-3' : 'size-3.5']"
      />
    </slot>
  </RekaCheckboxIndicator>
  
</template>

<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { tv } from "tailwind-variants"
import { CheckboxIndicator as RekaCheckboxIndicator } from "reka-ui"
import type { CheckboxCheckedState, CheckboxIndicatorProps as RekaCheckboxIndicatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import UiIcon from "../ui/icon/Icon.vue"

defineOptions({ name: "CheckboxIndicator" })

const props = withDefaults(defineProps<RekaCheckboxIndicatorProps & {
  modelValue?: CheckboxCheckedState
  state?: CheckboxCheckedState
  class?: HTMLAttributes["class"]
  icon?: string
  indeterminateIcon?: string
}>(), {
  icon: "lucide:check",
  indeterminateIcon: "lucide:minus",
})

const forwarded = reactiveOmit(props, "class", "icon")

const styles = tv({
  base: "group flex items-center justify-center text-current transition-none",
})

export type CheckboxIndicatorProps = typeof props
</script>


