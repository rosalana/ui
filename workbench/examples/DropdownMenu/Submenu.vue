<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiDropdownMenu,
  UiDropdownMenuContent,
  UiDropdownMenuItem,
  UiDropdownMenuSeparator,
  UiDropdownMenuSub,
  UiDropdownMenuSubContent,
  UiDropdownMenuSubTrigger,
  UiDropdownMenuTrigger,
  UiIcon,
} from "@rosalana/ui";

const lastAction = ref("Nothing shared yet");
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline" aria-label="Team actions">
          <UiIcon name="lucide:ellipsis" />
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-56" align="start">
        <UiDropdownMenuItem @select="lastAction = 'Invite link copied'">
          <UiIcon name="lucide:link" />
          Copy invite link
        </UiDropdownMenuItem>
        <UiDropdownMenuSub>
          <UiDropdownMenuSubTrigger>
            <UiIcon name="lucide:share-2" />
            Share roster
          </UiDropdownMenuSubTrigger>
          <UiDropdownMenuSubContent>
            <UiDropdownMenuItem @select="lastAction = 'Roster sent by email'">
              By email
            </UiDropdownMenuItem>
            <UiDropdownMenuItem @select="lastAction = 'Roster exported to PDF'">
              Export as PDF
            </UiDropdownMenuItem>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem @select="lastAction = 'Public page opened'">
              Open public page
            </UiDropdownMenuItem>
          </UiDropdownMenuSubContent>
        </UiDropdownMenuSub>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
    <p class="text-sm text-theme">{{ lastAction }}</p>
  </div>
</template>
