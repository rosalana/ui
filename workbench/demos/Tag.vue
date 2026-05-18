<script setup lang="ts">
import Section from "workbench/components/Section.vue";
import UiTag from "../../src/components/Ui/Tag/Tag.vue";
</script>

<template>
  <Section title="Colors" class="flex flex-wrap gap-3 items-center">
    <UiTag color="red">Red</UiTag>
    <UiTag color="blue">Blue</UiTag>
    <UiTag color="green">Green</UiTag>
    <UiTag color="yellow">Yellow</UiTag>
    <UiTag color="purple">Purple</UiTag>
    <UiTag color="cyan">Cyan</UiTag>
    <UiTag color="orange">Orange</UiTag>
    <UiTag color="gray">Gray</UiTag>
  </Section>

  <Section title="Sizes" class="flex flex-wrap gap-3 items-center">
    <UiTag size="sm">Small</UiTag>
    <UiTag size="default">Default</UiTag>
    <UiTag size="lg">Large</UiTag>
  </Section>
</template>
