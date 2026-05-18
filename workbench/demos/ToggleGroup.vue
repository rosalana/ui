<script setup lang="ts">
import { ref } from "vue";
import UiToggleGroup from "../../src/components/Ui/ToggleGroup/ToggleGroup.vue";
import UiToggleGroupItem from "../../src/components/Ui/ToggleGroup/ToggleGroupItem.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";
import Section from "workbench/components/Section.vue";

const align = ref("left");
const view = ref("grid");
const formats = ref(["bold"]);
</script>

<template>
  <Section title="Single Selection" class="max-w-md">
    <div class="space-y-4">
      <div class="space-y-2">
        <p class="text-xs text-theme">
          Text Alignment: <strong class="text-foreground">{{ align }}</strong>
        </p>
        <UiToggleGroup type="single" v-model="align">
          <UiToggleGroupItem value="left" aria-label="Align left">
            <UiIcon name="lucide:align-left" />
          </UiToggleGroupItem>
          <UiToggleGroupItem value="center" aria-label="Align center">
            <UiIcon name="lucide:align-center" />
          </UiToggleGroupItem>
          <UiToggleGroupItem value="right" aria-label="Align right">
            <UiIcon name="lucide:align-right" />
          </UiToggleGroupItem>
          <UiToggleGroupItem value="justify" aria-label="Justify">
            <UiIcon name="lucide:align-justify" />
          </UiToggleGroupItem>
        </UiToggleGroup>
      </div>

      <div class="space-y-2">
        <p class="text-xs text-theme">
          View: <strong class="text-foreground">{{ view }}</strong>
        </p>
        <UiToggleGroup type="single" v-model="view">
          <UiToggleGroupItem value="grid">
            <UiIcon name="lucide:grid-3x3" />
            Grid
          </UiToggleGroupItem>
          <UiToggleGroupItem value="list">
            <UiIcon name="lucide:list" />
            List
          </UiToggleGroupItem>
          <UiToggleGroupItem value="table">
            <UiIcon name="lucide:table" />
            Table
          </UiToggleGroupItem>
        </UiToggleGroup>
      </div>
    </div>
  </Section>

  <Section title="Multiple Selection" class="max-w-md">
    <div class="space-y-2">
      <p class="text-xs text-theme">
        Active:
        <strong class="text-foreground">{{
          formats.join(", ") || "none"
        }}</strong>
      </p>
      <UiToggleGroup type="multiple" v-model="formats">
        <UiToggleGroupItem value="bold"
          ><UiIcon name="lucide:bold"
        /></UiToggleGroupItem>
        <UiToggleGroupItem value="italic"
          ><UiIcon name="lucide:italic"
        /></UiToggleGroupItem>
        <UiToggleGroupItem value="underline"
          ><UiIcon name="lucide:underline"
        /></UiToggleGroupItem>
        <UiToggleGroupItem value="strikethrough"
          ><UiIcon name="lucide:strikethrough"
        /></UiToggleGroupItem>
      </UiToggleGroup>
    </div>
  </Section>

  <Section title="Variants" class="max-w-md">
    <div class="space-y-3">
      <UiToggleGroup type="single" default-value="a" variant="default">
        <UiToggleGroupItem value="a">Option A</UiToggleGroupItem>
        <UiToggleGroupItem value="b">Option B</UiToggleGroupItem>
        <UiToggleGroupItem value="c">Option C</UiToggleGroupItem>
      </UiToggleGroup>
      <UiToggleGroup type="single" default-value="a" variant="outline">
        <UiToggleGroupItem value="a">Option A</UiToggleGroupItem>
        <UiToggleGroupItem value="b">Option B</UiToggleGroupItem>
        <UiToggleGroupItem value="c">Option C</UiToggleGroupItem>
      </UiToggleGroup>
    </div>
  </Section>
</template>
