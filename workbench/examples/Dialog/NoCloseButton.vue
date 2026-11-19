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
      <UiButton variant="outline">What's new</UiButton>
    </UiDialogTrigger>
    <UiDialogContent hide-close-button>
      <UiDialogHeader>
        <UiDialogTitle>Brackets are here</UiDialogTitle>
        <UiDialogDescription>
          Tournaments now draw their bracket on their own once check-in closes.
        </UiDialogDescription>
      </UiDialogHeader>
      <UiDialogFooter>
        <UiDialogClose as-child>
          <UiButton>Nice</UiButton>
        </UiDialogClose>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
