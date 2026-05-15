<script setup lang="ts">
import { ref } from "vue";
import UiInput from "../../src/components/Ui/Input/Input.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";

const text = ref("");
const email = ref("");
const password = ref("");
</script>

<template>
  <div class="space-y-10 max-w-md">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Basic</h2>
      <div class="space-y-3">
        <UiInput placeholder="Enter text..." v-model="text" />
        <UiInput type="email" placeholder="email@example.com" v-model="email" />
        <UiInput type="password" placeholder="Password" v-model="password" />
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">With Label</h2>
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
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">States</h2>
      <div class="space-y-3">
        <UiInput placeholder="Disabled" disabled />
        <UiInput placeholder="Read only" readonly value="Read only value" />
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">In a Form</h2>
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
    </section>
  </div>
</template>
