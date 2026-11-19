<script setup lang="ts">
import { UiTabs, UiTabsContent, UiTabsList, UiTabsTrigger } from "@rosalana/ui";
</script>

<template>
  <UiTabs default-value="overview" class="w-full max-w-md">
    <UiTabsList aria-label="Team sections">
      <UiTabsTrigger value="overview">Overview</UiTabsTrigger>
      <UiTabsTrigger value="members">Members</UiTabsTrigger>
      <UiTabsTrigger value="matches">Matches</UiTabsTrigger>
    </UiTabsList>
    <UiTabsContent value="overview" class="text-sm">
      Northern Lights have played 24 matches this season and lead their league by three points.
    </UiTabsContent>
    <UiTabsContent value="members" class="text-sm">
      12 players and 2 coaches. Anna Nováková captains the team.
    </UiTabsContent>
    <UiTabsContent value="matches" class="text-sm">
      Next match: Saturday at 18:00 against Harbor Hawks.
    </UiTabsContent>
  </UiTabs>
</template>
