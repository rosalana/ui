<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
import {
  UiBreadcrumb,
  UiBreadcrumbItem,
  UiBreadcrumbLink,
  UiBreadcrumbList,
  UiBreadcrumbPage,
  UiBreadcrumbSeparator,
} from "@rosalana/ui";

defineProps<{
  team: { id: number; name: string };
}>();
</script>

<template>
  <UiBreadcrumb>
    <UiBreadcrumbList>
      <UiBreadcrumbItem>
        <UiBreadcrumbLink as-child>
          <Link href="/teams">Teams</Link>
        </UiBreadcrumbLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <UiBreadcrumbLink as-child>
          <Link :href="`/teams/${team.id}`">{{ team.name }}</Link>
        </UiBreadcrumbLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <UiBreadcrumbPage>Roster</UiBreadcrumbPage>
      </UiBreadcrumbItem>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>
