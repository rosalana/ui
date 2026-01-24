<script setup lang="ts">
import type { AvatarImageProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { AvatarImage, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const avatarImage = tv({
  base: "aspect-square size-full",
});

interface Props extends AvatarImageProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="forwarded"
    :class="[avatarImage({ class: props.class })]"
  />
</template>
