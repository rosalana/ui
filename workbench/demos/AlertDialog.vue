<script setup lang="ts">
import UiAlertDialog from "../../src/components/Ui/AlertDialog/AlertDialog.vue";
import UiAlertDialogTrigger from "../../src/components/Ui/AlertDialog/AlertDialogTrigger.vue";
import UiAlertDialogContent from "../../src/components/Ui/AlertDialog/AlertDialogContent.vue";
import UiAlertDialogHeader from "../../src/components/Ui/AlertDialog/AlertDialogHeader.vue";
import UiAlertDialogTitle from "../../src/components/Ui/AlertDialog/AlertDialogTitle.vue";
import UiAlertDialogDescription from "../../src/components/Ui/AlertDialog/AlertDialogDescription.vue";
import UiAlertDialogFooter from "../../src/components/Ui/AlertDialog/AlertDialogFooter.vue";
import UiAlertDialogAction from "../../src/components/Ui/AlertDialog/AlertDialogAction.vue";
import UiAlertDialogActionDanger from "../../src/components/Ui/AlertDialog/AlertDialogActionDanger.vue";
import UiAlertDialogCancel from "../../src/components/Ui/AlertDialog/AlertDialogCancel.vue";
import UiAlertDialogIcon from "../../src/components/Ui/AlertDialog/AlertDialogIcon.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
</script>

<template>
  <div class="space-y-10">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Confirm Action</h2>
      <div class="flex gap-3">
        <UiAlertDialog>
          <UiAlertDialogTrigger as-child>
            <UiButton variant="outline">Publish changes</UiButton>
          </UiAlertDialogTrigger>
          <UiAlertDialogContent>
            <UiAlertDialogHeader>
              <UiAlertDialogIcon icon="lucide:send" />
              <UiAlertDialogTitle>Publish to production?</UiAlertDialogTitle>
              <UiAlertDialogDescription>
                This will make your changes live for all users. Are you sure you want to continue?
              </UiAlertDialogDescription>
            </UiAlertDialogHeader>
            <UiAlertDialogFooter>
              <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
              <UiAlertDialogAction>Publish</UiAlertDialogAction>
            </UiAlertDialogFooter>
          </UiAlertDialogContent>
        </UiAlertDialog>

        <UiAlertDialog>
          <UiAlertDialogTrigger as-child>
            <UiButton variant="destructive">Delete account</UiButton>
          </UiAlertDialogTrigger>
          <UiAlertDialogContent>
            <UiAlertDialogHeader>
              <UiAlertDialogIcon icon="lucide:trash-2" />
              <UiAlertDialogTitle>Delete your account?</UiAlertDialogTitle>
              <UiAlertDialogDescription>
                This action cannot be undone. All your data, projects, and settings will be permanently removed.
              </UiAlertDialogDescription>
            </UiAlertDialogHeader>
            <UiAlertDialogFooter>
              <UiAlertDialogCancel>Keep account</UiAlertDialogCancel>
              <UiAlertDialogActionDanger>Delete permanently</UiAlertDialogActionDanger>
            </UiAlertDialogFooter>
          </UiAlertDialogContent>
        </UiAlertDialog>
      </div>
    </section>
  </div>
</template>
