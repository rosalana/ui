<script setup lang="ts">
import { ref } from "vue";
import UiSwitch from "../../src/components/Ui/Switch/Switch.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import Section from "workbench/components/Section.vue";

const notifications = ref(true);
const darkMode = ref(false);
const autoSave = ref(true);
const marketing = ref(false);
</script>

<template>
  <Section title="Basic" class="max-w-md">
    <div class="flex gap-4">
      <UiSwitch />
      <UiSwitch :default-checked="true" />
      <UiSwitch disabled />
      <UiSwitch :default-checked="true" disabled />
    </div>
  </Section>

  <Section title="With Label" class="max-w-md">
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <UiLabel>Push Notifications</UiLabel>
          <p class="text-xs text-theme mt-0.5">Receive alerts on your device</p>
        </div>
        <UiSwitch v-model:checked="notifications" />
      </div>
      <div class="flex items-center justify-between">
        <div>
          <UiLabel>Dark Mode</UiLabel>
          <p class="text-xs text-theme mt-0.5">Switch to dark theme</p>
        </div>
        <UiSwitch v-model:checked="darkMode" />
      </div>
      <div class="flex items-center justify-between">
        <div>
          <UiLabel>Auto-save</UiLabel>
          <p class="text-xs text-theme mt-0.5">Save changes automatically</p>
        </div>
        <UiSwitch v-model:checked="autoSave" />
      </div>
      <div class="flex items-center justify-between">
        <div>
          <UiLabel>Marketing emails</UiLabel>
          <p class="text-xs text-theme mt-0.5">Receive product updates</p>
        </div>
        <UiSwitch v-model:checked="marketing" />
      </div>
    </div>
  </Section>

  <Section title="State" class="max-w-md">
    <div
      class="p-4 rounded-xl border border-muted-200 dark:border-muted-800 text-sm text-theme"
    >
      Notifications:
      <strong class="text-foreground">{{
        notifications ? "On" : "Off"
      }}</strong>
      · Dark mode:
      <strong class="text-foreground">{{ darkMode ? "On" : "Off" }}</strong> ·
      Auto-save:
      <strong class="text-foreground">{{ autoSave ? "On" : "Off" }}</strong>
    </div>
  </Section>
</template>
