<script setup lang="ts">
import {
  UiTable,
  UiTableHeader,
  UiTableBody,
  UiTableRow,
  UiTableHead,
  UiTableCell,
} from "@rosalana/ui";
import type { ComponentApi } from "../docs/types";
import SourceCode from "./SourceCode.vue";
import InlineText from "./InlineText.vue";
import { useDocsLocale } from "../docs/locale";
defineProps<{ component: ComponentApi }>();
const { t } = useDocsLocale();
</script>
<template>
  <div class="api-body">
    <p class="api-file">{{ component.file }}</p>
    <SourceCode :file="component.file" />
    <UiTable v-if="component.props.length" class="api-table">
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead>{{ t("property") }}</UiTableHead>
          <UiTableHead>{{ t("type") }}</UiTableHead>
          <UiTableHead>{{ t("default") }}</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow v-for="prop in component.props" :key="prop.name">
          <UiTableCell>
            <code>{{ prop.name }}</code>
            <small :class="!prop.optional && 'required'">
              {{ prop.optional ? t("optional") : t("required") }}
            </small>
          </UiTableCell>
          <UiTableCell>
            <code>{{ prop.type }}</code>
            <p v-if="prop.description">
              <InlineText :text="prop.description" />
            </p>
          </UiTableCell>
          <UiTableCell>
            <code>{{ prop.default ?? "—" }}</code>
          </UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
    <p v-else class="doc-muted">{{ t("noProps") }}</p>
    <template v-if="component.models.length">
      <h4>{{ t("models") }}</h4>
      <dl class="api-list">
        <template v-for="model in component.models" :key="model.name">
          <dt>
            <code>
              v-model{{ model.name === "modelValue" ? "" : ":" + model.name }}
            </code>
          </dt>
          <dd>
            <code>{{ model.type }}</code>
          </dd>
        </template>
      </dl>
    </template>
    <template v-if="component.events.length">
      <h4>{{ t("events") }}</h4>
      <dl class="api-list">
        <template v-for="event in component.events" :key="event.name">
          <dt>
            <code>{{ event.name }}</code>
          </dt>
          <dd>
            <code>{{ event.type }}</code>
            <p v-if="event.description">
              <InlineText :text="event.description" />
            </p>
          </dd>
        </template>
      </dl>
    </template>
    <template v-if="component.exposed.length">
      <h4>{{ t("exposed") }}</h4>
      <dl class="api-list">
        <template v-for="member in component.exposed" :key="member.name">
          <dt>
            <code>{{ member.name }}</code>
          </dt>
          <dd>
            <code>{{ member.type }}</code>
          </dd>
        </template>
      </dl>
    </template>
    <template v-if="component.slotProps.length">
      <h4>{{ t("slots") }}</h4>
      <dl class="api-list">
        <template v-for="slot in component.slotProps" :key="slot.name">
          <dt>
            <code>#{{ slot.name }}</code>
          </dt>
          <dd>
            <code>{{ slot.type }}</code>
          </dd>
        </template>
      </dl>
    </template>
    <template v-else-if="component.slots.length">
      <h4>{{ t("slots") }}</h4>
      <div class="api-tags">
        <code v-for="slot in component.slots" :key="slot">#{{ slot }}</code>
      </div>
    </template>
    <template v-if="Object.keys(component.variants).length">
      <h4>{{ t("variants") }}</h4>
      <dl class="api-list">
        <template
          v-for="(values, variant) in component.variants"
          :key="variant"
        >
          <dt>
            <code>{{ variant }}</code>
          </dt>
          <dd>{{ values.join(" · ") }}</dd>
        </template>
      </dl>
    </template>
  </div>
</template>
