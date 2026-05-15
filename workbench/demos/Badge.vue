<script setup lang="ts">
import UiBadge from "../../src/components/Ui/Badge/Badge.vue";
</script>

<template>
  <div class="space-y-10">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Variants</h2>
      <div class="flex flex-wrap gap-3 items-center">
        <UiBadge variant="default">Default</UiBadge>
        <UiBadge variant="secondary">Secondary</UiBadge>
        <UiBadge variant="outline">Outline</UiBadge>
        <UiBadge variant="destructive">Destructive</UiBadge>
        <UiBadge variant="success">Success</UiBadge>
        <UiBadge variant="warning">Warning</UiBadge>
        <UiBadge variant="info">Info</UiBadge>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Sizes</h2>
      <div class="flex flex-wrap gap-3 items-center">
        <UiBadge size="sm">Small</UiBadge>
        <UiBadge size="default">Default</UiBadge>
        <UiBadge size="lg">Large</UiBadge>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">With Icons</h2>
      <div class="flex flex-wrap gap-3 items-center">
        <UiBadge variant="success" icon="lucide:check-circle">Approved</UiBadge>
        <UiBadge variant="warning" icon="lucide:alert-triangle">Pending</UiBadge>
        <UiBadge variant="destructive" icon="lucide:x-circle">Rejected</UiBadge>
        <UiBadge variant="info" icon="lucide:info">Info</UiBadge>
      </div>
    </section>
  </div>
</template>
