<script setup lang="ts">
import { ref } from "vue";
import UiPagination from "../../src/components/Ui/Pagination/Pagination.vue";
import UiPaginationList from "../../src/components/Ui/Pagination/PaginationList.vue";
import UiPaginationListItem from "../../src/components/Ui/Pagination/PaginationListItem.vue";
import UiPaginationFirst from "../../src/components/Ui/Pagination/PaginationFirst.vue";
import UiPaginationPrev from "../../src/components/Ui/Pagination/PaginationPrev.vue";
import UiPaginationNext from "../../src/components/Ui/Pagination/PaginationNext.vue";
import UiPaginationLast from "../../src/components/Ui/Pagination/PaginationLast.vue";
import UiPaginationEllipsis from "../../src/components/Ui/Pagination/PaginationEllipsis.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import Section from "workbench/components/Section.vue";

const page = ref(1);
const page2 = ref(5);
</script>

<template>
  <Section title="Basic Pagination" class="w-96">
    <div class="space-y-2">
      <p class="text-xs text-theme">
        Current page: <strong class="text-foreground">{{ page }}</strong>
      </p>
      <UiPagination
        v-model:page="page"
        :total="100"
        :items-per-page="10"
        :sibling-count="1"
        show-edges
      >
        <UiPaginationList v-slot="{ items }">
          <UiPaginationFirst />
          <UiPaginationPrev />
          <template
            v-for="item in items"
            :key="item.type === 'page' ? item.value : item.type"
          >
            <UiPaginationListItem
              v-if="item.type === 'page'"
              :value="item.value"
              as-child
            >
              <UiButton
                :variant="item.value === page ? 'default' : 'outline'"
                size="icon-sm"
              >
                {{ item.value }}
              </UiButton>
            </UiPaginationListItem>
            <UiPaginationEllipsis v-else :key="item.type" :index="item.index" />
          </template>
          <UiPaginationNext />
          <UiPaginationLast />
        </UiPaginationList>
      </UiPagination>
    </div>
  </Section>

  <Section title="More Siblings" class="w-96">
    <div class="space-y-2">
      <p class="text-xs text-theme">
        Page: <strong class="text-foreground">{{ page2 }}</strong> of 20
      </p>
      <UiPagination
        v-model:page="page2"
        :total="200"
        :items-per-page="10"
        :sibling-count="2"
        show-edges
      >
        <UiPaginationList v-slot="{ items }">
          <UiPaginationFirst />
          <UiPaginationPrev />
          <template
            v-for="item in items"
            :key="item.type === 'page' ? item.value : item.type"
          >
            <UiPaginationListItem
              v-if="item.type === 'page'"
              :value="item.value"
              as-child
            >
              <UiButton
                :variant="item.value === page2 ? 'default' : 'ghost'"
                size="icon-sm"
              >
                {{ item.value }}
              </UiButton>
            </UiPaginationListItem>
            <UiPaginationEllipsis v-else :key="item.type" :index="item.index" />
          </template>
          <UiPaginationNext />
          <UiPaginationLast />
        </UiPaginationList>
      </UiPagination>
    </div>
  </Section>

  <Section title="Simple Prev/Next" class="w-96">
    <div class="flex items-center gap-3">
      <UiButton
        variant="outline"
        size="sm"
        :disabled="page <= 1"
        @click="page = Math.max(1, page - 1)"
      >
        Previous
      </UiButton>
      <span class="text-sm text-theme">Page {{ page }} of 10</span>
      <UiButton
        variant="outline"
        size="sm"
        :disabled="page >= 10"
        @click="page = Math.min(10, page + 1)"
      >
        Next
      </UiButton>
    </div>
  </Section>
</template>
