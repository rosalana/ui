<script setup lang="ts">
import {
  UiBreadcrumb,
  UiBreadcrumbItem,
  UiBreadcrumbLink,
  UiBreadcrumbList,
  UiBreadcrumbPage,
  UiBreadcrumbSeparator,
  UiIcon,
} from "@rosalana/ui";
</script>

<template>
  <UiBreadcrumb>
    <UiBreadcrumbList>
      <UiBreadcrumbItem>
        <UiBreadcrumbLink href="/" class="flex items-center gap-1.5">
          <UiIcon name="lucide:home" class="size-4" />
          Home
        </UiBreadcrumbLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator>/</UiBreadcrumbSeparator>
      <UiBreadcrumbItem>
        <UiBreadcrumbLink href="/teams">Teams</UiBreadcrumbLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator>/</UiBreadcrumbSeparator>
      <UiBreadcrumbItem>
        <UiBreadcrumbPage>Northern Lights</UiBreadcrumbPage>
      </UiBreadcrumbItem>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>
