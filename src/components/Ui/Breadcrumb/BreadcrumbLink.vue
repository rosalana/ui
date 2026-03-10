<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const breadcrumbLink = tv({
  base: "transition-colors hover:text-foreground",
});

interface Props extends PrimitiveProps {
  class?: ClassValue;
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
