<script setup lang="ts">
import type { AvatarRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { AvatarRoot, useForwardProps } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";

const avatar = tv({
  base: "relative flex shrink-0 overflow-hidden rounded-full",
  variants: {
    size: {
      default: "size-10",
      sm: "size-8",
      lg: "size-12",
      xl: "size-16",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type AvatarVariants = VariantProps<typeof avatar>;

interface Props extends AvatarRootProps {
  size?: AvatarVariants["size"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    v-bind="forwarded"
    :class="[avatar({ size, class: props.class })]"
  >
    <slot />
  </AvatarRoot>
</template>
