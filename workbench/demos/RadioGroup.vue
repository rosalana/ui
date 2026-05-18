<script setup lang="ts">
import { ref } from "vue";
import UiRadioGroup from "../../src/components/Ui/RadioGroup/RadioGroup.vue";
import UiRadioGroupItem from "../../src/components/Ui/RadioGroup/RadioGroupItem.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import Section from "workbench/components/Section.vue";

const plan = ref("pro");
const size = ref("md");
const notify = ref("email");
</script>

<template>
  <Section title="Basic">
    <UiRadioGroup v-model="size" class="space-y-2">
      <div class="flex items-center gap-2">
        <UiRadioGroupItem id="xs" value="xs" />
        <UiLabel for="xs">Extra Small</UiLabel>
      </div>
      <div class="flex items-center gap-2">
        <UiRadioGroupItem id="sm" value="sm" />
        <UiLabel for="sm">Small</UiLabel>
      </div>
      <div class="flex items-center gap-2">
        <UiRadioGroupItem id="md" value="md" />
        <UiLabel for="md">Medium</UiLabel>
      </div>
      <div class="flex items-center gap-2">
        <UiRadioGroupItem id="lg" value="lg" />
        <UiLabel for="lg">Large</UiLabel>
      </div>
    </UiRadioGroup>
  </Section>

  <Section title="Card Style" class="w-96">
    <UiRadioGroup v-model="plan" class="space-y-2">
      <label
        v-for="p in [
          {
            value: 'free',
            label: 'Free',
            desc: 'Up to 3 projects, 1GB storage',
            price: '$0/mo',
          },
          {
            value: 'pro',
            label: 'Pro',
            desc: 'Unlimited projects, 50GB storage',
            price: '$12/mo',
          },
          {
            value: 'team',
            label: 'Team',
            desc: 'Everything in Pro + team features',
            price: '$49/mo',
          },
        ]"
        :key="p.value"
        :for="p.value"
        :class="[
          'flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all',
          plan === p.value
            ? 'border-primary bg-primary/5 shadow-[0_0_0_1px] shadow-primary/20'
            : 'border-muted-200 dark:border-muted-800 hover:border-muted-300 dark:hover:border-muted-700',
        ]"
      >
        <UiRadioGroupItem :id="p.value" :value="p.value" />
        <div class="flex-1">
          <p class="text-sm font-medium">{{ p.label }}</p>
          <p class="text-xs text-theme">{{ p.desc }}</p>
        </div>
        <span class="text-sm font-semibold text-primary">{{ p.price }}</span>
      </label>
    </UiRadioGroup>
  </Section>

  <Section title="Notification Preference">
    <UiRadioGroup v-model="notify" class="flex gap-4">
      <div class="flex items-center gap-2">
        <UiRadioGroupItem id="email" value="email" />
        <UiLabel for="email">Email</UiLabel>
      </div>
      <div class="flex items-center gap-2">
        <UiRadioGroupItem id="sms" value="sms" />
        <UiLabel for="sms">SMS</UiLabel>
      </div>
      <div class="flex items-center gap-2">
        <UiRadioGroupItem id="push" value="push" />
        <UiLabel for="push">Push</UiLabel>
      </div>
    </UiRadioGroup>
  </Section>
</template>
