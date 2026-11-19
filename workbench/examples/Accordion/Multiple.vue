<script setup lang="ts">
import { ref } from "vue";
import {
  UiAccordion,
  UiAccordionContent,
  UiAccordionItem,
  UiAccordionTrigger,
  UiButton,
} from "@rosalana/ui";

const open = ref<string[]>(["rules"]);
const all = ["rules", "prizes", "venue"];
</script>

<template>
  <div class="w-full max-w-md space-y-3">
    <UiAccordion v-model="open" type="multiple">
      <UiAccordionItem value="rules">
        <UiAccordionTrigger>Rules</UiAccordionTrigger>
        <UiAccordionContent>
          Best of three sets, 15 points each. The winner advances to the next round.
        </UiAccordionContent>
      </UiAccordionItem>
      <UiAccordionItem value="prizes">
        <UiAccordionTrigger>Prizes</UiAccordionTrigger>
        <UiAccordionContent>
          The top three teams take home a trophy and a share of the prize pool.
        </UiAccordionContent>
      </UiAccordionItem>
      <UiAccordionItem value="venue">
        <UiAccordionTrigger>Venue</UiAccordionTrigger>
        <UiAccordionContent>
          Riverside Sports Hall, Court 2. Doors open at 8:00 and parking is free.
        </UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>

    <UiButton
      variant="outline"
      size="sm"
      @click="open = open.length === all.length ? [] : [...all]"
    >
      {{ open.length === all.length ? "Collapse all" : "Expand all" }}
    </UiButton>
  </div>
</template>
