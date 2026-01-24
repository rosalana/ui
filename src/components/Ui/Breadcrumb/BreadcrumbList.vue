<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { tv } from "tailwind-variants";

const breadcrumbList = tv({
  base: "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
});

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="breadcrumb-list"
    :as="as ?? 'ol'"
    :as-child="asChild"
    :class="[breadcrumbList({ class: props.class })]"
  >
    <slot />
  </Primitive>
</template>
