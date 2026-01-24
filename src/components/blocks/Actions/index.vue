<script setup lang="ts">
import { computed, onMounted, useModel } from "vue";
import { ActionsEmits, ActionsProps } from "./types";
import {
  UiButton,
  UiDropdownMenu,
  UiDropdownMenuContent,
  UiDropdownMenuItem,
  UiDropdownMenuLabel,
  UiDropdownMenuSeparator,
  UiDropdownMenuSub,
  UiDropdownMenuSubContent,
  UiDropdownMenuSubTrigger,
  UiDropdownMenuTrigger,
  UiIcon,
} from "../../index";
import { tv } from "tailwind-variants";

const props = withDefaults(defineProps<ActionsProps>(), {
  showEmptyState: true,
});

const emit = defineEmits<ActionsEmits>();

const actions = tv({
  base: "w-max",
});

const visible = computed(() => {
  return props.items.filter((item) => !item.hidden);
});

const open = useModel(props, "open");

onMounted(() => {
  if (props.defaultOpen) {
    open.value = true;
  }
});
</script>
<template>
  <UiDropdownMenu
    v-if="!visible.length && !props.showEmptyState ? false : true"
    v-model:open="open"
    :modal="props.modal"
  >
    <UiDropdownMenuTrigger as-child>
      <slot name="trigger">
        <UiButton variant="ghost" size="icon-sm">
          <UiIcon name="lucide:more-vertical" class="size-4" />
        </UiButton>
      </slot>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent
      :align="props.align"
      :align-flip="props.alignFlip"
      :align-offset="props.alignOffset"
      :arrow-padding="props.arrowPadding"
      :avoid-collisions="props.avoidCollisions"
      :collision-boundary="props.collisionBoundary"
      :collision-padding="props.collisionPadding"
      :disable-update-on-layout-shift="props.disableUpdateOnLayoutShift"
      :force-mount="props.forceMount"
      :hide-when-detached="props.hideWhenDetached"
      :loop="props.loop"
      :position-strategy="props.positionStrategy"
      :prioritize-position="props.prioritizePosition"
      :side="props.side"
      :side-flip="props.sideFlip"
      :side-offset="props.sideOffset"
      :update-position-strategy="props.updatePositionStrategy"
      :sticky="props.sticky"
      :class="actions({ class: props.class })"
    >
      <template v-if="props.label">
        <UiDropdownMenuLabel>{{ props.label }}</UiDropdownMenuLabel>
        <UiDropdownMenuSeparator />
      </template>
      <!-- empty state -->
      <template v-if="!visible.length">
        <div class="p-2 text-sm text-theme">No actions available</div>
      </template>

      <template v-else v-for="item in visible" :key="item.label">
        <UiDropdownMenuItem
          v-if="!item.children"
          :class="item.class"
          @click="item.onClick"
          :disabled="item.disabled"
        >
          <UiIcon v-if="item.icon" :name="item.icon" class="size-3.5 mr-2" />
          {{ item.label }}
        </UiDropdownMenuItem>
        <UiDropdownMenuSub v-else>
          <UiDropdownMenuSubTrigger
            :class="item.class"
            :disabled="item.disabled"
          >
            <UiIcon v-if="item.icon" :name="item.icon" class="size-3.5 mr-2" />
            {{ item.label }}
          </UiDropdownMenuSubTrigger>
          <UiDropdownMenuSubContent>
            <template v-for="child in item.children" :key="child.label">
              <UiDropdownMenuItem
                :class="child.class"
                @click="child.onClick"
                :disabled="child.disabled"
              >
                <UiIcon
                  v-if="child.icon"
                  :name="child.icon"
                  class="size-3.5 mr-2"
                />
                {{ child.label }}
              </UiDropdownMenuItem>
            </template>
          </UiDropdownMenuSubContent>
        </UiDropdownMenuSub>
      </template>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
