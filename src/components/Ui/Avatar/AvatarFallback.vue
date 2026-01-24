<script setup lang="ts">
import type { AvatarFallbackProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { AvatarFallback, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const avatarFallback = tv({
  base: "flex size-full items-center justify-center rounded-full bg-muted",
});

interface Props extends AvatarFallbackProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="forwarded"
    :class="[avatarFallback({ class: props.class })]"
  >
    <slot />
  </AvatarFallback>
</template>
