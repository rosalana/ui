<script setup lang="ts">
import { useSonner } from "../../src/composables/useSonner";
import type { SonnerPosition } from "../../src/composables/useSonner";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import Section from "../components/Section.vue";

const sonner = useSonner();

const positions: SonnerPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const wait = <T,>(ms: number, value: T, fail = false) =>
  new Promise<T>((resolve, reject) =>
    setTimeout(() => (fail ? reject(new Error("Network error")) : resolve(value)), ms),
  );

function savePromise(fail: boolean) {
  sonner.promise(wait(2000, { name: "Summer Split" }, fail), {
    loading: "Saving season…",
    success: (season) => ({
      title: `${season.name} saved`,
      description: "Teams can now register.",
    }),
    error: (error) => ({
      title: "Could not save the season",
      description: (error as Error).message,
    }),
  });
}
</script>

<template>
  <div class="flex flex-col gap-10">
    <Section title="Types" class="flex flex-wrap gap-2">
      <UiButton variant="outline" @click="sonner.default('Event has been created')">
        Default
      </UiButton>
      <UiButton
        variant="outline"
        @click="sonner.info('New version available', { description: 'Reload the page to update.' })"
      >
        Info
      </UiButton>
      <UiButton
        variant="outline"
        @click="sonner.success('Profile saved', { description: 'Your changes are live.' })"
      >
        Success
      </UiButton>
      <UiButton
        variant="outline"
        @click="sonner.warning('Storage almost full', { description: 'You have used 92% of your space.' })"
      >
        Warning
      </UiButton>
      <UiButton
        variant="outline"
        @click="sonner.error('Payment failed', { description: 'Your card was declined.' })"
      >
        Error
      </UiButton>
      <UiButton variant="outline" @click="sonner.loading('Uploading files…')">
        Loading
      </UiButton>
    </Section>

    <Section title="Promise" class="flex flex-wrap gap-2">
      <UiButton variant="outline" @click="savePromise(false)">Resolve</UiButton>
      <UiButton variant="outline" @click="savePromise(true)">Reject</UiButton>
    </Section>

    <Section title="Options" class="flex flex-wrap gap-2">
      <UiButton
        variant="outline"
        @click="
          sonner.default('Message archived', {
            action: { label: 'Undo', onClick: () => sonner.success('Restored') },
          })
        "
      >
        With action
      </UiButton>
      <UiButton
        variant="outline"
        @click="sonner.info({ title: 'Stays until closed', duration: Infinity })"
      >
        Persistent
      </UiButton>
      <UiButton
        variant="outline"
        @click="sonner.default('Queued for review', { icon: 'lucide:send', dismissible: false })"
      >
        Custom icon, not dismissible
      </UiButton>
      <UiButton variant="ghost" @click="sonner.dismiss()">Dismiss all</UiButton>
    </Section>

    <Section title="Position" class="flex flex-wrap gap-2">
      <UiButton
        v-for="position in positions"
        :key="position"
        variant="outline"
        size="sm"
        @click="
          sonner.configure({ position });
          sonner.default(`Moved to ${position}`);
        "
      >
        {{ position }}
      </UiButton>
    </Section>
  </div>
</template>
