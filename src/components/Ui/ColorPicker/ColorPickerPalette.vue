<script setup lang="ts">
import { UiButton } from "../..";
import { colorFamilies } from "./palettes";
import {
  parseColor,
  rgbaToHsva,
  type HSVA,
} from "../../../composables/useColorConverter";

const props = defineProps<{
  modelValue: HSVA;
}>();

const emit = defineEmits(["update:modelValue"]);

const handleSelect = (color: string) => {
  const parsed = parseColor(color);
  if (!parsed) return;
  const hsva = rgbaToHsva(parsed);
  emit("update:modelValue", hsva);
};
</script>
<template>
  <div class="flex shrink-0 flex-col">
    <p
      class="shrink-0 border-b border-border px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
    >
      Palettes
    </p>
    <div class="flex-1 p-2">
      <div class="hide-scrollbar h-full overflow-y-auto max-h-70 divide-y">
        <div v-for="family in colorFamilies" :key="family.name">
          <div class="flex gap-0.5 my-1.5">
            <UiButton
              v-for="shade in family.shades"
              :key="shade.shade"
              type="button"
              variant="outline"
              size="icon-sm"
              class="size-4.5 flex rounded-sm hover:scale-115"
              :class="`[shadow-color:${shade.value}] shadow-lg`"
              :title="`${family.name}-${shade.shade}`"
              :style="{ background: shade.value }"
              @click="() => handleSelect(shade.value)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
