<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { tv } from "tailwind-variants";

const breadcrumbLink = tv({
  base: "transition-colors hover:text-foreground",
});

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="breadcrumb-link"
    :as="as ?? 'a'"
    :as-child="asChild"
    :class="[breadcrumbLink({ class: props.class })]"
  >
    <slot />
  </Primitive>
</template>
