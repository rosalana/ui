<script setup lang="ts">
import { UiTocIsland, type TocHeading } from "@rosalana/ui";

const headings: TocHeading[] = [
  { id: "island-intro", text: "Getting started" },
  { id: "island-roster", text: "Build your roster" },
  { id: "island-captain", text: "Pick a captain", level: 3 },
  { id: "island-schedule", text: "Match schedule" },
  { id: "island-results", text: "Entering results" },
];

</script>

<template>
  <!-- The docs scroll the article in this box and pin the island to it; the code shows it fixed to the screen. -->
  <div class="relative w-full max-w-xl">
    <article class="h-80 space-y-4 overflow-y-auto rounded-xl border border-border p-6 pr-16 text-sm text-theme">
      <h2 id="island-intro" class="text-base font-semibold text-foreground">Getting started</h2>
      <p>
        A team needs a name, a home ground and at least seven players before it
        can enter a tournament.
      </p>

      <h2 id="island-roster" class="text-base font-semibold text-foreground">Build your roster</h2>
      <p>
        Invite players by email. They get a link, create a profile and appear
        on the roster as soon as they accept.
      </p>
      <h3 id="island-captain" class="font-semibold text-foreground">Pick a captain</h3>
      <p>
        The captain confirms line-ups before every match and can enter
        results on the team's behalf.
      </p>

      <h2 id="island-schedule" class="text-base font-semibold text-foreground">Match schedule</h2>
      <p>
        Fixtures appear on the team page once the draw is made. Each player
        gets a reminder the day before a match.
      </p>

      <h2 id="island-results" class="text-base font-semibold text-foreground">Entering results</h2>
      <p>
        After the final whistle both captains enter the score. If the two
        entries differ, an organizer settles it.
      </p>
      <div class="h-56" />
    </article>

    <UiTocIsland
      :headings="headings"
      :offset="24"
      :hash="false"
      class="absolute top-1/2 right-2"
    />
  </div>
</template>
