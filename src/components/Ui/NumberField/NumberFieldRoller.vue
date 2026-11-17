<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { AnimatePresence, motion } from "motion-v";

/**
 * The number as an odometer. Digits only ever roll vertically: a digit that changes rolls exactly
 * one step (9 → 0 is one step, not nine), up when the number grows and down when it shrinks.
 *
 * A new place (9 → 10) rolls in the same way while its width opens from zero, a dropped place
 * rolls out while its width closes, so the number widens and narrows smoothly instead of the
 * digits jumping sideways. Places are matched from the right, so the units stay the units.
 */
const props = defineProps<{
  text: string;
  /** 1 when the value went up, -1 when it went down. */
  direction: number;
}>();

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

const characters = computed(() => {
  const all = [...props.text];
  return all.map((char, index) => ({
    // Place from the right
    key: all.length - index,
    char,
  }));
});

/** No rolling on the first render, only on changes. */
const mounted = ref(false);
onMounted(() => (mounted.value = true));

/**
 * One step of the roll. The direction goes in through `custom`, so a character already on its way
 * out still leaves the way the latest change says.
 */
const roll = {
  enter: (direction: unknown) => ({ y: (direction as number) > 0 ? "100%" : "-100%" }),
  center: { y: "0%" },
  exit: (direction: unknown) => ({ y: (direction as number) > 0 ? "-100%" : "100%" }),
};

/** A place opening and closing, rolling with the digits. */
const place = {
  enter: (direction: unknown) => ({ width: 0, y: (direction as number) > 0 ? "100%" : "-100%" }),
  center: { width: "auto", y: "0%" },
  exit: (direction: unknown) => ({ width: 0, y: (direction as number) > 0 ? "-100%" : "100%" }),
};
</script>

<template>
  <span class="inline-flex h-[1lh] items-center overflow-hidden tabular-nums whitespace-pre" aria-hidden="true">
    <AnimatePresence :initial="false" :custom="direction">
      <motion.span
        v-for="item in characters"
        :key="item.key"
        class="relative inline-flex justify-center"
        :custom="direction"
        :variants="place"
        initial="enter"
        animate="center"
        exit="exit"
        :transition="SPRING"
      >
        <!-- The window the old and the new character pass through, one line tall -->
        <span class="relative block h-[1lh] overflow-hidden">
          <span class="invisible">{{ /\d/.test(item.char) ? "0" : item.char }}</span>
          <AnimatePresence :initial="false" :custom="direction">
            <motion.span
              :key="item.char"
              class="absolute inset-0 text-center"
              :custom="direction"
              :variants="roll"
              :initial="mounted ? 'enter' : false"
              animate="center"
              exit="exit"
              :transition="SPRING"
            >
              {{ item.char }}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>
    </AnimatePresence>
  </span>
</template>
