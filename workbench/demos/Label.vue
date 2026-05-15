<script setup lang="ts">
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import UiInput from "../../src/components/Ui/Input/Input.vue";
import UiCheckbox from "../../src/components/Ui/Checkbox/Checkbox.vue";
</script>

<template>
  <div class="space-y-10 max-w-md">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Basic</h2>
      <div class="space-y-2">
        <UiLabel>First Name</UiLabel>
        <UiInput placeholder="John" />
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">With htmlFor</h2>
      <div class="space-y-4">
        <div class="space-y-1.5">
          <UiLabel for="username">Username</UiLabel>
          <UiInput id="username" placeholder="@johndoe" />
        </div>
        <div class="space-y-1.5">
          <UiLabel for="bio">Bio</UiLabel>
          <UiInput id="bio" placeholder="Tell us about yourself..." />
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">With Checkbox</h2>
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <UiCheckbox id="terms" />
          <UiLabel for="terms">Accept terms and conditions</UiLabel>
        </div>
        <div class="flex items-center gap-2">
          <UiCheckbox id="newsletter" />
          <UiLabel for="newsletter">Subscribe to newsletter</UiLabel>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Disabled</h2>
      <div class="flex items-center gap-2">
        <UiCheckbox id="disabled-check" disabled />
        <UiLabel for="disabled-check" class="opacity-50 cursor-not-allowed">Disabled option</UiLabel>
      </div>
    </section>
  </div>
</template>
