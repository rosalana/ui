<script setup lang="ts">
import { UiToc, type TocHeading } from "@rosalana/ui";

const headings: TocHeading[] = [
  { id: "list-overview", text: "Overview" },
  { id: "list-format", text: "Tournament format" },
  { id: "list-groups", text: "Group stage", level: 3 },
  { id: "list-playoffs", text: "Playoffs", level: 3 },
  { id: "list-prizes", text: "Prizes" },
];

</script>

<template>
  <div class="grid w-full max-w-xl grid-cols-[minmax(0,1fr)_10rem] gap-6">
    <article class="space-y-4 text-sm text-theme">
      <h2 id="list-overview" class="text-base font-semibold text-foreground">Overview</h2>
      <p>
        The Spring Cup brings together sixteen teams from across the region for
        two weekends of football. Matches are played on Saturday and Sunday.
      </p>
      <p>
        Registration closes a week before the first match, so make sure every
        team has its roster confirmed by then.
      </p>

      <h2 id="list-format" class="text-base font-semibold text-foreground">Tournament format</h2>
      <p>
        The cup runs in two phases: a group stage that decides the seeding,
        followed by a single-elimination playoff.
      </p>
      <h3 id="list-groups" class="font-semibold text-foreground">Group stage</h3>
      <p>
        Teams are drawn into four groups of four. Everyone plays everyone once
        and the top two of each group move on.
      </p>
      <h3 id="list-playoffs" class="font-semibold text-foreground">Playoffs</h3>
      <p>
        Quarterfinals, semifinals and the final are played as single matches.
        A draw is decided on penalties.
      </p>

      <h2 id="list-prizes" class="text-base font-semibold text-foreground">Prizes</h2>
      <p>
        The winners take home the cup and a prize for the whole team. The
        top scorer gets a trophy of their own.
      </p>
      <div class="h-32" />
    </article>

    <!-- Sticks beside the article while the page scrolls -->
    <aside class="sticky top-24 self-start">
      <UiToc :headings="headings" :offset="100" :hash="false" />
    </aside>
  </div>
</template>
