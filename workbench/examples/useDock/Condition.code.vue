<script setup lang="ts">
import { computed } from "vue";
import { router } from "@inertiajs/vue3";
import { UiSwitch, useDock } from "@rosalana/ui";

const props = defineProps<{
  tournament: {
    id: number;
    started: boolean;
    teams: { id: number; name: string; checkedIn: boolean }[];
  };
}>();

const ready = computed(
  () =>
    !props.tournament.started &&
    props.tournament.teams.every((team) => team.checkedIn),
);

// The flash message of the response confirms the check-in as a toast, above the dock.
function checkIn(teamId: number, checkedIn: boolean) {
  router.put(
    `/tournaments/${props.tournament.id}/teams/${teamId}/check-in`,
    { checked_in: checkedIn },
    { preserveScroll: true },
  );
}

// Once started, the page props change and the dock's condition stops holding.
// The flash message of the response replaces the dock as a toast.
function start() {
  return new Promise((done) =>
    router.post(`/tournaments/${props.tournament.id}/start`, {}, { onFinish: done }),
  );
}

useDock(ready, {
  title: "All teams checked in",
  description: "The tournament is waiting for you to start it.",
  icon: "lucide:trophy",
  actions: [
    { label: "Start tournament", icon: "lucide:play", variant: "default", onClick: start },
  ],
});
</script>

<template>
  <ul class="w-full max-w-sm divide-y divide-border rounded-xl border">
    <li
      v-for="team in props.tournament.teams"
      :key="team.id"
      class="flex items-center justify-between px-4 py-3"
    >
      <span class="text-sm">{{ team.name }}</span>
      <UiSwitch
        :model-value="team.checkedIn"
        :disabled="props.tournament.started"
        :aria-label="`${team.name} checked in`"
        @update:model-value="checkIn(team.id, !!$event)"
      />
    </li>
  </ul>
</template>
