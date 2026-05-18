<script setup lang="ts">
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import UiInput from "../../src/components/Ui/Input/Input.vue";
import UiCheckbox from "../../src/components/Ui/Checkbox/Checkbox.vue";
import Section from "workbench/components/Section.vue";
</script>

<template>
  <Section title="Basic" class="w-96">
    <div class="space-y-2">
      <UiLabel>First Name</UiLabel>
      <UiInput placeholder="John" />
    </div>
  </Section>

  <Section title="With htmlFor" class="w-96">
    <div class="space-y-4">
      <div class="space-y-1.5">
        <UiLabel for="username">Username</UiLabel>
        <UiInput id="username" placeholder="@johndoe" />
      </div>
      <div class="space-y-1.5">
        <UiLabel for="bio">Bio</UiLabel>
        <UiInput id="bio" placeholder="Tell us about yourself..." />
      </div>
    </div>
  </Section>

  <Section title="With Checkbox" class="w-96">
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <UiCheckbox id="terms" />
        <UiLabel for="terms">Accept terms and conditions</UiLabel>
      </div>
      <div class="flex items-center gap-2">
        <UiCheckbox id="newsletter" />
        <UiLabel for="newsletter">Subscribe to newsletter</UiLabel>
      </div>
    </div>
  </Section>

  <Section title="Disabled" class="w-96">
    <div class="flex items-center gap-2">
      <UiCheckbox id="disabled-check" disabled />
      <UiLabel for="disabled-check" class="opacity-50 cursor-not-allowed"
        >Disabled option</UiLabel
      >
    </div>
  </Section>
</template>
