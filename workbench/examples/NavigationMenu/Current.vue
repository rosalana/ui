<script setup lang="ts">
import {
  UiNavigationMenu,
  UiNavigationMenuContent,
  UiNavigationMenuItem,
  UiNavigationMenuLink,
  UiNavigationMenuList,
  UiNavigationMenuTrigger,
} from "@rosalana/ui";
</script>

<template>
  <!-- Static links for the docs; in an app, set active from the current route -->
  <div class="flex h-48 w-full justify-center">
    <UiNavigationMenu>
      <UiNavigationMenuList>
        <UiNavigationMenuItem>
          <UiNavigationMenuLink href="#" active class="h-9 px-4 py-2 font-medium" @click.prevent>
            Dashboard
          </UiNavigationMenuLink>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger active>Tournaments</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid w-56 gap-1 p-2">
              <li>
                <UiNavigationMenuLink href="#" active @click.prevent>Spring Open</UiNavigationMenuLink>
              </li>
              <li>
                <UiNavigationMenuLink href="#" @click.prevent>Summer League</UiNavigationMenuLink>
              </li>
              <li>
                <UiNavigationMenuLink href="#" @click.prevent>Autumn Cup</UiNavigationMenuLink>
              </li>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
      </UiNavigationMenuList>
    </UiNavigationMenu>
  </div>
</template>
