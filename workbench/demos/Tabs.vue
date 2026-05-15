<script setup lang="ts">
import UiTabs from "../../src/components/Ui/Tabs/Tabs.vue";
import UiTabsList from "../../src/components/Ui/Tabs/TabsList.vue";
import UiTabsTrigger from "../../src/components/Ui/Tabs/TabsTrigger.vue";
import UiTabsContent from "../../src/components/Ui/Tabs/TabsContent.vue";
import UiCard from "../../src/components/Ui/Card/Card.vue";
import UiCardContent from "../../src/components/Ui/Card/CardContent.vue";
import UiCardHeader from "../../src/components/Ui/Card/CardHeader.vue";
import UiCardTitle from "../../src/components/Ui/Card/CardTitle.vue";
import UiCardDescription from "../../src/components/Ui/Card/CardDescription.vue";
import UiCardFooter from "../../src/components/Ui/Card/CardFooter.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiInput from "../../src/components/Ui/Input/Input.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
</script>

<template>
  <div class="space-y-10 max-w-xl">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Basic</h2>
      <UiTabs default-value="tab1">
        <UiTabsList>
          <UiTabsTrigger value="tab1">Account</UiTabsTrigger>
          <UiTabsTrigger value="tab2">Password</UiTabsTrigger>
          <UiTabsTrigger value="tab3">Notifications</UiTabsTrigger>
        </UiTabsList>
        <UiTabsContent value="tab1">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Account</UiCardTitle>
              <UiCardDescription>Make changes to your account here.</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="space-y-4">
              <div class="space-y-1.5">
                <UiLabel>Name</UiLabel>
                <UiInput value="John Doe" />
              </div>
              <div class="space-y-1.5">
                <UiLabel>Username</UiLabel>
                <UiInput value="@johndoe" />
              </div>
            </UiCardContent>
            <UiCardFooter>
              <UiButton>Save changes</UiButton>
            </UiCardFooter>
          </UiCard>
        </UiTabsContent>
        <UiTabsContent value="tab2">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Password</UiCardTitle>
              <UiCardDescription>Change your password here.</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="space-y-4">
              <div class="space-y-1.5">
                <UiLabel>Current password</UiLabel>
                <UiInput type="password" />
              </div>
              <div class="space-y-1.5">
                <UiLabel>New password</UiLabel>
                <UiInput type="password" />
              </div>
            </UiCardContent>
            <UiCardFooter>
              <UiButton>Update password</UiButton>
            </UiCardFooter>
          </UiCard>
        </UiTabsContent>
        <UiTabsContent value="tab3">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Notifications</UiCardTitle>
              <UiCardDescription>Configure your notification preferences.</UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-sm text-theme">Notification settings coming soon.</p>
            </UiCardContent>
          </UiCard>
        </UiTabsContent>
      </UiTabs>
    </section>
  </div>
</template>
