<script setup lang="ts">
import { ref } from "vue";
import UiSheet from "../../src/components/Ui/Sheet/Sheet.vue";
import UiSheetTrigger from "../../src/components/Ui/Sheet/SheetTrigger.vue";
import UiSheetContent from "../../src/components/Ui/Sheet/SheetContent.vue";
import UiSheetHeader from "../../src/components/Ui/Sheet/SheetHeader.vue";
import UiSheetTitle from "../../src/components/Ui/Sheet/SheetTitle.vue";
import UiSheetDescription from "../../src/components/Ui/Sheet/SheetDescription.vue";
import UiSheetFooter from "../../src/components/Ui/Sheet/SheetFooter.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiInput from "../../src/components/Ui/Input/Input.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import Section from "workbench/components/Section.vue";
</script>

<template>
  <Section title="Sides">
    <div class="flex flex-wrap gap-3">
      <UiSheet v-for="side in ['right', 'left', 'top', 'bottom']" :key="side">
        <UiSheetTrigger as-child>
          <UiButton variant="outline" class="capitalize">{{ side }}</UiButton>
        </UiSheetTrigger>
        <UiSheetContent :side="side as any">
          <UiSheetHeader>
            <UiSheetTitle>Sheet from {{ side }}</UiSheetTitle>
            <UiSheetDescription>
              This sheet slides in from the {{ side }}. Click outside or press
              ESC to close.
            </UiSheetDescription>
          </UiSheetHeader>
          <div class="mt-4 space-y-3">
            <p class="text-sm text-theme">Add your content here.</p>
          </div>
        </UiSheetContent>
      </UiSheet>
    </div>
  </Section>

  <Section title="Settings Panel">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton>Open Settings</UiButton>
      </UiSheetTrigger>
      <UiSheetContent>
        <UiSheetHeader>
          <UiSheetTitle>Settings</UiSheetTitle>
          <UiSheetDescription>
            Update your profile and preferences here.
          </UiSheetDescription>
        </UiSheetHeader>
        <div class="mt-6 space-y-4">
          <div class="space-y-1.5">
            <UiLabel for="sheet-name">Display Name</UiLabel>
            <UiInput id="sheet-name" placeholder="John Doe" />
          </div>
          <div class="space-y-1.5">
            <UiLabel for="sheet-email">Email</UiLabel>
            <UiInput
              id="sheet-email"
              type="email"
              placeholder="john@example.com"
            />
          </div>
          <div class="space-y-1.5">
            <UiLabel for="sheet-bio">Bio</UiLabel>
            <UiInput id="sheet-bio" placeholder="Short bio..." />
          </div>
        </div>
        <UiSheetFooter class="mt-6">
          <UiButton class="w-full">Save Changes</UiButton>
        </UiSheetFooter>
      </UiSheetContent>
    </UiSheet>
  </Section>

  <Section title="No Close Button">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton variant="outline">Custom Close</UiButton>
      </UiSheetTrigger>
      <UiSheetContent :hide-close-button="true">
        <UiSheetHeader>
          <UiSheetTitle>Custom Close Sheet</UiSheetTitle>
          <UiSheetDescription
            >The X button is hidden. Use the button below to
            close.</UiSheetDescription
          >
        </UiSheetHeader>
        <div class="mt-6">
          <UiSheetTrigger as-child>
            <UiButton variant="outline" class="w-full">Close Sheet</UiButton>
          </UiSheetTrigger>
        </div>
      </UiSheetContent>
    </UiSheet>
  </Section>
</template>
