<script setup lang="ts">
import { ref } from "vue";
import UiPinInput from "../../src/components/Ui/PinInput/PinInput.vue";
import UiPinInputInput from "../../src/components/Ui/PinInput/PinInputInput.vue";
import UiPinInputSeparator from "../../src/components/Ui/PinInput/PinInputSeparator.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import Section from "workbench/components/Section.vue";

const otp = ref<string[]>([]);
const pin = ref<string[]>([]);
const verified = ref(false);

const verify = () => {
  verified.value = otp.value.join("") === "123456";
};
</script>

<template>
  <Section title="OTP Verification" class="w-96">
    <div class="space-y-4">
      <UiLabel>Enter verification code</UiLabel>
      <UiPinInput v-model="otp" :length="6" type="number">
        <UiPinInputInput v-for="(id, index) in 6" :key="id" :index="index" />
      </UiPinInput>
      <div class="flex items-center gap-3">
        <UiButton @click="verify" :disabled="otp.filter(Boolean).length < 6"
          >Verify</UiButton
        >
        <p
          v-if="verified !== null && otp.filter(Boolean).length === 6"
          class="text-sm"
        >
          <span v-if="verified" class="text-success font-medium"
            >Code correct!</span
          >
          <span v-else class="text-destructive font-medium"
            >Wrong code (try 123456)</span
          >
        </p>
      </div>
    </div>
  </Section>

  <Section title="PIN with Separator" class="w-96">
    <UiPinInput v-model="pin" :length="4" type="number" mask>
      <UiPinInputInput :index="0" />
      <UiPinInputInput :index="1" />
      <UiPinInputSeparator />
      <UiPinInputInput :index="2" />
      <UiPinInputInput :index="3" />
    </UiPinInput>
    <p class="text-xs text-theme mt-2">Value: {{ pin.join("") || "—" }}</p>
  </Section>

  <Section title="Alphanumeric" class="w-96">
    <div class="space-y-2">
      <UiLabel>License key</UiLabel>
      <UiPinInput :length="5" type="text">
        <UiPinInputInput v-for="i in 5" :key="i" :index="i - 1" />
      </UiPinInput>
    </div>
  </Section>

  <Section title="Disabled" class="w-96">
    <UiPinInput
      :length="4"
      :model-value="['1', '2', '3', '4']"
      disabled
      type="number"
    >
      <UiPinInputInput v-for="i in 4" :key="i" :index="i - 1" />
    </UiPinInput>
  </Section>
</template>
