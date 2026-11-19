<script setup lang="ts">
import {
  UiBreadcrumb,
  UiBreadcrumbItem,
  UiBreadcrumbLink,
  UiBreadcrumbList,
  UiBreadcrumbPage,
  UiBreadcrumbSeparator,
} from "@rosalana/ui";
</script>

<template>
  <UiBreadcrumb>
    <UiBreadcrumbList>
      <UiBreadcrumbItem>
        <UiBreadcrumbLink href="/">Home</UiBreadcrumbLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <UiBreadcrumbLink href="/tournaments">Tournaments</UiBreadcrumbLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <UiBreadcrumbPage>Spring Cup 2026</UiBreadcrumbPage>
      </UiBreadcrumbItem>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>
