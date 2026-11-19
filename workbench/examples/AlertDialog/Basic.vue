<script setup lang="ts">
import { ref } from "vue";
import {
  UiAlertDialog,
  UiAlertDialogAction,
  UiAlertDialogCancel,
  UiAlertDialogContent,
  UiAlertDialogDescription,
  UiAlertDialogFooter,
  UiAlertDialogHeader,
  UiAlertDialogIcon,
  UiAlertDialogTitle,
  UiAlertDialogTrigger,
  UiButton,
} from "@rosalana/ui";

const published = ref(false);
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <UiButton :variant="published ? 'secondary' : 'default'">
        {{ published ? "Registration is open" : "Publish tournament" }}
      </UiButton>
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogIcon icon="lucide:megaphone" />
        <UiAlertDialogTitle>Publish Spring Cup?</UiAlertDialogTitle>
        <UiAlertDialogDescription>
          Teams will be able to find the tournament and register. You can still edit the
          rules until the first match starts.
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Not yet</UiAlertDialogCancel>
        <UiAlertDialogAction @click="published = true">Publish</UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
