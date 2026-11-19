<script setup lang="ts">
import {
  UiButton,
  UiDialog,
  UiDialogClose,
  UiDialogContent,
  UiDialogDescription,
  UiDialogFooter,
  UiDialogHeader,
  UiDialogTitle,
  UiDialogTrigger,
} from "@rosalana/ui";
</script>

<template>
  <UiDialog>
    <UiDialogTrigger as-child>
      <UiButton variant="outline">Share project</UiButton>
    </UiDialogTrigger>
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Share project</UiDialogTitle>
        <UiDialogDescription>
          Everyone with the link can view the project, but only members can edit it.
        </UiDialogDescription>
      </UiDialogHeader>
      <UiDialogFooter>
        <UiDialogClose as-child>
          <UiButton variant="outline">Cancel</UiButton>
        </UiDialogClose>
        <UiDialogClose as-child>
          <UiButton>Copy link</UiButton>
        </UiDialogClose>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
