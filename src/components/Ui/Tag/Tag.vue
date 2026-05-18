<script setup lang="ts">
import { computed } from "vue";
import { TailwindColorName } from "../../../plugin";
import Badge, { BadgeVariants } from "../Badge/Badge.vue";
import tailwindColors from "tailwindcss/colors";

interface Props {
  size?: BadgeVariants["size"];
  color?: TailwindColorName;
  icon?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
  color: "blue",
  icon: "",
});

const style = computed(() => {
  const color = tailwindColors[props.color];
  return {
    "--tag-border": color[200],
    "--tag-bg": color[50],
    "--tag-bg-hover": color[100],
    "--tag-text": color[500],
    "--tag-bg-dark": color[950],
    "--tag-bg-dark-hover": color[900],
    "--tag-border-dark": color[700],
  };
});
</script>
<template>
  <Badge
    variant="outline"
    data-slot="tag"
    :size="props.size"
    :icon="props.icon"
    :style="style"
    :class="[
      props.class,
      'border-(--tag-border) bg-(--tag-bg) text-(--tag-text)',
      'hover:bg-(--tag-bg-hover)',
      'dark:bg-(--tag-bg-dark) dark:hover:bg-(--tag-bg-dark-hover) dark:border-(--tag-border-dark)',
    ]"
  >
    <slot />
  </Badge>
</template>
