<script setup lang="ts">
import UiTooltip from "../../src/components/Ui/Tooltip/Tooltip.vue";
import UiTooltipTrigger from "../../src/components/Ui/Tooltip/TooltipTrigger.vue";
import UiTooltipContent from "../../src/components/Ui/Tooltip/TooltipContent.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";
import Section from "workbench/components/Section.vue";
</script>

<template>
  <Section title="Basic">
    <div class="flex flex-wrap gap-4">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton variant="outline">Hover me</UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>This is a tooltip</UiTooltipContent>
      </UiTooltip>

      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton size="icon" variant="ghost">
            <UiIcon name="lucide:settings" />
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>Settings</UiTooltipContent>
      </UiTooltip>

      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton size="icon" variant="ghost">
            <UiIcon name="lucide:trash-2" class="text-destructive" />
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>Delete item</UiTooltipContent>
      </UiTooltip>
    </div>
  </Section>

  <Section title="Positioning">
    <div class="flex flex-wrap gap-4">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton variant="outline" size="sm">Top (default)</UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent side="top">Tooltip on top</UiTooltipContent>
      </UiTooltip>

      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton variant="outline" size="sm">Bottom</UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent side="bottom">Tooltip on bottom</UiTooltipContent>
      </UiTooltip>

      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton variant="outline" size="sm">Left</UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent side="left">Tooltip on left</UiTooltipContent>
      </UiTooltip>

      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton variant="outline" size="sm">Right</UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent side="right">Tooltip on right</UiTooltipContent>
      </UiTooltip>
    </div>
  </Section>
</template>
