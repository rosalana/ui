<script setup lang="ts">
import { useLocale } from "../../../composables/useLocale";
import { tv , type ClassValue } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const paginationEllipsis = tv({
  base: "flex size-9 items-center justify-center",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();

const { t } = useLocale();
</script>

<template>
  <span
    data-slot="pagination-ellipsis"
    aria-hidden
    :class="[paginationEllipsis({ class: props.class })]"
  >
    <UiIcon name="lucide:more-horizontal" class="size-4" />
    <span class="sr-only">{{ t('pagination.more') }}</span>
  </span>
</template>
