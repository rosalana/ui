<script setup lang="ts">
import { UiCodeBlock } from "@rosalana/ui";

const code = `Route::post('/tournaments/{tournament}/start', StartTournament::class)
    ->middleware('can:manage,tournament');`;
</script>

<template>
  <UiCodeBlock class="w-full max-w-xl" :code="code" language="php" filename="routes/web.php" />
</template>
