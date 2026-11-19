<script setup lang="ts">
import {
  UiIcon,
  UiNavigationMenu,
  UiNavigationMenuContent,
  UiNavigationMenuItem,
  UiNavigationMenuLink,
  UiNavigationMenuList,
  UiNavigationMenuTrigger,
} from "@rosalana/ui";

const sections = [
  { title: "Tournaments", text: "Brackets, schedules and results.", icon: "lucide:trophy", href: "/tournaments" },
  { title: "Teams", text: "Rosters, invites and roles.", icon: "lucide:users", href: "/teams" },
  { title: "Venues", text: "Courts, fields and opening hours.", icon: "lucide:map-pin", href: "/venues" },
];
</script>

<template>
  <!-- The docs run without Inertia, the code shows the app version. The fixed height keeps room for the open panel. -->
  <div class="flex h-64 w-full justify-center">
    <UiNavigationMenu>
      <UiNavigationMenuList>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger>Organize</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid w-72 gap-1 p-2">
              <li v-for="section in sections" :key="section.href">
                <UiNavigationMenuLink :href="section.href" @click.prevent class="flex items-start gap-3">
                  <UiIcon :name="section.icon" class="mt-0.5 size-5 shrink-0" />
                  <span class="grid gap-1">
                    <span class="font-medium">{{ section.title }}</span>
                    <span class="text-theme">{{ section.text }}</span>
                  </span>
                </UiNavigationMenuLink>
              </li>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuLink href="/pricing" @click.prevent class="h-9 px-4 py-2 font-medium">
            Pricing
          </UiNavigationMenuLink>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuLink href="/help" @click.prevent class="h-9 px-4 py-2 font-medium">
            Help
          </UiNavigationMenuLink>
        </UiNavigationMenuItem>
      </UiNavigationMenuList>
    </UiNavigationMenu>
  </div>
</template>
