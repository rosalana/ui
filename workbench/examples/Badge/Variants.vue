<script setup lang="ts">
import { UiBadge } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-2">
    <UiBadge>Open</UiBadge>
    <UiBadge variant="secondary">Draft</UiBadge>
    <UiBadge variant="success">Confirmed</UiBadge>
    <UiBadge variant="info">Scheduled</UiBadge>
    <UiBadge variant="warning">Pending</UiBadge>
    <UiBadge variant="destructive">Cancelled</UiBadge>
    <UiBadge variant="outline">Archived</UiBadge>
  </div>
</template>
