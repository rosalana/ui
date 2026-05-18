<script setup lang="ts">
import Section from "workbench/components/Section.vue";
import UiBadge from "../../src/components/Ui/Badge/Badge.vue";
</script>

<template>
  <Section title="Variants" class="flex flex-wrap gap-3 items-center">
    <UiBadge variant="default">Default</UiBadge>
    <UiBadge variant="secondary">Secondary</UiBadge>
    <UiBadge variant="outline">Outline</UiBadge>
    <UiBadge variant="destructive">Destructive</UiBadge>
    <UiBadge variant="success">Success</UiBadge>
    <UiBadge variant="warning">Warning</UiBadge>
    <UiBadge variant="info">Info</UiBadge>
  </Section>

  <Section title="Sizes" class="flex flex-wrap gap-3 items-center">
    <UiBadge size="sm">Small</UiBadge>
    <UiBadge size="default">Default</UiBadge>
    <UiBadge size="lg">Large</UiBadge>
  </Section>

  <Section title="With Icons" class="flex flex-wrap gap-3 items-center">
    <UiBadge variant="success" icon="lucide:check-circle">Approved</UiBadge>
    <UiBadge variant="warning" icon="lucide:alert-triangle">Pending</UiBadge>
    <UiBadge variant="destructive" icon="lucide:x-circle">Rejected</UiBadge>
    <UiBadge variant="info" icon="lucide:info">Info</UiBadge>
  </Section>
</template>
