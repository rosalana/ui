<script setup lang="ts">
import { ref } from "vue";
import { Actions, UiBadge, UiButton, UiIcon, useSonner } from "@rosalana/ui";

const sonner = useSonner();

const members = ref([
  { id: 1, name: "Eliska Novakova", role: "Organizer", archived: false },
  { id: 2, name: "Tomas Dvorak", role: "Referee", archived: false },
  { id: 3, name: "Jana Svobodova", role: "Viewer", archived: false },
]);

// A getter: the list is rebuilt whenever the state it reads changes.
function actionsFor(member: (typeof members.value)[number]) {
  const canManage = member.role === "Organizer";

  return () => [
    {
      label: "View profile",
      icon: "lucide:user",
      onClick: () => sonner.default(`Opening ${member.name}`),
    },
    { divider: true, hidden: !canManage },
    {
      label: "Archive",
      icon: "lucide:archive",
      hidden: !canManage || member.archived,
      onClick: () => {
        member.archived = true;
        sonner.success(`${member.name} archived`);
      },
    },
    {
      label: "Restore",
      icon: "lucide:archive-restore",
      hidden: !canManage || !member.archived,
      onClick: () => {
        member.archived = false;
        sonner.success(`${member.name} restored`);
      },
    },
    {
      label: "Remove from team",
      icon: "lucide:user-minus",
      disabled: member.archived,
      hidden: !canManage,
      class: "text-destructive",
      onClick: () => sonner.error(`${member.name} removed`),
    },
  ];
}
</script>

<template>
  <ul class="w-full max-w-md divide-y divide-border rounded-2xl border">
    <li
      v-for="member in members"
      :key="member.id"
      class="flex items-center justify-between gap-3 px-4 py-3"
    >
      <div class="min-w-0">
        <p class="truncate text-sm font-medium" :class="{ 'line-through opacity-60': member.archived }">
          {{ member.name }}
        </p>
        <p class="text-xs text-theme">{{ member.role }}</p>
      </div>
      <div class="flex items-center gap-2">
        <UiBadge v-if="member.archived" variant="secondary">Archived</UiBadge>
        <Actions :items="actionsFor(member)" align="end">
          <template #trigger>
            <UiButton variant="ghost" size="icon-sm" :aria-label="`Actions for ${member.name}`">
              <UiIcon name="lucide:more-horizontal" class="size-4" />
            </UiButton>
          </template>
        </Actions>
      </div>
    </li>
  </ul>
</template>
