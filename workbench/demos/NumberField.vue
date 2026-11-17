<script setup lang="ts">
import { ref } from "vue";
import Section from "workbench/components/Section.vue";
import UiNumberField from "../../src/components/Ui/NumberField/NumberField.vue";
import UiNumberFieldInput from "../../src/components/Ui/NumberField/NumberFieldInput.vue";
import UiNumberFieldDecrement from "../../src/components/Ui/NumberField/NumberFieldDecrement.vue";
import UiNumberFieldIncrement from "../../src/components/Ui/NumberField/NumberFieldIncrement.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";

const quantity = ref(1);
const guests = ref(4);
const price = ref(1249.5);
const discount = ref(0.15);
const distance = ref(42);
const big = ref(987);
const empty = ref<number | undefined>(undefined);
const plain = ref(12);

const randomBig = () => (big.value = Math.floor(Math.random() * 100000));
</script>

<template>
  <Section title="Basic" class="max-w-xs space-y-2">
    <UiLabel for="quantity">Quantity</UiLabel>
    <UiNumberField id="quantity" v-model="quantity" :min="0" />
    <p class="text-xs text-theme">v-model: <code class="text-foreground">{{ quantity }}</code> — try the buttons, ↑ / ↓, PageUp / PageDown or the mouse wheel.</p>
  </Section>

  <Section title="Min, max & step" class="max-w-xs space-y-2">
    <UiLabel>Guests (2–12, step 2)</UiLabel>
    <UiNumberField v-model="guests" :min="2" :max="12" :step="2" />
    <p class="text-xs text-theme">The buttons switch off at the ends.</p>
  </Section>

  <Section title="Formatting" class="max-w-xs space-y-4">
    <div class="space-y-2">
      <UiLabel>Price (CZK)</UiLabel>
      <UiNumberField
        v-model="price"
        :step="50"
        locale="cs-CZ"
        :format-options="{ style: 'currency', currency: 'CZK' }"
      />
    </div>
    <div class="space-y-2">
      <UiLabel>Discount</UiLabel>
      <UiNumberField
        v-model="discount"
        :step="0.05"
        :min="0"
        :max="1"
        :format-options="{ style: 'percent' }"
      />
    </div>
    <div class="space-y-2">
      <UiLabel>Distance</UiLabel>
      <UiNumberField
        v-model="distance"
        :format-options="{ style: 'unit', unit: 'kilometer', unitDisplay: 'short' }"
      />
    </div>
  </Section>

  <Section title="Rolling digits" class="max-w-xs space-y-2">
    <UiNumberField v-model="big" locale="cs-CZ" :step="111" />
    <div class="flex gap-2">
      <UiButton size="xs" variant="outline" @click="randomBig">Random</UiButton>
      <UiButton size="xs" variant="outline" @click="big = 9">9</UiButton>
      <UiButton size="xs" variant="outline" @click="big = 1000000">1 000 000</UiButton>
    </div>
    <p class="text-xs text-theme">Digits roll to the new value, new places slide in.</p>
  </Section>

  <Section title="Custom layout" class="max-w-xs space-y-4">
    <UiNumberField v-model="quantity" :min="0">
      <UiNumberFieldInput class="pl-2" />
      <UiNumberFieldDecrement />
      <UiNumberFieldIncrement />
    </UiNumberField>
    <UiNumberField v-model="quantity" :min="0">
      <UiNumberFieldDecrement icon="lucide:chevron-left" />
      <UiNumberFieldInput />
      <UiNumberFieldIncrement icon="lucide:chevron-right" />
    </UiNumberField>
  </Section>

  <Section title="Placeholder & no animation" class="max-w-xs space-y-4">
    <UiNumberField v-model="empty" placeholder="How many?" />
    <UiNumberField v-model="plain" :animated="false" />
  </Section>

  <Section title="States" class="max-w-xs space-y-2">
    <UiNumberField :default-value="3" disabled />
    <UiNumberField :default-value="3" readonly />
    <UiNumberField :default-value="3" variant="destructive" />
  </Section>
</template>
