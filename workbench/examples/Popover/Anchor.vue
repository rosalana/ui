<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiIcon,
  UiInput,
  UiPopover,
  UiPopoverAnchor,
  UiPopoverContent,
  UiPopoverTrigger,
} from "@rosalana/ui";

const email = ref("");
</script>

<template>
  <UiPopover>
    <UiPopoverAnchor as-child>
      <div class="flex w-full max-w-sm items-center gap-2">
        <UiInput v-model="email" type="email" placeholder="captain@team.com" aria-label="Captain email" />
        <UiPopoverTrigger as-child>
          <UiButton variant="outline" size="icon" aria-label="Why we ask">
            <UiIcon name="lucide:circle-help" />
          </UiButton>
        </UiPopoverTrigger>
      </div>
    </UiPopoverAnchor>
    <UiPopoverContent align="start" class="p-4 text-sm">
      We send the match schedule and check-in reminders to the captain. The panel is
      anchored to the whole field, not just to the button that opens it.
    </UiPopoverContent>
  </UiPopover>
</template>
