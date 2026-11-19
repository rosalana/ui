<script setup lang="ts">
import { TextEffect } from "@rosalana/ui";
</script>

<template>
  <div class="grid w-full max-w-md gap-5 text-xl">
    <div>
      <p class="mb-1 text-xs text-theme">Per word (default)</p>
      <TextEffect.Pop text="Every word pops in." />
    </div>
    <div>
      <p class="mb-1 text-xs text-theme">whole</p>
      <TextEffect.Pop text="The whole phrase pops at once." whole />
    </div>
    <div>
      <p class="mb-1 text-xs text-theme">delay of 1.5 seconds</p>
      <TextEffect.Typing text="Starts a moment later." :delay="1.5" />
    </div>
  </div>
</template>
