<script setup lang="ts">
import { ref } from "vue";
import UiSelect from "../../src/components/Ui/Select/Select.vue";
import UiSelectTrigger from "../../src/components/Ui/Select/SelectTrigger.vue";
import UiSelectValue from "../../src/components/Ui/Select/SelectValue.vue";
import UiSelectContent from "../../src/components/Ui/Select/SelectContent.vue";
import UiSelectGroup from "../../src/components/Ui/Select/SelectGroup.vue";
import UiSelectLabel from "../../src/components/Ui/Select/SelectLabel.vue";
import UiSelectItem from "../../src/components/Ui/Select/SelectItem.vue";
import UiSelectSeparator from "../../src/components/Ui/Select/SelectSeparator.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import Section from "workbench/components/Section.vue";

const fruit = ref("");
const timezone = ref("");
</script>

<template>
  <Section title="Basic" class="w-72">
    <UiSelect v-model="fruit">
      <UiSelectTrigger>
        <UiSelectValue placeholder="Select a fruit..." />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem value="apple">Apple</UiSelectItem>
        <UiSelectItem value="banana">Banana</UiSelectItem>
        <UiSelectItem value="cherry">Cherry</UiSelectItem>
        <UiSelectItem value="grape">Grape</UiSelectItem>
        <UiSelectItem value="orange">Orange</UiSelectItem>
      </UiSelectContent>
    </UiSelect>
    <p v-if="fruit" class="mt-2 text-xs text-theme">Selected: {{ fruit }}</p>
  </Section>

  <Section title="With Groups" class="w-72">
    <div class="space-y-1.5">
      <UiLabel>Timezone</UiLabel>
      <UiSelect v-model="timezone">
        <UiSelectTrigger class="w-full">
          <UiSelectValue placeholder="Select timezone..." />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectGroup>
            <UiSelectLabel>North America</UiSelectLabel>
            <UiSelectItem value="est">Eastern (EST)</UiSelectItem>
            <UiSelectItem value="cst">Central (CST)</UiSelectItem>
            <UiSelectItem value="mst">Mountain (MST)</UiSelectItem>
            <UiSelectItem value="pst">Pacific (PST)</UiSelectItem>
          </UiSelectGroup>
          <UiSelectSeparator />
          <UiSelectGroup>
            <UiSelectLabel>Europe</UiSelectLabel>
            <UiSelectItem value="cet">Central European (CET)</UiSelectItem>
            <UiSelectItem value="eet">Eastern European (EET)</UiSelectItem>
          </UiSelectGroup>
        </UiSelectContent>
      </UiSelect>
    </div>
  </Section>

  <Section title="Disabled" class="w-72">
    <UiSelect disabled>
      <UiSelectTrigger>
        <UiSelectValue placeholder="Disabled select" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem value="a">Option A</UiSelectItem>
      </UiSelectContent>
    </UiSelect>
  </Section>
</template>
