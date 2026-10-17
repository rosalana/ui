<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from "reka-ui";
import { useForwardPropsEmits } from "reka-ui";
import UiDialog from "../Dialog/Dialog.vue";
import UiDialogContent from "../Dialog/DialogContent.vue";
import Command from "./Command.vue";

const props = defineProps<DialogRootProps>();
const emit = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <UiDialog data-slot="command-dialog" v-bind="forwarded">
    <!-- Anchored near the top so the palette does not jump while results are filtered -->
    <UiDialogContent
      hide-close-button
      class="top-[15vh] translate-y-0 gap-0 overflow-hidden p-0"
    >
      <Command class="rounded-none border-0 shadow-none">
        <slot />
      </Command>
    </UiDialogContent>
  </UiDialog>
</template>
