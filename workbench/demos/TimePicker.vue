<script setup lang="ts">
import { shallowRef } from "vue";
import { Time } from "@internationalized/date";
import Section from "workbench/components/Section.vue";
import UiTimePicker from "../../src/components/Ui/TimePicker/TimePicker.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";

const time = shallowRef<Time | null>(new Time(14, 30));
const withSeconds = shallowRef<Time | null>(new Time(9, 5, 45));
const stepped = shallowRef<Time | null>(new Time(10, 15));
const twelve = shallowRef<Time | null>(new Time(18, 45));
const empty = shallowRef<Time | null>(null);

const frame = "inline-block rounded-xl border border-border bg-background";
</script>

<template>
  <Section title="Basic" class="flex flex-wrap items-center gap-6">
    <div :class="frame">
      <UiTimePicker v-model="time" locale="cs-CZ" />
    </div>
    <div class="space-y-2">
      <p class="text-xs text-theme">Value: <strong class="text-foreground">{{ time?.toString() ?? "—" }}</strong></p>
      <div class="flex gap-2">
        <UiButton size="xs" variant="outline" @click="time = new Time(8, 0)">8:00</UiButton>
        <UiButton size="xs" variant="outline" @click="time = new Time(12, 30)">12:30</UiButton>
        <UiButton size="xs" variant="outline" @click="time = new Time(23, 59)">23:59</UiButton>
      </div>
      <p class="max-w-64 text-xs text-theme">Scroll with the wheel or trackpad, drag with the mouse, click a row or use the arrow keys.</p>
    </div>
  </Section>

  <Section title="Seconds" class="flex flex-wrap items-center gap-6">
    <div :class="frame">
      <UiTimePicker v-model="withSeconds" seconds locale="cs-CZ" />
    </div>
    <p class="text-xs text-theme">{{ withSeconds?.toString() }}</p>
  </Section>

  <Section title="15 minute steps" class="flex flex-wrap items-center gap-6">
    <div :class="frame">
      <UiTimePicker v-model="stepped" :minute-step="15" locale="cs-CZ" />
    </div>
    <p class="text-xs text-theme">{{ stepped?.toString() }}</p>
  </Section>

  <Section title="12 hour clock (en-US)" class="flex flex-wrap items-center gap-6">
    <div :class="frame">
      <UiTimePicker v-model="twelve" locale="en-US" />
    </div>
    <p class="text-xs text-theme">{{ twelve?.toString() }}</p>
  </Section>

  <Section title="Rows & empty value" class="flex flex-wrap items-center gap-6">
    <div :class="frame">
      <UiTimePicker v-model="empty" :rows="3" locale="cs-CZ" />
    </div>
    <div :class="frame">
      <UiTimePicker v-model="empty" :rows="7" locale="cs-CZ" />
    </div>
    <p class="max-w-56 text-xs text-theme">Starts at the current time, no value until you pick: <strong class="text-foreground">{{ empty?.toString() ?? "null" }}</strong></p>
  </Section>

  <Section title="Without loop" class="flex flex-wrap items-center gap-6">
    <div :class="frame">
      <UiTimePicker v-model="time" :loop="false" locale="cs-CZ" />
    </div>
    <p class="max-w-56 text-xs text-theme">The wheels stop at 00 and 23 / 59 instead of running on.</p>
  </Section>

  <Section title="Without scrolling" class="flex flex-wrap items-center gap-6">
    <div :class="frame">
      <UiTimePicker v-model="time" :scroll="false" locale="cs-CZ" />
    </div>
    <p class="max-w-56 text-xs text-theme">Wheel and trackpad scroll the page, the wheels move by click and drag only.</p>
  </Section>

  <Section title="Disabled">
    <div :class="frame">
      <UiTimePicker :model-value="new Time(7, 30)" locale="cs-CZ" disabled />
    </div>
  </Section>
</template>
