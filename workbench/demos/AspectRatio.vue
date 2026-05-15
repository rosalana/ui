<script setup lang="ts">
import UiAspectRatio from "../../src/components/Ui/AspectRatio/AspectRatio.vue";
</script>

<template>
  <div class="space-y-10">
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">16 / 9</h2>
      <div class="w-80">
        <UiAspectRatio :ratio="16 / 9">
          <div class="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-theme text-sm">
            16 : 9
          </div>
        </UiAspectRatio>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">1 / 1 &nbsp;·&nbsp; 4 / 3 &nbsp;·&nbsp; 9 / 16</h2>
      <div class="flex gap-4 items-end">
        <div class="w-32">
          <UiAspectRatio :ratio="1 / 1">
            <div class="w-full h-full rounded-xl bg-primary/10 flex items-center justify-center text-theme text-xs">1 : 1</div>
          </UiAspectRatio>
        </div>
        <div class="w-40">
          <UiAspectRatio :ratio="4 / 3">
            <div class="w-full h-full rounded-xl bg-secondary/10 flex items-center justify-center text-theme text-xs">4 : 3</div>
          </UiAspectRatio>
        </div>
        <div class="w-24">
          <UiAspectRatio :ratio="9 / 16">
            <div class="w-full h-full rounded-xl bg-muted/30 flex items-center justify-center text-theme text-xs">9 : 16</div>
          </UiAspectRatio>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-theme mb-4">With Image</h2>
      <div class="w-64">
        <UiAspectRatio :ratio="16 / 9" class="rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&auto=format"
            alt="Mountain landscape"
            class="w-full h-full object-cover"
          />
        </UiAspectRatio>
      </div>
    </section>
  </div>
</template>
