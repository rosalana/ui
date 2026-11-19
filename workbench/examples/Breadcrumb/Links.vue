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
        <!-- Plain anchors here: the docs have no Inertia pages. The app code uses Link. -->
        <UiBreadcrumbLink as-child>
          <a href="#">Teams</a>
        </UiBreadcrumbLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <UiBreadcrumbLink as-child>
          <a href="#">Northern Lights</a>
        </UiBreadcrumbLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <UiBreadcrumbPage>Roster</UiBreadcrumbPage>
      </UiBreadcrumbItem>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>
