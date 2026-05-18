<script setup lang="ts">
import Section from "../components/Section.vue";
import UiAccordion from "../../src/components/Ui/Accordion/Accordion.vue";
import UiAccordionItem from "../../src/components/Ui/Accordion/AccordionItem.vue";
import UiAccordionTrigger from "../../src/components/Ui/Accordion/AccordionTrigger.vue";
import UiAccordionContent from "../../src/components/Ui/Accordion/AccordionContent.vue";
</script>

<template>
  <Section title="Single">
    <UiAccordion type="single" collapsible>
      <UiAccordionItem value="item-1">
        <UiAccordionTrigger>What is Rosalana UI?</UiAccordionTrigger>
        <UiAccordionContent>
          A Vue 3 component library providing consistent styling and behavior
          across SaaS applications in the Rosalana ecosystem.
        </UiAccordionContent>
      </UiAccordionItem>
      <UiAccordionItem value="item-2">
        <UiAccordionTrigger>How does theming work?</UiAccordionTrigger>
        <UiAccordionContent>
          Colors are injected as CSS custom properties at runtime. No rebuild
          needed for theme changes. All colors support light and dark mode
          variants.
        </UiAccordionContent>
      </UiAccordionItem>
      <UiAccordionItem value="item-3">
        <UiAccordionTrigger>What animation library is used?</UiAccordionTrigger>
        <UiAccordionContent>
          motion-v, the Vue port of motion.dev. Spring-based transitions for a
          natural, satisfying feel.
        </UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>
  </Section>

  <Section title="Multiple">
    <UiAccordion type="multiple">
      <UiAccordionItem value="a">
        <UiAccordionTrigger>Can multiple items be open?</UiAccordionTrigger>
        <UiAccordionContent
          >Yes, with type="multiple" all items can be open
          simultaneously.</UiAccordionContent
        >
      </UiAccordionItem>
      <UiAccordionItem value="b">
        <UiAccordionTrigger>Is it accessible?</UiAccordionTrigger>
        <UiAccordionContent
          >Built on reka-ui headless primitives, fully keyboard navigable and
          ARIA compliant.</UiAccordionContent
        >
      </UiAccordionItem>
    </UiAccordion>
  </Section>
</template>
