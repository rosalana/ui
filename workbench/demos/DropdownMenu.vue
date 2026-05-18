<script setup lang="ts">
import { ref } from "vue";
import UiDropdownMenu from "../../src/components/Ui/DropdownMenu/DropdownMenu.vue";
import UiDropdownMenuTrigger from "../../src/components/Ui/DropdownMenu/DropdownMenuTrigger.vue";
import UiDropdownMenuContent from "../../src/components/Ui/DropdownMenu/DropdownMenuContent.vue";
import UiDropdownMenuItem from "../../src/components/Ui/DropdownMenu/DropdownMenuItem.vue";
import UiDropdownMenuCheckboxItem from "../../src/components/Ui/DropdownMenu/DropdownMenuCheckboxItem.vue";
import UiDropdownMenuRadioGroup from "../../src/components/Ui/DropdownMenu/DropdownMenuRadioGroup.vue";
import UiDropdownMenuRadioItem from "../../src/components/Ui/DropdownMenu/DropdownMenuRadioItem.vue";
import UiDropdownMenuLabel from "../../src/components/Ui/DropdownMenu/DropdownMenuLabel.vue";
import UiDropdownMenuSeparator from "../../src/components/Ui/DropdownMenu/DropdownMenuSeparator.vue";
import UiDropdownMenuShortcut from "../../src/components/Ui/DropdownMenu/DropdownMenuShortcut.vue";
import UiDropdownMenuSub from "../../src/components/Ui/DropdownMenu/DropdownMenuSub.vue";
import UiDropdownMenuSubTrigger from "../../src/components/Ui/DropdownMenu/DropdownMenuSubTrigger.vue";
import UiDropdownMenuSubContent from "../../src/components/Ui/DropdownMenu/DropdownMenuSubContent.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";
import Section from "workbench/components/Section.vue";

const showStatus = ref(true);
const showAvatar = ref(false);
const position = ref("bottom");
</script>

<template>
  <Section title="Basic Menu" class="w-48">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">
          Open Menu
          <UiIcon name="lucide:chevron-down" />
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-48">
        <UiDropdownMenuItem>
          <UiIcon name="lucide:user" />
          Profile
        </UiDropdownMenuItem>
        <UiDropdownMenuItem>
          <UiIcon name="lucide:settings" />
          Settings
          <UiDropdownMenuShortcut>⌘S</UiDropdownMenuShortcut>
        </UiDropdownMenuItem>
        <UiDropdownMenuItem>
          <UiIcon name="lucide:bell" />
          Notifications
        </UiDropdownMenuItem>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem class="text-destructive focus:text-destructive">
          <UiIcon name="lucide:log-out" />
          Log out
          <UiDropdownMenuShortcut>⌘Q</UiDropdownMenuShortcut>
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </Section>

  <Section title="With Checkboxes" class="w-48">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">View Options</UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-52">
        <UiDropdownMenuLabel>Appearance</UiDropdownMenuLabel>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuCheckboxItem v-model:checked="showStatus">
          Show Status
        </UiDropdownMenuCheckboxItem>
        <UiDropdownMenuCheckboxItem v-model:checked="showAvatar">
          Show Avatar
        </UiDropdownMenuCheckboxItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </Section>

  <Section title="With Radio Group" class="w-48">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">Panel Position: {{ position }}</UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-48">
        <UiDropdownMenuLabel>Position</UiDropdownMenuLabel>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuRadioGroup v-model="position">
          <UiDropdownMenuRadioItem value="top">Top</UiDropdownMenuRadioItem>
          <UiDropdownMenuRadioItem value="bottom"
            >Bottom</UiDropdownMenuRadioItem
          >
          <UiDropdownMenuRadioItem value="right">Right</UiDropdownMenuRadioItem>
        </UiDropdownMenuRadioGroup>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </Section>

  <Section title="With Submenu" class="w-48">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton>
          <UiIcon name="lucide:more-horizontal" />
          More Actions
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-52">
        <UiDropdownMenuItem
          ><UiIcon name="lucide:edit" />Edit</UiDropdownMenuItem
        >
        <UiDropdownMenuItem
          ><UiIcon name="lucide:copy" />Duplicate</UiDropdownMenuItem
        >
        <UiDropdownMenuSub>
          <UiDropdownMenuSubTrigger>
            <UiIcon name="lucide:share-2" />Share
          </UiDropdownMenuSubTrigger>
          <UiDropdownMenuSubContent>
            <UiDropdownMenuItem
              ><UiIcon name="lucide:link" />Copy Link</UiDropdownMenuItem
            >
            <UiDropdownMenuItem
              ><UiIcon name="lucide:mail" />Email</UiDropdownMenuItem
            >
            <UiDropdownMenuItem
              ><UiIcon name="mdi:twitter" />Twitter</UiDropdownMenuItem
            >
          </UiDropdownMenuSubContent>
        </UiDropdownMenuSub>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem class="text-destructive focus:text-destructive">
          <UiIcon name="lucide:trash-2" />Delete
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </Section>
</template>
