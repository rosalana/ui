<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiDropdownMenu,
  UiDropdownMenuCheckboxItem,
  UiDropdownMenuContent,
  UiDropdownMenuLabel,
  UiDropdownMenuRadioGroup,
  UiDropdownMenuRadioItem,
  UiDropdownMenuSeparator,
  UiDropdownMenuTrigger,
  UiIcon,
} from "@rosalana/ui";

const sort = ref("newest");
const showFinished = ref(true);
const showCancelled = ref(false);
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="outline">
        <UiIcon name="lucide:sliders-horizontal" />
        View options
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="w-56" align="start">
      <UiDropdownMenuLabel>Sort tournaments</UiDropdownMenuLabel>
      <UiDropdownMenuRadioGroup v-model="sort">
        <UiDropdownMenuRadioItem value="newest">Newest first</UiDropdownMenuRadioItem>
        <UiDropdownMenuRadioItem value="name">By name</UiDropdownMenuRadioItem>
        <UiDropdownMenuRadioItem value="players">Most players</UiDropdownMenuRadioItem>
      </UiDropdownMenuRadioGroup>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuLabel>Show</UiDropdownMenuLabel>
      <UiDropdownMenuCheckboxItem v-model="showFinished">
        Finished tournaments
      </UiDropdownMenuCheckboxItem>
      <UiDropdownMenuCheckboxItem v-model="showCancelled">
        Cancelled tournaments
      </UiDropdownMenuCheckboxItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
