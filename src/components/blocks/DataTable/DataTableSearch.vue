<script setup lang="ts" generic="T">
import { UiButton, UiIcon, UiInput } from "../../index";
import { useTable } from "../../../composables";
import { Transition } from "vue";

const props = defineProps<{
  table: ReturnType<typeof useTable<T>>;
}>();
</script>
<template>
  <div class="relative">
    <UiInput
      v-model="props.table.search"
      placeholder="Search..."
      name="search"
      autocomplete="off"
    />

    <div class="absolute top-1/2 right-3 -translate-y-1/2 flex items-center">
      <Transition
        name="fade"
        mode="out-in"
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <UiButton
          v-if="table.search"
          key="clear"
          variant="link"
          size="icon-sm"
          class="size-4 p-0 text-destructive"
          @click="table.search = ''"
        >
          <UiIcon name="lucide:x" class="size-3.5" />
        </UiButton>
        <UiButton
          v-else
          key="not-clear"
          variant="link"
          size="icon-sm"
          class="size-4 p-0 pointer-events-none"
        >
          <UiIcon key="search" name="lucide:search" class="size-3.5" />
        </UiButton>
      </Transition>
    </div>
  </div>
</template>
