<script setup lang="ts">
import { UiCodeBlock } from "@rosalana/ui";

const code = `import { useForm } from "@inertiajs/vue3";

const form = useForm({ name: "", teams: 8 });

function create() {
  form.post("/tournaments", {
    onSuccess: () => form.reset(),
  });
}`;
</script>

<template>
  <UiCodeBlock
    class="w-full max-w-xl"
    :code="code"
    language="ts"
    filename="CreateTournament.vue"
    line-numbers
  />
</template>
