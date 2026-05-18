<script setup lang="ts">
import { ref } from "vue";
import Section from "workbench/components/Section.vue";
import FrameSelection from "../../src/components/Ui/FrameSelection/FrameSelection.vue";
import FrameSelectionItem from "../../src/components/Ui/FrameSelection/FrameSelectionItem.vue";
import { useSelect } from "../../src";

const items = ref(Array.from({ length: 24 }, (_, i) => i + 1));

const { selected, select, setSelected, clear, isSelected } =
  useSelect<number>(items);

const isFrameSelecting = ref(false);

const handleSelect = (selection: any) => {
  const { selectedKeys } = selection;

  const ii = items.value.filter((item) => selectedKeys.includes(String(item)));
  setSelected(ii);
};

const handleDeselect = () => {
  if (isFrameSelecting.value) return;
  clear();
};
</script>
<template>
  <FrameSelection
    @selecting="(ref) => (isFrameSelecting = ref)"
    @update:selection="handleSelect"
    @start:selection="clear"
  >
    <div class="min-h-screen" @click="handleDeselect">
      <Section title="Frame Selection">
        <div class="w-full grid grid-cols-8 gap-4">
          <template v-for="i in items" :key="i">
            <FrameSelectionItem :selection-key="i">
              <div
                class="w-24 h-24 rounded flex items-center justify-center select-none"
                :class="
                  isSelected(i)
                    ? 'bg-warning text-warning-foreground'
                    : 'bg-primary text-primary-foreground'
                "
              >
                Item {{ i }}
              </div>
            </FrameSelectionItem>
          </template>
        </div>
        <p v-if="isFrameSelecting" class="mt-4 text-red-500">Selecting...</p>
        <p class="mt-4">Selected Items: {{ selected }}</p>
      </Section>
    </div>
  </FrameSelection>
</template>
