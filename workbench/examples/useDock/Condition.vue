<script setup lang="ts">
import { computed, ref } from "vue";
import { UiSwitch, useDock, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const teams = ref([
  { name: "Falcons", checkedIn: true },
  { name: "Wolves", checkedIn: true },
  { name: "Ravens", checkedIn: true },
  { name: "Tigers", checkedIn: false },
]);
const started = ref(false);

// Every check-in is confirmed by a toast, stacked above the dock once it shows.
function checkIn(team: { name: string; checkedIn: boolean }, checkedIn: boolean) {
  team.checkedIn = checkedIn;
  sonner.default(checkedIn ? `${team.name} checked in` : `${team.name} checked out`);
}

const ready = computed(
  () => !started.value && teams.value.every((team) => team.checkedIn),
);

// Stands in for the request; the app shows its flash message as a success toast.
function start() {
  return new Promise<void>((done) =>
    setTimeout(() => {
      started.value = true;
      sonner.success("Tournament started", { description: "Round 1 is live." });
      done();
    }, 1200),
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
      v-for="team in teams"
      :key="team.name"
      class="flex items-center justify-between px-4 py-3"
    >
      <span class="text-sm">{{ team.name }}</span>
      <UiSwitch
        :model-value="team.checkedIn"
        :disabled="started"
        :aria-label="`${team.name} checked in`"
        @update:model-value="checkIn(team, !!$event)"
      />
    </li>
  </ul>
</template>
