<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
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
  <div class="flex justify-center">
    <UiNavigationMenu>
      <UiNavigationMenuList>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger>Organize</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid w-72 gap-1 p-2">
              <li v-for="section in sections" :key="section.href">
                <UiNavigationMenuLink as-child>
                  <Link :href="section.href" class="flex items-start gap-3">
                    <UiIcon :name="section.icon" class="mt-0.5 size-5 shrink-0" />
                    <span class="grid gap-1">
                      <span class="font-medium">{{ section.title }}</span>
                      <span class="text-theme">{{ section.text }}</span>
                    </span>
                  </Link>
                </UiNavigationMenuLink>
              </li>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuLink as-child>
            <Link href="/pricing" class="h-9 px-4 py-2 font-medium">Pricing</Link>
          </UiNavigationMenuLink>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuLink as-child>
            <Link href="/help" class="h-9 px-4 py-2 font-medium">Help</Link>
          </UiNavigationMenuLink>
        </UiNavigationMenuItem>
      </UiNavigationMenuList>
    </UiNavigationMenu>
  </div>
</template>
