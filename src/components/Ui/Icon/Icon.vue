<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { computed } from "vue"

interface Props {
  /** Název ve formátu set:icon (např. mdi:home) nebo set-icon (mdi-home) */
  name: string
  /** 1em, 24, "2rem", … – pokud chceš raději tailwind třídy, ponech null  */
  size?: string | number | null
  class?: any
}

const props = withDefaults(defineProps<Props>(), {
  size: null,
  class: "",
})

/**
 * Iconify používá „set:icon“. Pokud uživatel napíše „mdi-home“, převedeme na „mdi:home“.
 */
const iconKeyAndClass = computed(() => {

  const key = props.name.includes(":") ? props.name : props.name.replace("-", ":");
  return key.split(".");
})
</script>

<template>
  <!--
    `ssr` renders the icon right away instead of after mount, so it is in the server HTML.
    Safe from hydration mismatches: bundled collections (see plugin/create.ts) resolve the
    same on both sides, and icons from elsewhere render empty on both until they load.
    Iconify declares its props untyped, so a bare `ssr` would arrive as "" (falsy).
  -->
  <Icon
    :ssr="true"
    :icon="iconKeyAndClass[0]"
    v-bind="
      props.size
        ? { width: props.size, height: props.size }
        : {}
    "
    :class="['inline-block', props.class, iconKeyAndClass[1] ? iconKeyAndClass[1] : '',]"
  />
</template>