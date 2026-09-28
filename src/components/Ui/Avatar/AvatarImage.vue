<script setup lang="ts">
import type { AvatarImageProps } from "reka-ui";
import { AvatarImage, useForwardProps } from "reka-ui";
import { onScopeDispose } from "vue";
import { tv , type ClassValue } from "tailwind-variants";
import { injectAvatarContext } from "./context";

const avatarImage = tv({
  base: "aspect-square size-full",
});

interface Props extends AvatarImageProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);

// Registered during setup, so it is known on the server too, where the image never loads.
const avatar = injectAvatarContext();
if (avatar) {
  avatar.images.value++;
  onScopeDispose(() => avatar.images.value--);
}
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="forwarded"
    :class="[avatarImage({ class: props.class })]"
  />
</template>
