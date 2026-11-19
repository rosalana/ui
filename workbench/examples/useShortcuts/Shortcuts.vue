<script setup lang="ts">
import { ref } from "vue";
import { defineShortcuts, UiInput, UiTextarea, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const note = ref("");
const editing = ref(false);

defineShortcuts({
  // Works while typing too.
  meta_k: {
    usingInput: true,
    handler: () => {
      (document.getElementById("shortcut-search") as HTMLInputElement | null)?.focus();
    },
  },
  // Chain: press g, then s.
  "g-s": () => sonner.default("Opening the standings"),
  n: () => sonner.default("New match created"),
  // Only while the note field named "note" has the focus.
  meta_enter: {
    usingInput: "note",
    handler: () => {
      sonner.success("Note saved");
      editing.value = false;
    },
  },
  // Only while the note is being edited.
  escape: {
    usingInput: "note",
    whenever: [editing],
    handler: () => {
      note.value = "";
      editing.value = false;
      sonner.default("Note discarded");
    },
  },
});
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <UiInput id="shortcut-search" placeholder="Search matches (Ctrl K)" aria-label="Search matches" />
    <UiTextarea
      v-model="note"
      name="note"
      placeholder="Match note. Ctrl Enter saves, Esc discards."
      aria-label="Match note"
      @input="editing = true"
    />
    <p class="text-sm text-theme">
      Press <kbd>N</kbd> for a new match or <kbd>G</kbd> then <kbd>S</kbd> for the standings, with no field focused.
    </p>
  </div>
</template>
