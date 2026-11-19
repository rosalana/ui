<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import { Dump } from "@rosalana/ui";

const page = usePage();
</script>

<template>
  <!-- Development only: page props can hold data that must never be shown. -->
  <Dump :dump="page.props" title="Page props" :auto-collapse="1" />
</template>
