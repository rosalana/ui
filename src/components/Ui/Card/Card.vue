<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";

const card = tv({
  base: "group rounded-xl border relative bg-background text-foreground hover:bg-muted hover:border-primary/20",
});

interface Props extends PrimitiveProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="card"
    :as="as ?? 'div'"
    :as-child="asChild"
    :class="[card({ class: props.class })]"
  >
    <div
      class="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
    />

    <slot />
  </Primitive>
</template>
