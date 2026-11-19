<script setup lang="ts">
import { ref } from "vue";
import { router } from "@inertiajs/vue3";
import { UiCheckbox, UiLabel, useDock, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const props = defineProps<{
  matches: { id: number; name: string; time: string }[];
}>();

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

// The dock waits for the visit. The flash message of the response replaces the dock as a toast.
function archive() {
  return new Promise((done) =>
    router.post(
      "/matches/archive",
      { ids: selected.value },
      {
        onSuccess: () => (selected.value = []),
        onFinish: done,
      },
    ),
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
    <li v-for="match in props.matches" :key="match.id" class="flex items-center gap-3 px-4 py-3">
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
