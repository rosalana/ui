<script setup lang="ts">
import UiTooltip from "../../src/components/Ui/Tooltip/Tooltip.vue";
import UiTooltipTrigger from "../../src/components/Ui/Tooltip/TooltipTrigger.vue";
import UiTooltipContent from "../../src/components/Ui/Tooltip/TooltipContent.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";
</script>

<template>
  <div class="space-y-10">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Basic</h2>
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
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Positioning</h2>
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
    </section>
  </div>
</template>
