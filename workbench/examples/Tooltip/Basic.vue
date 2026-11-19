<script setup lang="ts">
import {
  UiButton,
  UiIcon,
  UiTooltip,
  UiTooltipContent,
  UiTooltipTrigger,
} from "@rosalana/ui";
</script>

<template>
  <div class="flex items-center gap-2">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton variant="outline" size="icon" aria-label="Share bracket">
          <UiIcon name="lucide:share-2" />
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent>Share bracket</UiTooltipContent>
    </UiTooltip>

    <UiTooltip :delay-duration="0">
      <UiTooltipTrigger as-child>
        <UiButton variant="outline" size="icon" aria-label="Print schedule">
          <UiIcon name="lucide:printer" />
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent side="bottom">Print schedule (no delay)</UiTooltipContent>
    </UiTooltip>

    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton variant="outline" size="icon" aria-label="Teams">
          <UiIcon name="lucide:users" />
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent side="right">12 teams registered</UiTooltipContent>
    </UiTooltip>
  </div>
</template>
