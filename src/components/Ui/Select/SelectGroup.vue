<script setup lang="ts">
import type { SelectGroupProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { SelectGroup, useForwardProps } from "reka-ui";

interface Props extends SelectGroupProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <SelectGroup
    data-slot="select-group"
    v-bind="forwarded"
    class="p-1"
    :class="props.class"
  >
    <slot />
  </SelectGroup>
</template>
