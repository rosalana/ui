<script setup lang="ts">
import { ref } from "vue";
import { UiButton, UiCodeBlock, UiCodeBlockGroup } from "@rosalana/ui";

const shown = ref("npm");

const npm = `npm install @rosalana/ui`;
const pnpm = `pnpm add @rosalana/ui`;
const yarn = `yarn add @rosalana/ui`;
</script>

<template>
  <div class="flex w-full max-w-xl flex-col gap-3">
    <UiCodeBlockGroup v-model="shown">
      <UiCodeBlock :code="npm" language="bash" value="npm" label="npm" />
      <UiCodeBlock :code="pnpm" language="bash" value="pnpm" label="pnpm" />
      <UiCodeBlock :code="yarn" language="bash" value="yarn" label="yarn" />
    </UiCodeBlockGroup>
    <UiButton class="self-start" size="sm" variant="outline" @click="shown = 'pnpm'">
      Show the pnpm command
    </UiButton>
  </div>
</template>
