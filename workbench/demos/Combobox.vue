<script setup lang="ts">
import { ref } from "vue";
import UiCombobox from "../../src/components/Ui/Combobox/Combobox.vue";
import UiComboboxInput from "../../src/components/Ui/Combobox/ComboboxInput.vue";
import UiComboboxContent from "../../src/components/Ui/Combobox/ComboboxContent.vue";
import UiComboboxItem from "../../src/components/Ui/Combobox/ComboboxItem.vue";
import UiComboboxGroup from "../../src/components/Ui/Combobox/ComboboxGroup.vue";
import UiComboboxSeparator from "../../src/components/Ui/Combobox/ComboboxSeparator.vue";
import UiComboboxEmpty from "../../src/components/Ui/Combobox/ComboboxEmpty.vue";
import UiComboboxLoading from "../../src/components/Ui/Combobox/ComboboxLoading.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";
import Section from "workbench/components/Section.vue";

const countries = [
  { code: "cz", name: "Česko" },
  { code: "sk", name: "Slovensko" },
  { code: "de", name: "Německo" },
  { code: "at", name: "Rakousko" },
  { code: "pl", name: "Polsko" },
  { code: "hu", name: "Maďarsko" },
  { code: "fr", name: "Francie" },
  { code: "it", name: "Itálie" },
  { code: "es", name: "Španělsko" },
  { code: "gb", name: "Velká Británie" },
];

const country = ref<string>();
const framework = ref<string>();
const prefix = ref<string>();
const custom = ref<string>();

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

const user = ref<User>();
const users = ref<User[]>([]);
const requests = ref(0);

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
  <Section title="Basic (client-side filter)" class="w-72">
    <div class="space-y-1.5">
      <UiLabel>Country</UiLabel>
      <UiCombobox v-model="country">
        <UiComboboxInput placeholder="Pick a country..." clearable />
        <UiComboboxContent>
          <UiComboboxEmpty />
          <UiComboboxItem v-for="item in countries" :key="item.code" :value="item.code">
            {{ item.name }}
          </UiComboboxItem>
        </UiComboboxContent>
      </UiCombobox>
      <p class="text-xs text-theme">
        Value: <code class="text-foreground">{{ country ?? "–" }}</code>. Try "cesko" or "SPAN" — case
        and accents don't matter.
      </p>
    </div>
  </Section>

  <Section title="Groups and icons" class="w-72">
    <UiCombobox v-model="framework">
      <UiComboboxInput icon="lucide:search" placeholder="Framework..." />
      <UiComboboxContent>
        <UiComboboxEmpty>No framework matches.</UiComboboxEmpty>
        <UiComboboxGroup heading="Frontend">
          <UiComboboxItem value="vue"><UiIcon name="logos:vue" />Vue</UiComboboxItem>
          <UiComboboxItem value="react"><UiIcon name="logos:react" />React</UiComboboxItem>
          <UiComboboxItem value="svelte"><UiIcon name="logos:svelte-icon" />Svelte</UiComboboxItem>
          <UiComboboxItem value="angular" disabled><UiIcon name="logos:angular-icon" />Angular (disabled)</UiComboboxItem>
        </UiComboboxGroup>
        <UiComboboxSeparator />
        <UiComboboxGroup heading="Backend">
          <UiComboboxItem value="laravel"><UiIcon name="logos:laravel" />Laravel</UiComboboxItem>
          <UiComboboxItem value="rails"><UiIcon name="logos:rails" />Rails</UiComboboxItem>
          <UiComboboxItem value="django"><UiIcon name="logos:django-icon" />Django</UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>
  </Section>

  <Section title="Filter modes" class="w-72">
    <div class="space-y-4">
      <div class="space-y-1.5">
        <UiLabel>filter="startsWith"</UiLabel>
        <UiCombobox v-model="prefix" filter="startsWith">
          <UiComboboxInput />
          <UiComboboxContent>
            <UiComboboxEmpty />
            <UiComboboxItem v-for="item in countries" :key="item.code" :value="item.code">
              {{ item.name }}
            </UiComboboxItem>
          </UiComboboxContent>
        </UiCombobox>
      </div>
      <div class="space-y-1.5">
        <UiLabel>Own function: matches the code too</UiLabel>
        <UiCombobox
          v-model="custom"
          :filter="(text, search) => text.toLowerCase().includes(search.toLowerCase())"
        >
          <UiComboboxInput placeholder="Name or code..." />
          <UiComboboxContent>
            <UiComboboxEmpty />
            <UiComboboxItem
              v-for="item in countries"
              :key="item.code"
              :value="item.code"
              :text-value="`${item.name} ${item.code}`"
            >
              {{ item.name }}
              <span class="ml-auto text-xs uppercase text-theme">{{ item.code }}</span>
            </UiComboboxItem>
          </UiComboboxContent>
        </UiCombobox>
      </div>
    </div>
  </Section>

  <Section title="Server-side search" class="w-80">
    <div class="space-y-1.5">
      <UiLabel>Assignee</UiLabel>
      <UiCombobox v-model="user" :search="searchUsers" by="id">
        <UiComboboxInput
          icon="lucide:user"
          placeholder="Search people..."
          :display-value="(u) => (u as User | undefined)?.name ?? ''"
          clearable
        />
        <UiComboboxContent>
          <UiComboboxLoading />
          <UiComboboxEmpty />
          <UiComboboxItem v-for="item in users" :key="item.id" :value="item">
            <div class="flex flex-col">
              <span>{{ item.name }}</span>
              <span class="text-xs text-theme">{{ item.email }}</span>
            </div>
          </UiComboboxItem>
        </UiComboboxContent>
      </UiCombobox>
      <p class="text-xs text-theme">
        Picked: <code class="text-foreground">{{ user?.email ?? "–" }}</code> · requests sent:
        {{ requests }} (debounced, the older one is aborted)
      </p>
    </div>
  </Section>

  <Section title="Disabled" class="w-72">
    <!-- A value set before the list was ever open has no label yet, display-value supplies it -->
    <UiCombobox disabled default-value="cz">
      <UiComboboxInput :display-value="(code) => countries.find((c) => c.code === code)?.name ?? ''" />
      <UiComboboxContent>
        <UiComboboxItem value="cz">Česko</UiComboboxItem>
      </UiComboboxContent>
    </UiCombobox>
  </Section>
</template>
