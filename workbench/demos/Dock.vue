<script setup lang="ts">
import { computed, defineComponent, h, ref } from "vue";
import { useDock } from "../../src/composables/useDock";
import { useSonner } from "../../src/composables/useSonner";
import type { SonnerPosition } from "../../src/composables/useSonner";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiCheckbox from "../../src/components/Ui/Checkbox/Checkbox.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import UiSwitch from "../../src/components/Ui/Switch/Switch.vue";
import Section from "../components/Section.vue";

const sonner = useSonner();

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Selection -------------------------------------------------------------

const matches = ref([
  { id: 1, name: "Falcons vs. Wolves", time: "18:00" },
  { id: 2, name: "Ravens vs. Tigers", time: "18:45" },
  { id: 3, name: "Sharks vs. Bears", time: "19:30" },
  { id: 4, name: "Eagles vs. Foxes", time: "20:15" },
  { id: 5, name: "Lions vs. Hawks", time: "21:00" },
]);
const selected = ref<number[]>([]);

function toggle(id: number, value: boolean | "indeterminate") {
  selected.value = value
    ? [...selected.value, id]
    : selected.value.filter((i) => i !== id);
}

useDock(
  () => selected.value.length > 0,
  () => ({
    title: `${selected.value.length} ${selected.value.length === 1 ? "match" : "matches"} selected`,
    actions: [
      {
        label: "Clear",
        variant: "ghost",
        onClick: () => (selected.value = []),
      },
      {
        label: "Delete",
        icon: "lucide:trash-2",
        variant: "destructive",
        onClick: async () => {
          await wait(1000);
          const count = selected.value.length;
          matches.value = matches.value.filter(
            (m) => !selected.value.includes(m.id),
          );
          selected.value = [];
          // Like an Inertia flash: a plain success toast, the dock turns into it.
          sonner.success(`${count} deleted`, {
            description: "The matches were removed from the schedule.",
          });
        },
      },
    ],
  }),
);

// --- Tournament ------------------------------------------------------------

const teams = ref([
  { name: "Falcons", checkedIn: true },
  { name: "Wolves", checkedIn: true },
  { name: "Ravens", checkedIn: false },
  { name: "Tigers", checkedIn: false },
]);
const started = ref(false);
const announce = ref(true);

const ready = computed(
  () => !started.value && teams.value.every((t) => t.checkedIn),
);

useDock(ready, {
  title: "All teams checked in",
  description: "The tournament is waiting for you to start it.",
  icon: "lucide:trophy",
  actions: [
    {
      label: "Start tournament",
      icon: "lucide:play",
      variant: "default",
      onClick: async () => {
        await wait(1500);
        started.value = true;
        // Like an Inertia flash, the dock turns into it.
        if (announce.value) {
          sonner.success("Tournament started", {
            description: "Round 1 is live.",
          });
        }
      },
    },
  ],
});

function resetTournament() {
  started.value = false;
  teams.value.forEach((t, i) => (t.checkedIn = i < 2));
}

// --- Unmount ---------------------------------------------------------------

const DraftPage = defineComponent({
  setup() {
    useDock(() => true, {
      title: "Unsaved draft",
      description: "This page has changes that are not published yet.",
      icon: "lucide:file-pen",
      actions: [{ label: "Publish", variant: "default", onClick: () => wait(800) }],
    });
    return () =>
      h(
        "p",
        { class: "text-sm text-theme" },
        "The page is mounted and its dock is open. Leave it to close the dock.",
      );
  },
});
const pageOpen = ref(false);

// --- Toasts ----------------------------------------------------------------

function burst() {
  ["Saved", "Synced", "Uploaded", "Invited", "Copied"].forEach((title, i) =>
    setTimeout(() => sonner.default(title), i * 150),
  );
}

const positions: SonnerPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];
</script>

<template>
  <!-- Keeps the content clear of the dock. -->
  <div
    class="flex flex-col gap-10 transition-[padding] duration-300"
    style="padding-bottom: var(--dock-height, 0px)"
  >
    <Section title="Selection" class="max-w-md">
      <p class="mb-4 text-sm text-theme">
        Select matches to get bulk actions. Delete pushes a plain success toast
        the way a flash message would, and the dock turns into it.
      </p>
      <ul class="divide-y divide-border rounded-2xl ring-1 ring-border">
        <li
          v-for="match in matches"
          :key="match.id"
          class="flex items-center gap-3 px-4 py-3"
        >
          <UiCheckbox
            :id="`match-${match.id}`"
            :model-value="selected.includes(match.id)"
            @update:model-value="toggle(match.id, $event)"
          />
          <UiLabel :for="`match-${match.id}`" class="flex-1">
            {{ match.name }}
          </UiLabel>
          <span class="text-xs text-theme">{{ match.time }}</span>
        </li>
        <li v-if="!matches.length" class="px-4 py-3 text-sm text-theme">
          No matches left.
        </li>
      </ul>
    </Section>

    <Section title="Condition" class="max-w-md">
      <p class="mb-4 text-sm text-theme">
        Check in all teams. The dock stays until the tournament starts, then
        turns into the success toast, or just leaves without one.
      </p>
      <ul class="divide-y divide-border rounded-2xl ring-1 ring-border">
        <li
          v-for="team in teams"
          :key="team.name"
          class="flex items-center justify-between px-4 py-3"
        >
          <span class="text-sm">{{ team.name }}</span>
          <UiSwitch v-model="team.checkedIn" :disabled="started" />
        </li>
      </ul>
      <div class="mt-4 flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-2">
          <UiCheckbox id="announce" v-model="announce" />
          <UiLabel for="announce">Show a success toast</UiLabel>
        </div>
        <UiButton variant="ghost" size="sm" @click="resetTournament">
          Reset
        </UiButton>
        <span v-if="started" class="text-sm text-success-600">Started</span>
      </div>
    </Section>

    <Section title="Unmount" class="flex flex-col items-start gap-4">
      <UiButton variant="outline" @click="pageOpen = !pageOpen">
        {{ pageOpen ? "Leave page" : "Open page" }}
      </UiButton>
      <DraftPage v-if="pageOpen" />
    </Section>

    <Section title="Toasts over the dock" class="flex flex-wrap gap-2">
      <UiButton variant="outline" @click="sonner.info('New version available')">
        One toast
      </UiButton>
      <UiButton variant="outline" @click="burst">Five toasts</UiButton>
      <UiButton variant="ghost" @click="sonner.dismiss()">Dismiss all</UiButton>
    </Section>

    <Section title="Position" class="flex flex-wrap gap-2">
      <UiButton
        v-for="position in positions"
        :key="position"
        variant="outline"
        size="sm"
        @click="sonner.configure({ position })"
      >
        {{ position }}
      </UiButton>
    </Section>
  </div>
</template>
