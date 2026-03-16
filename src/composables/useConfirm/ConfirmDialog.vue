<script setup lang="ts">
import { state, respond, VerifyConfirmOptions } from "./state";
import UiAlertDialog from "../../components/Ui/AlertDialog/AlertDialog.vue";
import UiAlertDialogContent from "../../components/Ui/AlertDialog/AlertDialogContent.vue";
import UiAlertDialogHeader from "../../components/Ui/AlertDialog/AlertDialogHeader.vue";
import UiAlertDialogTitle from "../../components/Ui/AlertDialog/AlertDialogTitle.vue";
import UiAlertDialogDescription from "../../components/Ui/AlertDialog/AlertDialogDescription.vue";
import UiAlertDialogFooter from "../../components/Ui/AlertDialog/AlertDialogFooter.vue";
import UiAlertDialogCancel from "../../components/Ui/AlertDialog/AlertDialogCancel.vue";
import UiAlertDialogAction from "../../components/Ui/AlertDialog/AlertDialogAction.vue";
import { ref } from "vue";
import { UiButton, UiIcon, UiInput } from "../../components";

const input = ref("");
const error = ref(false);
const loading = ref(false);

const onConfirm = async () => {
  if (state.variant === "verify") {
    loading.value = true;
    const callback = state.options as VerifyConfirmOptions;
    const result = await callback.callback(input.value);
    loading.value = false;
    if (!result) {
      error.value = true;
      return;
    }
    respond(result);
  } else {
    respond(true);
  }

  input.value = "";
  error.value = false;
};

const onCancel = () => {
  respond(false);
  input.value = "";
  error.value = false;
};
</script>

<template>
  <UiAlertDialog :open="state.open">
    <UiAlertDialogContent class="max-w-sm">
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>
          {{ state.options.title ?? "Are you sure?" }}
        </UiAlertDialogTitle>
        <UiAlertDialogDescription>
          {{
            (
              state.options.description
                ? state.options.description
                : state.variant === "confirm"
            )
              ? "This action may have consequences."
              : "Please verify the action by providing the required information."
          }}
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiInput
        v-if="state.variant === 'verify'"
        v-model="input"
        :variant="error ? 'destructive' : 'default'"
        :placeholder="
          (state.options as VerifyConfirmOptions).placeholder ??
          'Type to verify...'
        "
        @keyup.enter="onConfirm"
      />
      <UiAlertDialogFooter>
        <UiAlertDialogCancel @click="onCancel">
          {{ state.options.cancel ?? "Cancel" }}
        </UiAlertDialogCancel>
        <UiAlertDialogAction @click="onConfirm" as-child>
          <UiButton
            :variant="state.options.danger ? 'destructive' : 'default'"
            :loading="loading"
          >
            <UiIcon v-if="state.options.icon" :name="state.options.icon" />
            {{ state.options.confirm ?? "Confirm" }}
          </UiButton>
        </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
