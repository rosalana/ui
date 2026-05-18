<script setup lang="ts">
import UiNavigationMenu from "../../src/components/Ui/NavigationMenu/NavigationMenu.vue";
import UiNavigationMenuList from "../../src/components/Ui/NavigationMenu/NavigationMenuList.vue";
import UiNavigationMenuItem from "../../src/components/Ui/NavigationMenu/NavigationMenuItem.vue";
import UiNavigationMenuTrigger from "../../src/components/Ui/NavigationMenu/NavigationMenuTrigger.vue";
import UiNavigationMenuContent from "../../src/components/Ui/NavigationMenu/NavigationMenuContent.vue";
import UiNavigationMenuLink from "../../src/components/Ui/NavigationMenu/NavigationMenuLink.vue";
import UiIcon from "../../src/components/Ui/Icon/Icon.vue";
import Section from "workbench/components/Section.vue";

const components = [
  {
    title: "Button",
    desc: "Interactive element for triggering actions.",
    icon: "lucide:mouse-pointer-click",
  },
  {
    title: "Dialog",
    desc: "Modal window for focused interactions.",
    icon: "lucide:layout",
  },
  {
    title: "Input",
    desc: "Text field for user data entry.",
    icon: "lucide:text-cursor-input",
  },
  {
    title: "Select",
    desc: "Dropdown for selecting from options.",
    icon: "lucide:chevrons-up-down",
  },
  {
    title: "Table",
    desc: "Structured data display with rows and columns.",
    icon: "lucide:table",
  },
  {
    title: "Tabs",
    desc: "Organize content into switchable panels.",
    icon: "lucide:panels-top-left",
  },
];
</script>

<template>
  <Section title="Full Navigation Menu">
    <div
      class="rounded-xl border border-muted-200 dark:border-muted-800 p-4 overflow-visible"
    >
      <UiNavigationMenu>
        <UiNavigationMenuList>
          <UiNavigationMenuItem>
            <UiNavigationMenuTrigger>Getting Started</UiNavigationMenuTrigger>
            <UiNavigationMenuContent>
              <div class="grid gap-3 p-4 w-[400px]">
                <UiNavigationMenuLink
                  href="#"
                  class="flex flex-col gap-1 p-3 rounded-xl hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="size-8 rounded-lg bg-primary/10 flex items-center justify-center"
                    >
                      <UiIcon
                        name="lucide:rocket"
                        class="size-4 text-primary"
                      />
                    </div>
                    <span class="font-medium text-sm">Introduction</span>
                  </div>
                  <p class="text-xs text-theme pl-10">
                    Re-usable components built with reka-ui and Tailwind CSS v4.
                  </p>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink
                  href="#"
                  class="flex flex-col gap-1 p-3 rounded-xl hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="size-8 rounded-lg bg-primary/10 flex items-center justify-center"
                    >
                      <UiIcon
                        name="lucide:download"
                        class="size-4 text-primary"
                      />
                    </div>
                    <span class="font-medium text-sm">Installation</span>
                  </div>
                  <p class="text-xs text-theme pl-10">
                    How to install dependencies and set up your project.
                  </p>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink
                  href="#"
                  class="flex flex-col gap-1 p-3 rounded-xl hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="size-8 rounded-lg bg-primary/10 flex items-center justify-center"
                    >
                      <UiIcon
                        name="lucide:palette"
                        class="size-4 text-primary"
                      />
                    </div>
                    <span class="font-medium text-sm">Theming</span>
                  </div>
                  <p class="text-xs text-theme pl-10">
                    Using CSS variables and dynamic color configuration.
                  </p>
                </UiNavigationMenuLink>
              </div>
            </UiNavigationMenuContent>
          </UiNavigationMenuItem>

          <UiNavigationMenuItem>
            <UiNavigationMenuTrigger>Components</UiNavigationMenuTrigger>
            <UiNavigationMenuContent>
              <div class="grid grid-cols-2 gap-2 p-4 w-[480px]">
                <UiNavigationMenuLink
                  v-for="comp in components"
                  :key="comp.title"
                  href="#"
                  class="flex items-start gap-3 p-3 rounded-xl hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors"
                >
                  <UiIcon
                    :name="comp.icon"
                    class="size-4 text-primary mt-0.5 shrink-0"
                  />
                  <div>
                    <p class="text-sm font-medium">{{ comp.title }}</p>
                    <p class="text-xs text-theme leading-snug">
                      {{ comp.desc }}
                    </p>
                  </div>
                </UiNavigationMenuLink>
              </div>
            </UiNavigationMenuContent>
          </UiNavigationMenuItem>

          <UiNavigationMenuItem>
            <UiNavigationMenuLink
              href="#"
              class="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              Documentation
            </UiNavigationMenuLink>
          </UiNavigationMenuItem>

          <UiNavigationMenuItem>
            <UiNavigationMenuLink
              href="#"
              class="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              GitHub
            </UiNavigationMenuLink>
          </UiNavigationMenuItem>
        </UiNavigationMenuList>
      </UiNavigationMenu>
    </div>
  </Section>
</template>
