import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

/**
 * Matches navigation links against the page Inertia is currently showing.
 *
 * The URL comes from the Inertia page object rather than `window.location`.
 * Reading `window` during setup breaks SSR outright, and merely guarding it
 * would be worse than it looks: the server would render every link inactive
 * while the client rendered one active, so hydration would disagree. The page
 * object holds the same URL in both environments.
 *
 * Both sides are reduced to a pathname, so menu entries match whether their
 * `href` is absolute (as produced by Ziggy's `route()`) or relative.
 */
export function useActiveRoute() {
  const page = usePage();

  const currentPath = computed(() => toPath(page.url));

  function isActive(href?: string): boolean {
    if (!href) return false;

    const target = toPath(href);

    return (
      currentPath.value === target || currentPath.value.startsWith(target + "/")
    );
  }

  return { currentPath, isActive };
}

function toPath(url: string): string {
  try {
    // The base only applies to relative URLs; absolute ones keep their own path.
    const { pathname } = new URL(url, "http://localhost");

    return pathname.replace(/\/+$/, "") || "/";
  } catch {
    return url;
  }
}
