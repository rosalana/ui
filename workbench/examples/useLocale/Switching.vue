<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { UiButton, UiInput, useLocale } from "@rosalana/ui";
import { plural } from "@rosalana/ui/helpers";

const { locale, language, t, set } = useLocale();

const original = locale.value;
const players = ref(3);

// Texts that are not in the catalog depend on the app locale too.
const roster = () =>
  `${players.value} ${plural(players.value, {
    one: language.value === "cs" ? "hráč" : "player",
    few: "hráči",
    other: language.value === "cs" ? "hráčů" : "players",
  })}`;

function add() {
  players.value++;
}

onBeforeUnmount(() => set(original));
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div class="flex gap-2">
      <UiButton size="sm" :variant="language === 'en' ? 'default' : 'outline'" @click="set('en')">
        English
      </UiButton>
      <UiButton size="sm" :variant="language === 'cs' ? 'default' : 'outline'" @click="set('cs_CZ')">
        Čeština
      </UiButton>
    </div>
    <UiInput :placeholder="t('table.search')" :aria-label="t('table.search')" />
    <p class="text-sm text-theme">{{ t("table.empty") }}</p>
    <div class="flex items-center justify-between gap-4">
      <span class="text-sm">Roster: {{ roster() }}</span>
      <UiButton size="sm" variant="outline" @click="add">Add player</UiButton>
    </div>
    <p class="text-sm text-theme">
      {{ new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(new Date(2026, 4, 9)) }}
    </p>
  </div>
</template>
