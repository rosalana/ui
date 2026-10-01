<script setup lang="ts">
import type { AvatarImageProps } from "reka-ui";
import { AvatarImage, injectAvatarRootContext, useForwardProps } from "reka-ui";
import { onScopeDispose, watch } from "vue";
import { tv , type ClassValue } from "tailwind-variants";
import { injectAvatarContext, loadedSources } from "./context";

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

  avatar.src.value = props.src;
  watch(() => props.src, (src) => (avatar.src.value = src));
}

// Never fires on the server, the image only loads in the browser.
const rootContext = injectAvatarRootContext();
watch(rootContext.imageLoadingStatus, (status) => {
  if (status === "loaded" && props.src) loadedSources.add(props.src);
});
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="forwarded"
    :class="[avatarImage({ class: props.class })]"
  />
</template>
