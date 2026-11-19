<script setup lang="ts">
import { ref } from "vue";
import { UiCheckbox, UiLabel, useDock, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const matches = ref([
  { id: 1, name: "Falcons vs. Wolves", time: "18:00" },
  { id: 2, name: "Ravens vs. Tigers", time: "18:45" },
  { id: 3, name: "Sharks vs. Bears", time: "19:30" },
  { id: 4, name: "Eagles vs. Foxes", time: "20:15" },
]);
const selected = ref<number[]>([]);

function toggle(id: number, checked: boolean | "indeterminate") {
  selected.value = checked
    ? [...selected.value, id]
    : selected.value.filter((i) => i !== id);
}

// The selection stays, so the dock stays too and the toast stacks above it.
async function copyLinks() {
  const links = selected.value.map((id) => `${location.origin}/matches/${id}`);
  await navigator.clipboard.writeText(links.join("\n"));
  sonner.default(`${links.length} links copied`);
}

// Stands in for the request; the app shows its flash message as a success toast.
function archive() {
  return new Promise<void>((done) =>
    setTimeout(() => {
      const count = selected.value.length;
      matches.value = matches.value.filter((m) => !selected.value.includes(m.id));
      selected.value = [];
      sonner.success(`${count} matches archived`);
      done();
    }, 1000),
  );
}

useDock(
  () => selected.value.length > 0,
  () => ({
    title: `${selected.value.length} selected`,
    actions: [
      { label: "Clear", variant: "ghost", onClick: () => (selected.value = []) },
      { label: "Copy links", icon: "lucide:link", onClick: copyLinks },
      { label: "Archive", icon: "lucide:archive", variant: "default", onClick: archive },
    ],
  }),
);
</script>

<template>
  <ul class="w-full max-w-sm divide-y divide-border rounded-xl border">
    <li v-for="match in matches" :key="match.id" class="flex items-center gap-3 px-4 py-3">
      <UiCheckbox
        :id="`match-${match.id}`"
        :model-value="selected.includes(match.id)"
        @update:model-value="toggle(match.id, $event)"
      />
      <UiLabel :for="`match-${match.id}`" class="flex-1">{{ match.name }}</UiLabel>
      <span class="text-xs text-theme">{{ match.time }}</span>
    </li>
  </ul>
</template>
