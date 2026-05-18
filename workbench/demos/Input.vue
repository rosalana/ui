<script setup lang="ts">
import { ref } from "vue";
import UiInput from "../../src/components/Ui/Input/Input.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import Section from "workbench/components/Section.vue";

const text = ref("");
const email = ref("");
const password = ref("");
</script>

<template>
  <Section title="Basic Inputs" class="w-96">
    <div class="space-y-3">
      <UiInput placeholder="Enter text..." v-model="text" />
      <UiInput type="email" placeholder="email@example.com" v-model="email" />
      <UiInput type="password" placeholder="Password" v-model="password" />
    </div>
  </Section>

  <Section title="With Label" class="w-96">
    <div class="space-y-4">
      <div class="space-y-1.5">
        <UiLabel for="name">Full Name</UiLabel>
        <UiInput id="name" placeholder="John Doe" />
      </div>
      <div class="space-y-1.5">
        <UiLabel for="email">Email Address</UiLabel>
        <UiInput id="email" type="email" placeholder="john@example.com" />
      </div>
    </div>
  </Section>

  <Section title="States" class="w-96">
    <div class="space-y-3">
      <UiInput placeholder="Disabled" disabled />
      <UiInput placeholder="Read only" readonly value="Read only value" />
    </div>
  </Section>

  <Section title="In a Form" class="w-96">
    <div class="space-y-4 p-5 rounded-xl border border-border bg-muted/30">
      <div class="space-y-1.5">
        <UiLabel>Name</UiLabel>
        <UiInput placeholder="Your name" />
      </div>
      <div class="space-y-1.5">
        <UiLabel>Email</UiLabel>
        <UiInput type="email" placeholder="Your email" />
      </div>
      <UiButton class="w-full">Submit</UiButton>
    </div>
  </Section>
</template>
