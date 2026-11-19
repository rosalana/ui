<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiIcon,
  UiInput,
  UiLabel,
  UiSheet,
  UiSheetClose,
  UiSheetContent,
  UiSheetDescription,
  UiSheetFooter,
  UiSheetHeader,
  UiSheetTitle,
  UiSheetTrigger,
  UiTextarea,
} from "@rosalana/ui";

const open = ref(false);
const saving = ref(false);
const name = ref("Marta Kovářová");
const bio = ref("I organize tournaments and break the bracket on purpose.");

// Simulated request: a real app would post the form and close the sheet in onSuccess.
function save() {
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    open.value = false;
  }, 800);
}
</script>

<template>
  <UiSheet v-model:open="open">
    <UiSheetTrigger as-child>
      <UiButton>
        <UiIcon name="lucide:user-pen" />
        Edit profile
      </UiButton>
    </UiSheetTrigger>
    <UiSheetContent>
      <UiSheetHeader>
        <UiSheetTitle>Edit profile</UiSheetTitle>
        <UiSheetDescription>Other organizers see this on your public page.</UiSheetDescription>
      </UiSheetHeader>
      <div class="flex-1 space-y-4">
        <div class="space-y-1.5">
          <UiLabel for="profile-name">Name</UiLabel>
          <UiInput id="profile-name" v-model="name" />
        </div>
        <div class="space-y-1.5">
          <UiLabel for="profile-bio">About</UiLabel>
          <UiTextarea id="profile-bio" v-model="bio" />
        </div>
      </div>
      <UiSheetFooter>
        <UiSheetClose as-child>
          <UiButton variant="outline">Cancel</UiButton>
        </UiSheetClose>
        <UiButton :loading="saving" @click="save">Save changes</UiButton>
      </UiSheetFooter>
    </UiSheetContent>
  </UiSheet>
</template>
