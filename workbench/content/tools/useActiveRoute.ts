import { section, type Article } from "../schema";

export default {
  title: "useActiveRoute",
  description: "Match navigation links against the current Inertia URL.",
  sections: [
    section(
      "usage",
      "Usage",
      "useActiveRoute returns currentPath, the pathname of the page Inertia is showing, and isActive, which tells whether a link points at the current page or at one of its parents. Use it to highlight the active entry of a menu.",
      `import { useActiveRoute } from '@rosalana/ui';

const { currentPath, isActive } = useActiveRoute();

// <Link href="/tournaments" :class="{ 'font-semibold': isActive('/tournaments') }">
//   Tournaments
// </Link>`,
    ),
    section(
      "matching",
      "Matching rules",
      "Links and the current URL are reduced to a pathname, so absolute links (what Ziggy's route() produces) and relative links match the same way. Query strings, hashes and trailing slashes are ignored. A link matches its own path and any descendant at a slash boundary: /tournaments is active on /tournaments/42, but /tournament is not active on /tournaments. The root link / is active only on the root, since every other path would otherwise match it as a parent. isActive returns false for an empty href.",
      `// current page: /tournaments/42/matches?tab=live
isActive('/tournaments');           // true
isActive('/tournaments/42');        // true
isActive('/tournaments/4');         // false
isActive('https://app.test/tournaments/42/matches/'); // true
isActive('/');                      // false`,
    ),
    section(
      "ssr",
      "Why it does not read window",
      "The URL comes from the Inertia page object, not from window.location. The server has no window, and a guarded read would render every link inactive on the server while the client renders one as active, which breaks hydration. The page object holds the same URL in both places.",
    ),
  ],
} satisfies Article;
