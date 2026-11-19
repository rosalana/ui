<script setup lang="ts">
import {
  UiBreadcrumb,
  UiBreadcrumbEllipsis,
  UiBreadcrumbItem,
  UiBreadcrumbLink,
  UiBreadcrumbList,
  UiBreadcrumbPage,
  UiBreadcrumbSeparator,
  UiDropdownMenu,
  UiDropdownMenuContent,
  UiDropdownMenuItem,
  UiDropdownMenuTrigger,
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
        <UiDropdownMenu>
          <UiDropdownMenuTrigger
            class="flex items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <UiBreadcrumbEllipsis />
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="start">
            <UiDropdownMenuItem>Tournaments</UiDropdownMenuItem>
            <UiDropdownMenuItem>Spring Cup 2026</UiDropdownMenuItem>
            <UiDropdownMenuItem>Group stage</UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <UiBreadcrumbLink href="/matches">Matches</UiBreadcrumbLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <UiBreadcrumbPage>Hawks vs Northern Lights</UiBreadcrumbPage>
      </UiBreadcrumbItem>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>
