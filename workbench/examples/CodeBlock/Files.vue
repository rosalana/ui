<script setup lang="ts">
import { UiCodeBlock, UiCodeBlockGroup } from "@rosalana/ui";

const route = `Route::post('/tournaments/{tournament}/start', StartTournament::class)
    ->middleware('can:manage,tournament');`;

const action = `final class StartTournament
{
    public function __invoke(Tournament $tournament): RedirectResponse
    {
        $tournament->start();

        return back()->with('success', 'Tournament started');
    }
}`;

const install = `npm install @rosalana/ui`;
</script>

<template>
  <UiCodeBlockGroup class="w-full max-w-xl" default-value="routes/web.php">
    <UiCodeBlock :code="route" language="php" filename="routes/web.php" />
    <UiCodeBlock :code="action" language="php" filename="StartTournament.php" />
    <UiCodeBlock :code="install" language="bash" value="install" label="Install" />
  </UiCodeBlockGroup>
</template>
