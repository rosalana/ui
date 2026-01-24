<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from "reka-ui";
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  useForwardPropsEmits,
} from "reka-ui";
import { tv } from "tailwind-variants";
import Command from "./Command.vue";

const dialogOverlay = tv({
  base: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
});

const dialogContent = tv({
  base: "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
});

const props = defineProps<DialogRootProps>();
const emit = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <DialogRoot data-slot="command-dialog" v-bind="forwarded">
    <DialogPortal>
      <DialogOverlay :class="dialogOverlay()" />
      <DialogContent :class="dialogContent()">
        <Command class="[&_[data-slot=command-input-wrapper]]:border-b">
          <slot />
        </Command>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
