<script setup lang="ts">
import UiDialog from "../../src/components/Ui/Dialog/Dialog.vue";
import UiDialogTrigger from "../../src/components/Ui/Dialog/DialogTrigger.vue";
import UiDialogContent from "../../src/components/Ui/Dialog/DialogContent.vue";
import UiDialogHeader from "../../src/components/Ui/Dialog/DialogHeader.vue";
import UiDialogTitle from "../../src/components/Ui/Dialog/DialogTitle.vue";
import UiDialogDescription from "../../src/components/Ui/Dialog/DialogDescription.vue";
import UiDialogFooter from "../../src/components/Ui/Dialog/DialogFooter.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiInput from "../../src/components/Ui/Input/Input.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
</script>

<template>
  <div class="space-y-10">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Basic Dialog</h2>
      <div class="flex gap-3">
        <UiDialog>
          <UiDialogTrigger as-child>
            <UiButton variant="outline">Open Dialog</UiButton>
          </UiDialogTrigger>
          <UiDialogContent>
            <UiDialogHeader>
              <UiDialogTitle>Dialog Title</UiDialogTitle>
              <UiDialogDescription>
                This is a basic dialog. You can put any content here.
              </UiDialogDescription>
            </UiDialogHeader>
            <p class="text-sm text-theme py-4">
              Dialog content goes here. Press Escape or click outside to close.
            </p>
            <UiDialogFooter>
              <UiButton variant="outline">Cancel</UiButton>
              <UiButton>Confirm</UiButton>
            </UiDialogFooter>
          </UiDialogContent>
        </UiDialog>

        <UiDialog>
          <UiDialogTrigger as-child>
            <UiButton>Edit Profile</UiButton>
          </UiDialogTrigger>
          <UiDialogContent>
            <UiDialogHeader>
              <UiDialogTitle>Edit Profile</UiDialogTitle>
              <UiDialogDescription>
                Make changes to your profile here. Click save when done.
              </UiDialogDescription>
            </UiDialogHeader>
            <div class="space-y-4 py-4">
              <div class="space-y-1.5">
                <UiLabel>Name</UiLabel>
                <UiInput placeholder="Your name" value="John Doe" />
              </div>
              <div class="space-y-1.5">
                <UiLabel>Email</UiLabel>
                <UiInput type="email" placeholder="Your email" value="john@example.com" />
              </div>
            </div>
            <UiDialogFooter>
              <UiButton variant="outline">Cancel</UiButton>
              <UiButton>Save changes</UiButton>
            </UiDialogFooter>
          </UiDialogContent>
        </UiDialog>
      </div>
    </section>
  </div>
</template>
