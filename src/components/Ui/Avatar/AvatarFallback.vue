<script setup lang="ts">
import type { AvatarFallbackProps } from "reka-ui";
import { AvatarFallback, useForwardProps } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";
import { initials } from "../../../helpers";

const avatarFallback = tv({
  base: "flex select-none size-full items-center justify-center rounded-full bg-muted border border-border",
});

interface Props extends AvatarFallbackProps {
  class?: ClassValue;
  name?: string;
  modifier?: (name: string) => string;
}

const props = withDefaults(defineProps<Props>(), {
  modifier: (name: string) => initials(name)
});
const forwarded = useForwardProps(props);
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="forwarded"
    :class="[avatarFallback({ class: props.class })]"
  >
    <slot>
      {{ props.name ? props.modifier!(props.name) : "?" }}
    </slot>
  </AvatarFallback>
</template>
