<script setup lang="ts">
import { computed, ref } from "vue";
import UiCombobox from "../../src/components/Ui/Combobox/Combobox.vue";
import UiComboboxInput from "../../src/components/Ui/Combobox/ComboboxInput.vue";
import UiComboboxContent from "../../src/components/Ui/Combobox/ComboboxContent.vue";
import UiComboboxItem from "../../src/components/Ui/Combobox/ComboboxItem.vue";
import UiComboboxEmpty from "../../src/components/Ui/Combobox/ComboboxEmpty.vue";
import type { ComboboxItem, ComboboxItems } from "../../src/components/Ui/Combobox/context";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import Section from "workbench/components/Section.vue";

const countries: ComboboxItem[] = [
  { value: "cz", label: "Česko", shortcut: "CZ", keywords: ["cz"] },
  { value: "sk", label: "Slovensko", shortcut: "SK", keywords: ["sk"] },
  { value: "de", label: "Německo", shortcut: "DE", keywords: ["de"] },
  { value: "at", label: "Rakousko", shortcut: "AT", keywords: ["at"] },
  { value: "pl", label: "Polsko", shortcut: "PL", keywords: ["pl"] },
  { value: "hu", label: "Maďarsko", shortcut: "HU", keywords: ["hu"], disabled: true },
  { value: "fr", label: "Francie", shortcut: "FR", keywords: ["fr"] },
  { value: "it", label: "Itálie", shortcut: "IT", keywords: ["it"] },
  { value: "es", label: "Španělsko", shortcut: "ES", keywords: ["es"] },
  { value: "gb", label: "Velká Británie", shortcut: "GB", keywords: ["gb", "uk", "anglie"] },
];

// Prefilled, like a form opened for editing: the label shows before the list is ever opened
const country = ref<string | undefined>("es");
const showRemounted = ref(true);
const remounted = ref<string | undefined>("de");
const prefix = ref<string>();
const custom = ref<string>();

const frameworks: ComboboxItems = [
  {
    heading: "Frontend",
    items: [
      { value: "vue", label: "Vue", icon: "logos:vue", shortcut: "⌘V" },
      { value: "react", label: "React", icon: "logos:react" },
      { value: "svelte", label: "Svelte", icon: "logos:svelte-icon" },
      { value: "angular", label: "Angular", icon: "logos:angular-icon", disabled: true },
    ],
  },
  {
    heading: "Backend",
    items: [
      { value: "laravel", label: "Laravel", icon: "logos:laravel", shortcut: "⌘L" },
      { value: "rails", label: "Rails", icon: "logos:rails" },
      { value: "django", label: "Django", icon: "logos:django-icon" },
    ],
  },
];
const framework = ref<string>();

// Server-side search: a fake endpoint that takes a while and honours the abort signal
type User = { id: number; name: string; email: string };
const allUsers: User[] = [
  "Anna Nováková", "Jan Svoboda", "Petr Dvořák", "Eva Černá", "Tomáš Procházka",
  "Lucie Kučerová", "Martin Veselý", "Kateřina Horáková", "Jakub Němec", "Tereza Marková",
  "Ondřej Pokorný", "Veronika Pospíšilová", "Lukáš Hájek", "Barbora Králová", "David Jelínek",
].map((name, index) => ({
  id: index + 1,
  name,
  email: `${name.split(" ")[0].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")}@example.com`,
}));

// The form holds just the id. The picked person goes in as the first results, so their name
// shows right away, before any search ran.
const userId = ref<number | undefined>(3);
const users = ref<User[]>(allUsers.filter((u) => u.id === userId.value));
const requests = ref(0);

/** Extra keys ride along with the option and come back typed in the `item` slot. */
type UserItem = ComboboxItem & { email: string; initials: string };
const userItems = computed<UserItem[]>(() =>
  users.value.map((u) => ({
    value: u.id,
    label: u.name,
    email: u.email,
    initials: u.name.split(" ").map((part) => part[0]).join(""),
  })),
);

function fakeFetch(search: string, signal: AbortSignal) {
  return new Promise<User[]>((resolve, reject) => {
    const timer = setTimeout(() => {
      const term = search.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      resolve(
        allUsers
          .filter((u) => u.name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(term))
          .slice(0, 6),
      );
    }, 700);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

async function searchUsers(search: string, signal: AbortSignal) {
  requests.value++;
  users.value = await fakeFetch(search, signal);
}
</script>

<template>
  <Section title="Basic" class="w-72">
    <div class="space-y-1.5">
      <UiLabel for="country">Country</UiLabel>
      <UiCombobox id="country" v-model="country" :items="countries" placeholder="Pick a country..." clearable />
      <p class="text-xs text-theme">
        Value: <code class="text-foreground">{{ country ?? "–" }}</code>. Prefilled, the name shows
        without opening. Try "cesko", "SPAN" or the code "uk". Maďarsko is disabled.
      </p>
    </div>
  </Section>

  <Section title="Groups, icons and shortcuts" class="w-72">
    <UiCombobox v-model="framework" :items="frameworks" icon="lucide:search" placeholder="Framework..." />
  </Section>

  <Section title="Remounted and set from outside" class="w-72">
    <div class="space-y-3">
      <UiCombobox v-if="showRemounted" v-model="remounted" :items="countries" />
      <div class="flex flex-wrap gap-2">
        <UiButton size="xs" variant="outline" @click="showRemounted = !showRemounted">
          {{ showRemounted ? "Unmount" : "Mount again" }}
        </UiButton>
        <UiButton v-for="code in ['cz', 'fr', 'gb']" :key="code" size="xs" variant="outline" @click="remounted = code">
          Set "{{ code }}"
        </UiButton>
      </div>
    </div>
  </Section>

  <Section title="Filter modes" class="w-72">
    <div class="space-y-1.5">
      <UiLabel>filter="startsWith"</UiLabel>
      <UiCombobox v-model="prefix" :items="countries" filter="startsWith" />
    </div>
  </Section>

  <Section title="Server-side search, custom option look" class="w-80">
    <div class="space-y-1.5">
      <UiLabel>Assignee</UiLabel>
      <UiCombobox
        v-model="userId"
        :items="userItems"
        :search="searchUsers"
        icon="lucide:user"
        placeholder="Search people..."
        clearable
      >
        <template #item="{ item }">
          <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
            {{ item.initials }}
          </span>
          <div class="flex min-w-0 flex-col">
            <span class="truncate">{{ item.label }}</span>
            <span class="truncate text-xs text-theme">{{ item.email }}</span>
          </div>
        </template>
        <template #empty>Nobody by that name.</template>
      </UiCombobox>
      <p class="text-xs text-theme">
        Picked id: <code class="text-foreground">{{ userId ?? "–" }}</code> · requests sent:
        {{ requests }} (debounced, the older one is aborted)
      </p>
    </div>
  </Section>

  <Section title="Fully custom structure" class="w-72">
    <!-- Every part is a slot: here the list is built by hand from the filtered options -->
    <UiCombobox v-model="custom" :items="countries">
      <template #default="{ options }">
        <UiComboboxInput icon="lucide:globe" placeholder="Custom layout..." />
        <UiComboboxContent>
          <UiComboboxEmpty />
          <p class="px-2.5 pb-1 text-xs text-theme">{{ options.length }} countries</p>
          <UiComboboxItem v-for="item in options" :key="String(item.value)" :item="item" class="font-medium" />
        </UiComboboxContent>
      </template>
    </UiCombobox>
  </Section>

  <Section title="Disabled" class="w-72">
    <UiCombobox disabled default-value="cz" :items="countries" />
  </Section>
</template>
