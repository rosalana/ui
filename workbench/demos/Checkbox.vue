<script setup lang="ts">
import { ref } from "vue";
import UiCheckbox from "../../src/components/Ui/Checkbox/Checkbox.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import Section from "workbench/components/Section.vue";

const checked1 = ref(false);
const checked2 = ref(true);
const checked3 = ref<boolean | "indeterminate">("indeterminate");
const terms = ref(false);
const notifications = ref(false);
const updates = ref(true);
</script>

<template>
  <Section title="States">
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <UiCheckbox v-model="checked1" id="c1" />
        <UiLabel for="c1">Unchecked (click me)</UiLabel>
      </div>
      <div class="flex items-center gap-3">
        <UiCheckbox v-model="checked2" id="c2" />
        <UiLabel for="c2">Checked by default</UiLabel>
      </div>
      <div class="flex items-center gap-3">
        <UiCheckbox v-model="checked3" id="c3" />
        <UiLabel for="c3">Indeterminate</UiLabel>
      </div>
      <div class="flex items-center gap-3">
        <UiCheckbox id="c4" disabled />
        <UiLabel for="c4" class="opacity-50">Disabled</UiLabel>
      </div>
      <div class="flex items-center gap-3">
        <UiCheckbox id="c5" :model-value="true" disabled />
        <UiLabel for="c5" class="opacity-50">Disabled checked</UiLabel>
      </div>
    </div>
  </Section>

  <Section title="In a Form">
    <div
      class="space-y-3 p-5 rounded-xl border border-border bg-muted/20 max-w-xs"
    >
      <p class="text-sm font-medium mb-4">Notification preferences</p>
      <div class="flex items-center gap-3">
        <UiCheckbox v-model="notifications" id="notif" />
        <div>
          <UiLabel for="notif">Email notifications</UiLabel>
          <p class="text-xs text-theme mt-0.5">Receive emails about activity</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <UiCheckbox v-model="updates" id="updates" />
        <div>
          <UiLabel for="updates">Product updates</UiLabel>
          <p class="text-xs text-theme mt-0.5">
            Get notified about new features
          </p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <UiCheckbox v-model="terms" id="terms" />
        <UiLabel for="terms"
          >I agree to the
          <span class="text-primary underline cursor-pointer"
            >terms of service</span
          ></UiLabel
        >
      </div>
    </div>
  </Section>
</template>
