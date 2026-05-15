<script setup lang="ts">
import { ref } from "vue";
import UiContextMenu from "../../src/components/Ui/ContextMenu/ContextMenu.vue";
import UiContextMenuTrigger from "../../src/components/Ui/ContextMenu/ContextMenuTrigger.vue";
import UiContextMenuContent from "../../src/components/Ui/ContextMenu/ContextMenuContent.vue";
import UiContextMenuItem from "../../src/components/Ui/ContextMenu/ContextMenuItem.vue";
import UiContextMenuCheckboxItem from "../../src/components/Ui/ContextMenu/ContextMenuCheckboxItem.vue";
import UiContextMenuRadioGroup from "../../src/components/Ui/ContextMenu/ContextMenuRadioGroup.vue";
import UiContextMenuRadioItem from "../../src/components/Ui/ContextMenu/ContextMenuRadioItem.vue";
import UiContextMenuLabel from "../../src/components/Ui/ContextMenu/ContextMenuLabel.vue";
import UiContextMenuSeparator from "../../src/components/Ui/ContextMenu/ContextMenuSeparator.vue";
import UiContextMenuShortcut from "../../src/components/Ui/ContextMenu/ContextMenuShortcut.vue";
import UiContextMenuSub from "../../src/components/Ui/ContextMenu/ContextMenuSub.vue";
import UiContextMenuSubTrigger from "../../src/components/Ui/ContextMenu/ContextMenuSubTrigger.vue";
import UiContextMenuSubContent from "../../src/components/Ui/ContextMenu/ContextMenuSubContent.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";

const showGrid = ref(true);
const sortBy = ref("name");
const lastAction = ref<string | null>(null);
</script>

<template>
  <div class="space-y-10 max-w-lg">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">File Manager</h2>
      <p class="text-xs text-theme mb-4">Right-click on the area below to open the context menu.</p>

      <UiContextMenu>
        <UiContextMenuTrigger>
          <div class="h-48 rounded-xl border-2 border-dashed border-muted-300 dark:border-muted-700 flex flex-col items-center justify-center gap-2 text-theme select-none cursor-context-menu hover:border-muted-400 dark:hover:border-muted-600 transition-colors">
            <UiIcon name="lucide:folder-open" class="size-8 text-muted-400" />
            <p class="text-sm">Right-click here</p>
            <p class="text-xs" v-if="lastAction">Last action: <strong class="text-foreground">{{ lastAction }}</strong></p>
          </div>
        </UiContextMenuTrigger>
        <UiContextMenuContent class="w-52">
          <UiContextMenuItem @click="lastAction = 'New File'">
            <UiIcon name="lucide:file-plus" />New File
            <UiContextMenuShortcut>⌘N</UiContextMenuShortcut>
          </UiContextMenuItem>
          <UiContextMenuItem @click="lastAction = 'New Folder'">
            <UiIcon name="lucide:folder-plus" />New Folder
          </UiContextMenuItem>
          <UiContextMenuSeparator />
          <UiContextMenuSub>
            <UiContextMenuSubTrigger>
              <UiIcon name="lucide:sort-asc" />Sort by
            </UiContextMenuSubTrigger>
            <UiContextMenuSubContent>
              <UiContextMenuRadioGroup v-model="sortBy">
                <UiContextMenuRadioItem value="name">Name</UiContextMenuRadioItem>
                <UiContextMenuRadioItem value="date">Date Modified</UiContextMenuRadioItem>
                <UiContextMenuRadioItem value="size">Size</UiContextMenuRadioItem>
                <UiContextMenuRadioItem value="type">Type</UiContextMenuRadioItem>
              </UiContextMenuRadioGroup>
            </UiContextMenuSubContent>
          </UiContextMenuSub>
          <UiContextMenuSeparator />
          <UiContextMenuLabel>View</UiContextMenuLabel>
          <UiContextMenuCheckboxItem v-model:checked="showGrid">
            Show Grid
          </UiContextMenuCheckboxItem>
          <UiContextMenuSeparator />
          <UiContextMenuItem @click="lastAction = 'Get Info'">
            <UiIcon name="lucide:info" />Get Info
            <UiContextMenuShortcut>⌘I</UiContextMenuShortcut>
          </UiContextMenuItem>
        </UiContextMenuContent>
      </UiContextMenu>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Text Editor</h2>
      <p class="text-xs text-theme mb-4">Right-click on the text below.</p>
      <UiContextMenu>
        <UiContextMenuTrigger>
          <p class="text-sm p-4 rounded-xl border border-muted-200 dark:border-muted-800 leading-relaxed select-text cursor-context-menu">
            The quick brown fox jumps over the lazy dog. This is a sample text that you can right-click to see context menu options for text editing operations.
          </p>
        </UiContextMenuTrigger>
        <UiContextMenuContent class="w-44">
          <UiContextMenuItem @click="lastAction = 'Cut'">
            <UiIcon name="lucide:scissors" />Cut
            <UiContextMenuShortcut>⌘X</UiContextMenuShortcut>
          </UiContextMenuItem>
          <UiContextMenuItem @click="lastAction = 'Copy'">
            <UiIcon name="lucide:copy" />Copy
            <UiContextMenuShortcut>⌘C</UiContextMenuShortcut>
          </UiContextMenuItem>
          <UiContextMenuItem @click="lastAction = 'Paste'">
            <UiIcon name="lucide:clipboard" />Paste
            <UiContextMenuShortcut>⌘V</UiContextMenuShortcut>
          </UiContextMenuItem>
          <UiContextMenuSeparator />
          <UiContextMenuItem @click="lastAction = 'Select All'">
            Select All
            <UiContextMenuShortcut>⌘A</UiContextMenuShortcut>
          </UiContextMenuItem>
        </UiContextMenuContent>
      </UiContextMenu>
    </section>
  </div>
</template>
