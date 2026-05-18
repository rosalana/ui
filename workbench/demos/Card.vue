<script setup lang="ts">
import UiCard from "../../src/components/Ui/Card/Card.vue";
import UiCardHeader from "../../src/components/Ui/Card/CardHeader.vue";
import UiCardTitle from "../../src/components/Ui/Card/CardTitle.vue";
import UiCardDescription from "../../src/components/Ui/Card/CardDescription.vue";
import UiCardContent from "../../src/components/Ui/Card/CardContent.vue";
import UiCardFooter from "../../src/components/Ui/Card/CardFooter.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import UiInput from "../../src/components/Ui/Input/Input.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import UiBadge from "../../src/components/Ui/Badge/Badge.vue";
import Section from "workbench/components/Section.vue";
</script>

<template>
  <Section title="Basic Cards" class="grid grid-cols-2 gap-6 w-3xl">
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Basic Card</UiCardTitle>
        <UiCardDescription
          >A simple card with header and content.</UiCardDescription
        >
      </UiCardHeader>
      <UiCardContent>
        <p class="text-sm text-theme">
          Card content goes here. You can put any content inside.
        </p>
      </UiCardContent>
    </UiCard>

    <UiCard>
      <UiCardHeader>
        <UiCardTitle>With Footer</UiCardTitle>
        <UiCardDescription>Card with actions in the footer.</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <p class="text-sm text-theme">
          This card has a footer with action buttons.
        </p>
      </UiCardContent>
      <UiCardFooter class="flex justify-end gap-2">
        <UiButton variant="outline" size="sm">Cancel</UiButton>
        <UiButton size="sm">Confirm</UiButton>
      </UiCardFooter>
    </UiCard>
  </Section>

  <Section title="Form Card" class="w-96">
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Login</UiCardTitle>
        <UiCardDescription
          >Enter your credentials to access your account.</UiCardDescription
        >
      </UiCardHeader>
      <UiCardContent class="space-y-4">
        <div class="space-y-1.5">
          <UiLabel>Email</UiLabel>
          <UiInput type="email" placeholder="m@example.com" />
        </div>
        <div class="space-y-1.5">
          <UiLabel>Password</UiLabel>
          <UiInput type="password" placeholder="••••••••" />
        </div>
      </UiCardContent>
      <UiCardFooter>
        <UiButton class="w-full">Sign in</UiButton>
      </UiCardFooter>
    </UiCard>
  </Section>

  <Section title="Stats Card" class="grid grid-cols-3 gap-4">
    <UiCard
      v-for="stat in [
        {
          label: 'Revenue',
          value: '$45,231',
          change: '+20.1%',
          color: 'success',
        },
        { label: 'Users', value: '2,350', change: '+180', color: 'info' },
        {
          label: 'Churn',
          value: '3.2%',
          change: '-0.4%',
          color: 'destructive',
        },
      ]"
      :key="stat.label"
    >
      <UiCardContent class="pt-5">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs text-theme font-medium">{{ stat.label }}</p>
          <UiBadge :variant="stat.color as any" size="sm">{{
            stat.change
          }}</UiBadge>
        </div>
        <p class="text-2xl font-bold tracking-tight">{{ stat.value }}</p>
      </UiCardContent>
    </UiCard>
  </Section>
</template>
