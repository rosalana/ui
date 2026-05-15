<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import UiProgress from "../../src/components/Ui/Progress/Progress.vue";

const animated = ref(0);
let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => {
    animated.value = animated.value >= 100 ? 0 : animated.value + 1;
  }, 50);
});

onUnmounted(() => clearInterval(interval));
</script>

<template>
  <div class="space-y-10 max-w-lg">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Variants</h2>
      <div class="space-y-4">
        <div class="space-y-1.5">
          <p class="text-xs text-theme">Default</p>
          <UiProgress :model-value="65" />
        </div>
        <div class="space-y-1.5">
          <p class="text-xs text-theme">Success</p>
          <UiProgress variant="success" :model-value="80" />
        </div>
        <div class="space-y-1.5">
          <p class="text-xs text-theme">Warning</p>
          <UiProgress variant="warning" :model-value="45" />
        </div>
        <div class="space-y-1.5">
          <p class="text-xs text-theme">Destructive</p>
          <UiProgress variant="destructive" :model-value="30" />
        </div>
        <div class="space-y-1.5">
          <p class="text-xs text-theme">Info</p>
          <UiProgress variant="info" :model-value="55" />
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Values</h2>
      <div class="space-y-4">
        <div v-for="val in [0, 25, 50, 75, 100]" :key="val" class="flex items-center gap-3">
          <span class="text-xs text-theme w-8 text-right">{{ val }}%</span>
          <UiProgress :model-value="val" class="flex-1" />
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">Animated</h2>
      <div class="space-y-2">
        <div class="flex justify-between text-xs text-theme">
          <span>Progress</span>
          <span>{{ animated }}%</span>
        </div>
        <UiProgress :model-value="animated" />
      </div>
    </section>
  </div>
</template>
