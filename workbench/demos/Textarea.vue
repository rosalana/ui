<script setup lang="ts">
import { ref } from "vue";
import UiTextarea from "../../src/components/Ui/Textarea/Textarea.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";

const bio = ref("");
const MAX = 280;
</script>

<template>
  <div class="space-y-10 max-w-md">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Basic</h2>
      <UiTextarea placeholder="Enter text here..." />
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">With Label</h2>
      <div class="space-y-1.5">
        <UiLabel for="description">Description</UiLabel>
        <UiTextarea id="description" placeholder="Describe your project..." rows="4" />
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Character Counter</h2>
      <div class="space-y-1.5">
        <div class="flex justify-between">
          <UiLabel>Bio</UiLabel>
          <span :class="['text-xs', bio.length > MAX ? 'text-destructive' : 'text-theme']">
            {{ bio.length }} / {{ MAX }}
          </span>
        </div>
        <UiTextarea v-model="bio" placeholder="Tell us about yourself..." rows="3" />
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">States</h2>
      <div class="space-y-3">
        <UiTextarea placeholder="Disabled textarea" disabled />
        <UiTextarea value="Read only content that cannot be edited." readonly />
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">In a Form</h2>
      <div class="space-y-4 p-5 rounded-xl border border-border bg-muted/30">
        <div class="space-y-1.5">
          <UiLabel>Feedback</UiLabel>
          <UiTextarea placeholder="What can we improve?" rows="4" />
        </div>
        <UiButton class="w-full">Submit Feedback</UiButton>
      </div>
    </section>
  </div>
</template>
