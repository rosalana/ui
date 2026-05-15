<script setup lang="ts">
import { ref } from "vue";
import UiPopover from "../../src/components/Ui/Popover/Popover.vue";
import UiPopoverTrigger from "../../src/components/Ui/Popover/PopoverTrigger.vue";
import UiPopoverContent from "../../src/components/Ui/Popover/PopoverContent.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiInput from "../../src/components/Ui/Input/Input.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";

const name = ref("Michael Bany");
const email = ref("michael@example.com");
const notifications = ref(true);
</script>

<template>
  <div class="space-y-10">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Basic</h2>
      <div class="flex flex-wrap gap-4">
        <UiPopover>
          <UiPopoverTrigger as-child>
            <UiButton variant="outline">Open popover</UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent>
            <div class="p-3 space-y-1">
              <p class="text-sm font-medium">Dimensions</p>
              <p class="text-xs text-theme">Set the dimensions for the layer.</p>
            </div>
          </UiPopoverContent>
        </UiPopover>

        <UiPopover>
          <UiPopoverTrigger as-child>
            <UiButton size="icon" variant="ghost">
              <UiIcon name="lucide:info" />
            </UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent class="w-56">
            <div class="p-3 space-y-1">
              <p class="text-sm font-medium">About this field</p>
              <p class="text-xs text-theme">This field accepts values between 1 and 100.</p>
            </div>
          </UiPopoverContent>
        </UiPopover>
      </div>
    </section>

    <section class="w-min">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">With Form</h2>
      <UiPopover>
        <UiPopoverTrigger as-child>
          <UiButton variant="outline">
            <UiIcon name="lucide:user" class="mr-2 size-4" />
            Edit profile
          </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-80">
          <div class="p-3 space-y-4">
            <div>
              <p class="text-sm font-medium">Edit profile</p>
              <p class="text-xs text-theme mt-0.5">Make changes to your profile here.</p>
            </div>
            <div class="space-y-3">
              <div class="space-y-1.5">
                <UiLabel for="name">Name</UiLabel>
                <UiInput id="name" v-model="name" />
              </div>
              <div class="space-y-1.5">
                <UiLabel for="email">Email</UiLabel>
                <UiInput id="email" v-model="email" type="email" />
              </div>
            </div>
            <div class="flex justify-end">
              <UiButton size="sm">Save changes</UiButton>
            </div>
          </div>
        </UiPopoverContent>
      </UiPopover>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Positioning</h2>
      <div class="flex flex-wrap gap-4">
        <UiPopover>
          <UiPopoverTrigger as-child>
            <UiButton variant="outline" size="sm">Bottom (default)</UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent side="bottom" class="w-48">
            <div class="p-3">
              <p class="text-xs text-theme">Opens below</p>
            </div>
          </UiPopoverContent>
        </UiPopover>

        <UiPopover>
          <UiPopoverTrigger as-child>
            <UiButton variant="outline" size="sm">Top</UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent side="top" class="w-48">
            <div class="p-3">
              <p class="text-xs text-theme">Opens above</p>
            </div>
          </UiPopoverContent>
        </UiPopover>

        <UiPopover>
          <UiPopoverTrigger as-child>
            <UiButton variant="outline" size="sm">Left</UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent side="left" class="w-48">
            <div class="p-3">
              <p class="text-xs text-theme">Opens left</p>
            </div>
          </UiPopoverContent>
        </UiPopover>

        <UiPopover>
          <UiPopoverTrigger as-child>
            <UiButton variant="outline" size="sm">Right</UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent side="right" class="w-48">
            <div class="p-3">
              <p class="text-xs text-theme">Opens right</p>
            </div>
          </UiPopoverContent>
        </UiPopover>
      </div>
    </section>
  </div>
</template>
