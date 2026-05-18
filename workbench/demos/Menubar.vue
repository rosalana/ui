<script setup lang="ts">
import { ref } from "vue";
import UiMenubar from "../../src/components/Ui/Menubar/Menubar.vue";
import UiMenubarMenu from "../../src/components/Ui/Menubar/MenubarMenu.vue";
import UiMenubarTrigger from "../../src/components/Ui/Menubar/MenubarTrigger.vue";
import UiMenubarContent from "../../src/components/Ui/Menubar/MenubarContent.vue";
import UiMenubarItem from "../../src/components/Ui/Menubar/MenubarItem.vue";
import UiMenubarCheckboxItem from "../../src/components/Ui/Menubar/MenubarCheckboxItem.vue";
import UiMenubarRadioGroup from "../../src/components/Ui/Menubar/MenubarRadioGroup.vue";
import UiMenubarRadioItem from "../../src/components/Ui/Menubar/MenubarRadioItem.vue";
import UiMenubarLabel from "../../src/components/Ui/Menubar/MenubarLabel.vue";
import UiMenubarSeparator from "../../src/components/Ui/Menubar/MenubarSeparator.vue";
import UiMenubarShortcut from "../../src/components/Ui/Menubar/MenubarShortcut.vue";
import UiMenubarSub from "../../src/components/Ui/Menubar/MenubarSub.vue";
import UiMenubarSubTrigger from "../../src/components/Ui/Menubar/MenubarSubTrigger.vue";
import UiMenubarSubContent from "../../src/components/Ui/Menubar/MenubarSubContent.vue";
import Section from "workbench/components/Section.vue";

const showBookmarks = ref(true);
const showFullUrls = ref(false);
const zoom = ref("100");
const lastAction = ref("");
</script>

<template>
  <Section title="Application Menubar" class="w-96">
    <div
      class="rounded-xl border border-muted-200 dark:border-muted-800 overflow-hidden"
    >
      <div class="border-b border-muted-200 dark:border-muted-800 px-3">
        <UiMenubar class="border-none shadow-none rounded-none bg-transparent">
          <UiMenubarMenu>
            <UiMenubarTrigger>File</UiMenubarTrigger>
            <UiMenubarContent>
              <UiMenubarItem @select="lastAction = 'New Tab'">
                New Tab <UiMenubarShortcut>⌘T</UiMenubarShortcut>
              </UiMenubarItem>
              <UiMenubarItem @select="lastAction = 'New Window'">
                New Window <UiMenubarShortcut>⌘N</UiMenubarShortcut>
              </UiMenubarItem>
              <UiMenubarSeparator />
              <UiMenubarItem @select="lastAction = 'Share'">
                Share
              </UiMenubarItem>
              <UiMenubarSeparator />
              <UiMenubarItem @select="lastAction = 'Print'">
                Print <UiMenubarShortcut>⌘P</UiMenubarShortcut>
              </UiMenubarItem>
            </UiMenubarContent>
          </UiMenubarMenu>

          <UiMenubarMenu>
            <UiMenubarTrigger>Edit</UiMenubarTrigger>
            <UiMenubarContent>
              <UiMenubarItem @select="lastAction = 'Undo'">
                Undo <UiMenubarShortcut>⌘Z</UiMenubarShortcut>
              </UiMenubarItem>
              <UiMenubarItem @select="lastAction = 'Redo'">
                Redo <UiMenubarShortcut>⇧⌘Z</UiMenubarShortcut>
              </UiMenubarItem>
              <UiMenubarSeparator />
              <UiMenubarSub>
                <UiMenubarSubTrigger>Find</UiMenubarSubTrigger>
                <UiMenubarSubContent>
                  <UiMenubarItem @select="lastAction = 'Find...'">
                    Find... <UiMenubarShortcut>⌘F</UiMenubarShortcut>
                  </UiMenubarItem>
                  <UiMenubarItem @select="lastAction = 'Find Next'">
                    Find Next <UiMenubarShortcut>⌘G</UiMenubarShortcut>
                  </UiMenubarItem>
                  <UiMenubarItem @select="lastAction = 'Find Previous'">
                    Find Previous <UiMenubarShortcut>⇧⌘G</UiMenubarShortcut>
                  </UiMenubarItem>
                </UiMenubarSubContent>
              </UiMenubarSub>
              <UiMenubarSeparator />
              <UiMenubarItem @select="lastAction = 'Cut'">
                Cut <UiMenubarShortcut>⌘X</UiMenubarShortcut>
              </UiMenubarItem>
              <UiMenubarItem @select="lastAction = 'Copy'">
                Copy <UiMenubarShortcut>⌘C</UiMenubarShortcut>
              </UiMenubarItem>
              <UiMenubarItem @select="lastAction = 'Paste'">
                Paste <UiMenubarShortcut>⌘V</UiMenubarShortcut>
              </UiMenubarItem>
            </UiMenubarContent>
          </UiMenubarMenu>

          <UiMenubarMenu>
            <UiMenubarTrigger>View</UiMenubarTrigger>
            <UiMenubarContent>
              <UiMenubarCheckboxItem v-model:checked="showBookmarks">
                Show Bookmarks Bar
              </UiMenubarCheckboxItem>
              <UiMenubarCheckboxItem v-model:checked="showFullUrls">
                Show Full URLs
              </UiMenubarCheckboxItem>
              <UiMenubarSeparator />
              <UiMenubarLabel>Zoom</UiMenubarLabel>
              <UiMenubarRadioGroup v-model="zoom">
                <UiMenubarRadioItem value="75">75%</UiMenubarRadioItem>
                <UiMenubarRadioItem value="100">100%</UiMenubarRadioItem>
                <UiMenubarRadioItem value="125">125%</UiMenubarRadioItem>
                <UiMenubarRadioItem value="150">150%</UiMenubarRadioItem>
              </UiMenubarRadioGroup>
            </UiMenubarContent>
          </UiMenubarMenu>

          <UiMenubarMenu>
            <UiMenubarTrigger>Help</UiMenubarTrigger>
            <UiMenubarContent>
              <UiMenubarItem @select="lastAction = 'Documentation'"
                >Documentation</UiMenubarItem
              >
              <UiMenubarItem @select="lastAction = 'Release Notes'"
                >Release Notes</UiMenubarItem
              >
              <UiMenubarSeparator />
              <UiMenubarItem @select="lastAction = 'About'"
                >About Rosalana</UiMenubarItem
              >
            </UiMenubarContent>
          </UiMenubarMenu>
        </UiMenubar>
      </div>

      <div
        class="p-4 h-32 flex items-center justify-center text-sm text-theme bg-muted-50 dark:bg-muted-950"
      >
        <div class="text-center">
          <p>
            Zoom: <strong class="text-foreground">{{ zoom }}%</strong> ·
            Bookmarks:
            <strong class="text-foreground">{{
              showBookmarks ? "shown" : "hidden"
            }}</strong>
          </p>
          <p v-if="lastAction" class="mt-1">
            Last action:
            <strong class="text-foreground">{{ lastAction }}</strong>
          </p>
        </div>
      </div>
    </div>
  </Section>
</template>
