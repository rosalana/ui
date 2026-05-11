<script setup lang="ts">
import { inject, nextTick, Ref, ref } from "vue";
import type { VType } from "./types";
import Icon from "../../Ui/Icon/Icon.vue";

const props = defineProps<{
    title?: string;
    type: VType;
    typeClass: string;
    size: number;
    isExpandable: boolean;
    showFilter: boolean;
    rawView: boolean;
    copied: boolean;
}>();

const emit = defineEmits<{
    "update:showFilter": [value: boolean];
    "update:rawView": [value: boolean];
    "expand-all": [];
    "collapse-all": [];
    copy: [];
}>();

const filterInput = ref<HTMLInputElement>();

// Inject filterQuery directly — provided by Root, shared across the whole tree
const filterQuery = inject<Ref<string>>("dump:filter", ref(""));

function toggleFilter(current: boolean) {
    if (current) filterQuery.value = "";
    emit("update:showFilter", !current);

    if (!current) {
        nextTick(() => filterInput.value?.focus());
    }
}

function toggleRawView(current: boolean) {
    if (props.showFilter) toggleFilter(true);
    emit("update:rawView", !current);
}
</script>

<template>
    <!-- Header bar -->
    <div
        class="flex items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900/80 px-3 py-2"
    >
        <div class="flex min-w-0 items-center gap-2">
            <span v-if="title" class="truncate font-semibold text-zinc-200">{{
                title
            }}</span>
            <span
                class="shrink-0 rounded bg-zinc-800 px-1.5 py-0.5 text-xs font-semibold"
                :class="typeClass"
            >
                {{ type }}
            </span>
            <span v-if="isExpandable" class="shrink-0 text-xs text-zinc-400">
                {{ size }} {{ type === "array" ? "items" : "keys" }}
            </span>
        </div>

        <div class="flex shrink-0 items-center gap-0.5">
            <!-- Filter / highlight toggle -->
            <button
                v-if="isExpandable && size > 2"
                @click="toggleFilter(showFilter)"
                class="rounded px-2 py-1 text-xs transition-colors disabled:opacity-70"
                :disabled="rawView"
                :class="
                    showFilter
                        ? 'bg-zinc-700 text-zinc-100'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                "
            >
                <Icon name="lucide:search" class="h-3.5 w-3.5" />
            </button>

            <template v-if="isExpandable">
                <button
                    @click="emit('expand-all')"
                    :disabled="rawView"
                    class="rounded px-2 py-1 text-xs text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-70"
                >
                    expand all
                </button>
                <button
                    @click="emit('collapse-all')"
                    :disabled="rawView"
                    class="rounded px-2 py-1 text-xs text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-70"
                >
                    collapse
                </button>
                <div class="mx-1 h-3.5 w-px bg-zinc-600" />
            </template>

            <!-- Raw JSON toggle -->
            <button
                @click="toggleRawView(rawView)"
                class="rounded px-2 py-1 text-xs transition-colors"
                :class="
                    rawView
                        ? 'bg-zinc-700 text-zinc-100'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                "
            >
                raw
            </button>

            <div class="mx-1 h-3.5 w-px bg-zinc-600" />

            <!-- Copy root value -->
            <button
                @click="emit('copy')"
                class="flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors"
                :class="
                    copied
                        ? 'text-emerald-400'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                "
            >
                <Icon
                    :name="copied ? 'lucide:check' : 'lucide:copy'"
                    class="h-3.5 w-3.5"
                />
                {{ copied ? "copied!" : "copy" }}
            </button>
        </div>
    </div>

    <!-- Highlight input (shown below header when filter is active) -->
    <div
        v-if="showFilter && isExpandable"
        class="border-b border-zinc-800 bg-zinc-900/50 px-3 py-1.5"
    >
        <input
            v-model="filterQuery"
            placeholder="Highlight keys / values…"
            class="w-full rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-200 outline-none placeholder:text-zinc-500 focus:ring-1 focus:ring-zinc-600"
            ref="filterInput"
        />
    </div>
</template>
