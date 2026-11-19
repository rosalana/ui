<script setup lang="ts">
import {
  UiAccordion,
  UiAccordionContent,
  UiAccordionItem,
  UiAccordionTrigger,
} from "@rosalana/ui";
</script>

<template>
  <UiAccordion type="single" collapsible default-value="teams" class="w-full max-w-md">
    <UiAccordionItem value="teams">
      <UiAccordionTrigger>How big can a team be?</UiAccordionTrigger>
      <UiAccordionContent>
        A team has up to 12 players, including substitutes. Captains can invite
        players by link.
      </UiAccordionContent>
    </UiAccordionItem>
    <UiAccordionItem value="schedule">
      <UiAccordionTrigger>Can I change the schedule?</UiAccordionTrigger>
      <UiAccordionContent>
        Organizers can move a match until 24 hours before it starts. Both teams
        are notified automatically.
      </UiAccordionContent>
    </UiAccordionItem>
    <UiAccordionItem value="refund">
      <UiAccordionTrigger>What if I cancel my registration?</UiAccordionTrigger>
      <UiAccordionContent>
        You get the full entry fee back when you cancel a week before the
        tournament starts.
      </UiAccordionContent>
    </UiAccordionItem>
  </UiAccordion>
</template>
