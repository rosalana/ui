<script setup lang="ts">
import { computed, ref } from "vue";
import { UiCheckbox, UiLabel } from "@rosalana/ui";

const notifications = ref([
  { id: "matches", label: "Match reminders", checked: true },
  { id: "results", label: "Results and standings", checked: false },
  { id: "news", label: "Club news", checked: false },
]);

// "indeterminate" when only some of the options are selected.
const all = computed<boolean | "indeterminate">({
  get() {
    const count = notifications.value.filter((n) => n.checked).length;
    if (count === 0) return false;
    return count === notifications.value.length ? true : "indeterminate";
  },
  set(value) {
    notifications.value.forEach((n) => (n.checked = value === true));
  },
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <UiCheckbox id="all" v-model="all" />
      <UiLabel for="all">All notifications</UiLabel>
    </div>
    <div class="ml-6 flex flex-col gap-3">
      <div v-for="item in notifications" :key="item.id" class="flex items-center gap-2">
        <UiCheckbox :id="item.id" v-model="item.checked" />
        <UiLabel :for="item.id">{{ item.label }}</UiLabel>
      </div>
    </div>
  </div>
</template>
