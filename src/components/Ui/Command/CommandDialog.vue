<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from "reka-ui";
import {
  DialogDescription,
  DialogTitle,
  VisuallyHidden,
  useForwardPropsEmits,
} from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
import { type ClassValue } from "tailwind-variants";
import UiDialog from "../Dialog/Dialog.vue";
import UiDialogContent from "../Dialog/DialogContent.vue";
import Command from "./Command.vue";

interface Props extends DialogRootProps {
  class?: ClassValue;
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Command Palette",
  description: "Search for a command to run.",
});
const emit = defineEmits<DialogRootEmits>();

const delegated = reactiveOmit(props, "class", "title", "description");
const forwarded = useForwardPropsEmits(delegated, emit);
</script>

<template>
  <UiDialog data-slot="command-dialog" v-bind="forwarded">
    <!-- Anchored near the top so the palette does not jump while results are filtered -->
    <UiDialogContent
      hide-close-button
      :class="[
        'top-[15vh] translate-y-0 gap-0 overflow-hidden p-0',
        props.class,
      ]"
    >
      <VisuallyHidden>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>{{ description }}</DialogDescription>
      </VisuallyHidden>
      <Command class="rounded-none border-0 shadow-none">
        <slot />
      </Command>
    </UiDialogContent>
  </UiDialog>
</template>
