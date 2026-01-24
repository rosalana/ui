<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { tv } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const breadcrumbEllipsis = tv({
  base: "flex size-9 items-center justify-center",
});

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="breadcrumb-ellipsis"
    :as="as ?? 'span'"
    :as-child="asChild"
    role="presentation"
    aria-hidden="true"
    :class="[breadcrumbEllipsis({ class: props.class })]"
  >
    <slot>
      <UiIcon name="lucide:more-horizontal" class="size-4" />
    </slot>
    <span class="sr-only">More</span>
  </Primitive>
</template>
