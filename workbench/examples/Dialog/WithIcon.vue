<script setup lang="ts">
import {
  UiButton,
  UiDialog,
  UiDialogClose,
  UiDialogContent,
  UiDialogDescription,
  UiDialogFooter,
  UiDialogHeader,
  UiDialogIcon,
  UiDialogTitle,
  UiDialogTrigger,
} from "@rosalana/ui";
</script>

<template>
  <UiDialog>
    <UiDialogTrigger as-child>
      <UiButton variant="outline">Invite members</UiButton>
    </UiDialogTrigger>
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogIcon icon="lucide:user-plus" />
        <UiDialogTitle>Invite members</UiDialogTitle>
        <UiDialogDescription>
          New members get an email and can join the workspace right away.
        </UiDialogDescription>
      </UiDialogHeader>
      <UiDialogFooter>
        <UiDialogClose as-child>
          <UiButton>Got it</UiButton>
        </UiDialogClose>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
