<script setup lang="ts">
import {
  UiAccordion,
  UiAccordionContent,
  UiAccordionItem,
  UiAccordionTrigger,
} from "@rosalana/ui";
</script>

<template>
  <UiAccordion type="single" collapsible class="w-full max-w-md">
    <UiAccordionItem value="basic">
      <UiAccordionTrigger>Basic plan</UiAccordionTrigger>
      <UiAccordionContent>One tournament at a time, up to 16 teams.</UiAccordionContent>
    </UiAccordionItem>
    <UiAccordionItem value="pro" disabled>
      <UiAccordionTrigger>Pro plan (coming soon)</UiAccordionTrigger>
      <UiAccordionContent>Unlimited tournaments and live brackets.</UiAccordionContent>
    </UiAccordionItem>
  </UiAccordion>
</template>
