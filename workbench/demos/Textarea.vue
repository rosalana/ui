<script setup lang="ts">
import { ref } from "vue";
import UiTextarea from "../../src/components/Ui/Textarea/Textarea.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import Section from "workbench/components/Section.vue";

const bio = ref("");
const MAX = 280;
</script>

<template>
  <Section title="Basic" class="max-w-md">
    <UiTextarea placeholder="Enter text here..." />
  </Section>

  <Section title="With Label" class="max-w-md">
    <div class="space-y-1.5">
      <UiLabel for="description">Description</UiLabel>
      <UiTextarea
        id="description"
        placeholder="Describe your project..."
        rows="4"
      />
    </div>
  </Section>

  <Section title="Character Counter" class="max-w-md">
    <div class="space-y-1.5">
      <div class="flex justify-between">
        <UiLabel>Bio</UiLabel>
        <span
          :class="[
            'text-xs',
            bio.length > MAX ? 'text-destructive' : 'text-theme',
          ]"
        >
          {{ bio.length }} / {{ MAX }}
        </span>
      </div>
      <UiTextarea
        v-model="bio"
        placeholder="Tell us about yourself..."
        rows="3"
      />
    </div>
  </Section>

  <Section title="States" class="max-w-md">
    <div class="space-y-3">
      <UiTextarea placeholder="Disabled textarea" disabled />
      <UiTextarea value="Read only content that cannot be edited." readonly />
    </div>
  </Section>

  <Section title="In a Form" class="max-w-md">
    <div class="space-y-4 p-5 rounded-xl border border-border bg-muted/30">
      <div class="space-y-1.5">
        <UiLabel>Feedback</UiLabel>
        <UiTextarea placeholder="What can we improve?" rows="4" />
      </div>
      <UiButton class="w-full">Submit Feedback</UiButton>
    </div>
  </Section>
</template>
