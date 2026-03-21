<script setup lang="ts">
import { type ClassValue, tv } from "tailwind-variants";
import Icon from "../Icon/Icon.vue";

const dialogIcon = tv({
  base: "bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg",
});

interface Props {
  class?: ClassValue;
  icon?: string;
}

const props = defineProps<Props>();
</script>
<template>
  <div
    data-slot="dialog-icon"
    :class="[dialogIcon({ class: props.class })]"
  >
    <slot>
      <Icon v-if="props.icon" :name="props.icon" class="size-4" />
    </slot>
  </div>
</template>
