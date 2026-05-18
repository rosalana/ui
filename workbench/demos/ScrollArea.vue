<script setup lang="ts">
import Section from "workbench/components/Section.vue";
import UiScrollArea from "../../src/components/Ui/ScrollArea/ScrollArea.vue";
import UiScrollBar from "../../src/components/Ui/ScrollArea/ScrollBar.vue";
import UiSeparator from "../../src/components/Ui/Separator/Separator.vue";

const tags = Array.from({ length: 50 }, (_, i) => `Component ${i + 1}`);

const notifications = [
  { title: "New message", desc: "Alice sent you a message", time: "2m ago" },
  {
    title: "System update",
    desc: "Version 2.4.0 is available",
    time: "5m ago",
  },
  { title: "New follower", desc: "Bob started following you", time: "12m ago" },
  { title: "Invoice paid", desc: "INV-042 has been paid", time: "1h ago" },
  { title: "Task assigned", desc: "You were assigned to #245", time: "2h ago" },
  { title: "Comment", desc: "Carol commented on your post", time: "3h ago" },
  {
    title: "Deploy success",
    desc: "Production deployment completed",
    time: "4h ago",
  },
  { title: "New message", desc: "Dave sent you a file", time: "5h ago" },
  {
    title: "Security alert",
    desc: "New login from Chrome/Mac",
    time: "6h ago",
  },
  {
    title: "Weekly report",
    desc: "Your weekly summary is ready",
    time: "1d ago",
  },
];
</script>

<template>
  <Section title="Vertical Scroll" class="max-w-md">
    <div class="rounded-xl border border-muted-200 dark:border-muted-800">
      <UiScrollArea class="h-64">
        <div class="p-4 space-y-0">
          <div
            v-for="notif in notifications"
            :key="notif.title + notif.time"
            class="flex gap-3 py-3 border-b border-muted-100 dark:border-muted-900 last:border-0"
          >
            <div class="size-2 rounded-full bg-primary mt-1.5 shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium">{{ notif.title }}</p>
              <p class="text-xs text-theme truncate">{{ notif.desc }}</p>
            </div>
            <span class="text-xs text-theme shrink-0">{{ notif.time }}</span>
          </div>
        </div>
        <UiScrollBar />
      </UiScrollArea>
    </div>
  </Section>

  <Section title="Horizontal Scroll" class="max-w-md">
    <div class="rounded-xl border border-muted-200 dark:border-muted-800">
      <UiScrollArea class="w-full" orientation="horizontal">
        <div class="flex gap-3 p-4" style="width: max-content">
          <div
            v-for="tag in tags.slice(0, 20)"
            :key="tag"
            class="shrink-0 px-3 py-1.5 rounded-lg bg-muted-100 dark:bg-muted-900 text-xs font-medium whitespace-nowrap"
          >
            {{ tag }}
          </div>
        </div>
        <UiScrollBar orientation="horizontal" />
      </UiScrollArea>
    </div>
  </Section>

  <Section title="Tag List" class="max-w-md">
    <div class="rounded-xl border border-muted-200 dark:border-muted-800">
      <UiScrollArea class="h-48">
        <div class="p-3 grid grid-cols-3 gap-1.5">
          <div
            v-for="tag in tags"
            :key="tag"
            class="px-2 py-1 rounded-md text-xs text-theme hover:bg-muted-100 dark:hover:bg-muted-900 cursor-pointer transition-colors"
          >
            {{ tag }}
          </div>
        </div>
        <UiScrollBar />
      </UiScrollArea>
    </div>
  </Section>
</template>
